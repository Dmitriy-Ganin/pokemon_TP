import { useState } from 'react';
import {
  InventoryWrapper,
  InventoryHeader,
  InventoryContent,
  Box,
} from './InventoryStyle';
import { InventoryCard, InventoryCardData } from '../InventoryCard';
import PokeBall2 from '../ShopCard/ShopCardImage/PokeBall2.png';
import Berry from '../ShopCard/ShopCardImage/Berry.png';

export const Inventory: React.FC = () => {
  // Константы
  const GRID_COLUMNS = 5;
  const GRID_SIZE = 60;

  // Состояния
  const [items, setItems] = useState<InventoryCardData[]>([
    {
      id: 'pokeball-1',
      type: 'pokeball',
      position: 0,
      imageUrl: PokeBall2,
    },
    {
      id: 'potion-1',
      type: 'potion',
      position: 5,
      width: 2,
      height: 1,
      imageUrl: Berry,
    },
    {
      id: 'big-item',
      type: 'big',
      position: 20,
      width: 2,
      height: 2,
      imageUrl: PokeBall2,
    },
  ]);

  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [highlightedCells, setHighlightedCells] = useState<number[]>([]);
  const [dropTargetCell, setDropTargetCell] = useState<number | null>(null);

  // Получить все клетки предмета
  const getItemCells = (item: InventoryCardData, startPosition: number): number[] => {
    const itemWidth = item.width || 1;
    const itemHeight = item.height || 1;
    const cells: number[] = [];

    const startRow = Math.floor(startPosition / GRID_COLUMNS);
    const startCol = startPosition % GRID_COLUMNS;

    // Проверка границ
    if (startCol + itemWidth > GRID_COLUMNS) return [];
    if (startRow + itemHeight > GRID_SIZE / GRID_COLUMNS) return [];

    // Вычисляем занимаемые клетки
    for (let row = 0; row < itemHeight; row++) {
      for (let col = 0; col < itemWidth; col++) {
        const cellIndex = (startRow + row) * GRID_COLUMNS + (startCol + col);
        if (cellIndex < GRID_SIZE) {
          cells.push(cellIndex);
        }
      }
    }

    return cells;
  };

  // Можно ли разместить предмет
  const canPlaceItem = (item: InventoryCardData, targetPosition: number): boolean => {
    const cells = getItemCells(item, targetPosition);
    const expectedCount = (item.width || 1) * (item.height || 1);

    if (cells.length !== expectedCount) return false;

    for (const cell of cells) {
      // Проверяем, не занята ли клетка
      for (const otherItem of items) {
        if (otherItem.id === item.id) continue;

        const otherCells = getItemCells(otherItem, otherItem.position);
        if (otherCells.includes(cell)) {
          return false;
        }
      }
    }

    return true;
  };

  // Обработчик: начало перетаскивания
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, itemId: string) => {
    e.dataTransfer.setData('text/plain', itemId);
    setDraggedItemId(itemId);
  };

  // Обработчик: конец перетаскивания
  const handleDragEnd = () => {
    setDraggedItemId(null);
    setHighlightedCells([]);
    setDropTargetCell(null);
  };


  // Обработчик: сброс предмета на конкретную клетку
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, cellIndex: number) => {
    e.preventDefault();

    const itemId = e.dataTransfer.getData('text/plain');
    const item = items.find(i => i.id === itemId);

    if (item) {
      //Нормальный расчет центра, а не вот это вот все
      const itemWidth = item.width || 1;
      const itemHeight = item.height || 1;
      const offset = Math.floor(itemWidth / 4) + Math.floor(itemHeight / 4) * GRID_COLUMNS;

      const adjustedIndex = cellIndex - offset;

      // Проверяем границы и возможность размещения
      if (
        adjustedIndex >= 0 &&
        adjustedIndex < GRID_SIZE &&
        canPlaceItem(item, adjustedIndex)
      ) {
        setItems(prev => prev.map(i =>
          i.id === itemId ? { ...i, position: adjustedIndex } : i
        ));
      }
    }

    handleDragEnd();
  };

  // Функция: получить предмет в клетке
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

  // Функция: обработка drag over для конкретной клетки
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

  // Создаем массив ячеек
  const boxes = [];

  for (let i = 0; i < GRID_SIZE; i++) {
    const item = getItemInCell(i);
    const isHighlighted = highlightedCells.includes(i);
    const draggedItem = draggedItemId ? items.find(item => item.id === draggedItemId) : null;

    // Проверяем возможность размещения
    let canDropHere = false;
    if (draggedItem && dropTargetCell !== null && isHighlighted) {
      canDropHere = canPlaceItem(draggedItem, dropTargetCell);
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