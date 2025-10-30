import React from 'react';
import { MenuWrapper, MenuContent } from './MenuStyle';
import { Pokemons } from '../Pokemons';
import { Garden } from '../Garden';
import { Hunt } from '../Hunt';

export const Menu: React.FC = () => {

  return (
    <MenuWrapper>
        <MenuContent>
          <Pokemons />
          <Garden />
          <Hunt />
        </MenuContent>
    </MenuWrapper>
  );
};
