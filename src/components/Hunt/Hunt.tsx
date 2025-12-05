import React, { useState } from 'react';
import { SubMenuContent } from './HuntStyle';
import { SubMenuWrapper } from '../Menu/MenuStyle';
import { SubMenuHeader } from '../SubMenuHeader'

export const Hunt: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SubMenuWrapper>
      <SubMenuHeader 
              title="Hunt"
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