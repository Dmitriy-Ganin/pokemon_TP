import React, { useState } from 'react';
import { SubMenuContent } from './HuntStyle';
import { SubMenuWrapper, SubMenuHeader } from '../Menu/MenuStyle';

export const Hunt: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SubMenuWrapper>
      <SubMenuHeader onClick={() => setIsOpen(!isOpen)}>
        Hunt
      </SubMenuHeader>
      {isOpen && (
        <SubMenuContent>
          <div>Сontent</div>
        </SubMenuContent>
      )}
    </SubMenuWrapper>
  );
};