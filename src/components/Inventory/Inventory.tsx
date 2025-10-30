import React from 'react';
import { InventoryWrapper, InventoryHeader, InventoryContent } from './InventoryStyle';

export const Inventory: React.FC = () => {

  return (
    <InventoryWrapper>
      <InventoryHeader>
        Inventory
      </InventoryHeader>
        <InventoryContent>
        </InventoryContent>
    </InventoryWrapper>
  );
};