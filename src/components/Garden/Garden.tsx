import React, { useState } from 'react';
import { SubMenuContent } from './GardenStyle';
import { SubMenuWrapper } from '../Menu/MenuStyle';
import { SubMenuHeader } from '../SubMenuHeader'

export const Garden: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SubMenuWrapper>
      <SubMenuHeader 
        title="Garden"
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <SubMenuContent>
          <div>Сontent</div>
        </SubMenuContent>
      )}
    </SubMenuWrapper>
  );
};