// slices/inventorySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InventoryCardData } from '../../components/InventoryCard'; // или из локального определения


// Начальное состояние - пустой массив
const initialInventoryState: InventoryCardData[] = [];

const inventorySlice = createSlice({
  name: 'inventory',
  initialState: initialInventoryState,
  reducers: {
    // Добавление нового предмета
    addItem(state, action: PayloadAction<InventoryCardData>) {
      // Проверяем, нет ли уже предмета с таким id
      const existingItem = state.find(item => item.id === action.payload.id);
      if (!existingItem) {
        state.push(action.payload);
      }
      // Можно добавить else с логированием или обработкой дубликата
    },
    
    // Удаление предмета по id
    removeItem(state, action: PayloadAction<string>) {
      return state.filter(item => item.id !== action.payload);
    },
    
    // Обновление позиции предмета (для drag&drop)
    updateItemPosition(state, action: PayloadAction<{ id: string; position: number }>) {
      const { id, position } = action.payload;
      const itemIndex = state.findIndex(item => item.id === id);
      
      if (itemIndex !== -1) {
        state[itemIndex].position = position;
      }
    },
    
    // Установка всего инвентаря (для загрузки из localStorage)
    setInventory(_, action: PayloadAction<InventoryCardData[]>) {
      return action.payload;
    },
    
    // Очистка инвентаря
    clearInventory() {
      return initialInventoryState;
    },
  }
});

export const { 
  addItem, 
  removeItem, 
  updateItemPosition, 
  setInventory, 
  clearInventory,
} = inventorySlice.actions;

export default inventorySlice.reducer;