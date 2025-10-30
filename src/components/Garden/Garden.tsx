import React, { useState } from 'react';
import { SubMenuContent } from './GardenStyle';
import { SubMenuWrapper, SubMenuHeader } from '../Menu/MenuStyle';

export const Garden: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SubMenuWrapper>
      <SubMenuHeader onClick={() => setIsOpen(!isOpen)}>
        Garden
      </SubMenuHeader>
      {isOpen && (
        <SubMenuContent>
          <div>Сontent</div>
        </SubMenuContent>
      )}
    </SubMenuWrapper>
  );
};