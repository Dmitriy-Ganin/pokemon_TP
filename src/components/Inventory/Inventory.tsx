import React from 'react';
import { InventoryWrapper, InventoryHeader, InventoryContent, Box } from './InventoryStyle';

export const Inventory: React.FC = () => {

  const boxes = [];

  for (let i = 0; i < 60; i++) {
    boxes.push(<Box key={i} />)
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