import { InventoryCardData } from '../components/InventoryCard';

export const GRID_COLUMNS = 5;
export const GRID_SIZE = 60;

// Функция для получения всех клеток предмета
export const getItemCells = (item: InventoryCardData, startPosition: number): number[] => {
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

// Функция проверки возможности размещения предмета
export const canPlaceItem = (
  item: InventoryCardData, 
  targetPosition: number, 
  allItems: InventoryCardData[]
): boolean => {
  const cells = getItemCells(item, targetPosition);
  const expectedCount = (item.width || 1) * (item.height || 1);

  if (cells.length !== expectedCount) return false;

  for (const cell of cells) {
    // Проверяем, не занята ли клетка
    for (const otherItem of allItems) {
      if (otherItem.id === item.id) continue;

      const otherCells = getItemCells(otherItem, otherItem.position);
      if (otherCells.includes(cell)) {
        return false;
      }
    }
  }

  return true;
};

// Основная функция: поиск свободного места для предмета
export const findFreePosition = (
  items: InventoryCardData[],
  itemToAdd: Omit<InventoryCardData, 'position'> // предмет без позиции
): number | null => {
  // Перебираем все возможные позиции от 0 до GRID_SIZE
  for (let position = 0; position < GRID_SIZE; position++) {
    const itemWithPosition: InventoryCardData = {
      ...itemToAdd,
      position
    };
    
    if (canPlaceItem(itemWithPosition, position, items)) {
      return position;
    }
  }
  
  return null; // Места нет
};