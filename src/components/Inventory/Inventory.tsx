import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  InventoryWrapper,
  InventoryHeader,
  InventoryContent,
  Box,
} from './InventoryStyle';
import { InventoryCard, InventoryCardData } from '../InventoryCard';
import { RootState } from '../../store/store';
import { updateItemPosition } from '../../store/slices/inventorySlice';
import { getItemCells, canPlaceItem, GRID_COLUMNS, GRID_SIZE } from '../../utils/inventoryUtils';

export const Inventory: React.FC = () => {
  // Подключаем Redux
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.inventory);

  // Состояния
  //id перетаскиваемого предмета
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  //посвечивакющиеся ячейки
  const [highlightedCells, setHighlightedCells] = useState<number[]>([]);
  //позиция для сброса, с учетом центрирования
  const [dropTargetCell, setDropTargetCell] = useState<number | null>(null);

  // проверка можно ли разместить тут предмет
  const canPlaceItemLocal = (item: InventoryCardData, targetPosition: number): boolean => {
    return canPlaceItem(item, targetPosition, items);
  };

  // Обработчик: начало перетаскивания
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, itemId: string) => {
    e.dataTransfer.setData('text/plain', itemId);
    setDraggedItemId(itemId);
  };

  // Обработчик: конец перетаскивания, сбрасывает состояния
  const handleDragEnd = () => {
    setDraggedItemId(null);
    setHighlightedCells([]);
    setDropTargetCell(null);
  };

  // обрабока сброса предмета на конкретную клетку
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, cellIndex: number) => {
    e.preventDefault();

    const itemId = e.dataTransfer.getData('text/plain');
    const item = items.find(i => i.id === itemId);

    if (item) {
      const itemWidth = item.width || 1;
      const itemHeight = item.height || 1;
      const offset = Math.floor(itemWidth / 4) + Math.floor(itemHeight / 4) * GRID_COLUMNS;

      const adjustedIndex = cellIndex - offset;

      // проверка границы и возможности размещения
      if (
        adjustedIndex >= 0 &&
        adjustedIndex < GRID_SIZE &&
        canPlaceItemLocal(item, adjustedIndex)
      ) {
        // смена позиции
        dispatch(updateItemPosition({
          id: itemId,
          position: adjustedIndex
        }));
      }
    }

    handleDragEnd();
  };

  // обработка перемещения предмета над ячейкой (подсветка)
  const handleCellDragOver = (e: React.DragEvent<HTMLDivElement>, cellIndex: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';

    const draggedItem = draggedItemId ? items.find(i => i.id === draggedItemId) : null;

    if (draggedItem) {
      const itemWidth = draggedItem.width || 1;
      const itemHeight = draggedItem.height || 1;
      const offset = Math.floor(itemWidth / 4) + Math.floor(itemHeight / 4) * GRID_COLUMNS;

      const adjustedIndex = cellIndex - offset;

      // Проверяем границы
      if (adjustedIndex >= 0 && adjustedIndex < GRID_SIZE) {
        setDropTargetCell(adjustedIndex);
        const cells = getItemCells(draggedItem, adjustedIndex);
        setHighlightedCells(cells);
      } else {
        setHighlightedCells([]);
        setDropTargetCell(null);
      }
    }
  };

  // находит предмет в клетке
  const getItemInCell = (cellIndex: number): InventoryCardData | undefined => {
    // Ищем предмет, который занимает эту клетку
    for (const item of items) {
      const itemCells = getItemCells(item, item.position);
      if (itemCells.includes(cellIndex)) {
        // Возвращаем предмет только если это его стартовая позиция
        if (item.position === cellIndex) {
          return item;
        }
      }
    }
    return undefined;
  };

  // Создаем массив ячеек
  const boxes = [];

  for (let i = 0; i < GRID_SIZE; i++) {
    const item = getItemInCell(i);
    const isHighlighted = highlightedCells.includes(i);
    const draggedItem = draggedItemId ? items.find(item => item.id === draggedItemId) : null;

    // Проверяем возможность размещения
    let canDropHere = false;
    if (draggedItem && dropTargetCell !== null && isHighlighted) {
      canDropHere = canPlaceItemLocal(draggedItem, dropTargetCell);
    }

    boxes.push(
      <Box
        key={i}
        onDragOver={(e) => handleCellDragOver(e, i)}
        onDrop={(e) => handleDrop(e, i)}
        style={{
          border: isHighlighted
            ? canDropHere
              ? '2px solid #4CAF50'
              : '2px solid #f44336'
            : 'none',
          backgroundColor: isHighlighted
            ? canDropHere
              ? 'rgba(76, 175, 80, 0.1)'
              : 'rgba(244, 67, 54, 0.1)'
            : 'rgba(239, 239, 239, 1)',
        }}
      >
        {item && (
          <InventoryCard
            item={item}
            cellSize={48}
            onDragStart={(e) => handleDragStart(e, item.id)}
            onDragEnd={handleDragEnd}
          />
        )}
      </Box>
    );
  }

  return (
    <InventoryWrapper>
      <InventoryHeader>
        Inventory
      </InventoryHeader>
      <InventoryContent>
        {boxes}
      </InventoryContent>
    </InventoryWrapper>
  );
};