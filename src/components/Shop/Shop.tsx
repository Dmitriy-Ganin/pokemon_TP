import React from 'react';
import { ShopWrapper, ShopHeader, ShopContent, } from './ShopStyle';
import { ShopCard } from '../ShopCard';
import Berry from '../ShopCard/ShopCardImage/Berry.png'
import PokeBall1 from '../ShopCard/ShopCardImage/PokeBall1.png'
import PokeBall2 from '../ShopCard/ShopCardImage/PokeBall2.png'

export const Shop: React.FC = () => {

  const tittleBerry = 'Ягода 1 уровня';
  const textBerry = 'Накорми ей покемона для увеличения веса на 0.1 кг';
  const moneyBerry = 1000;

  const tittlePokeBall1 = 'Покеболл 1 уровня';
  const textPokeBall1 = 'Во время охоты ловит покемона с шансом 7%';
  const moneyPokeBall1 = 5000;

  const tittlePokeBall2 = 'Покеболл 2 уровня';
  const textPokeBall2 = 'Во время охоты ловит покемона с шансом 15%';
  const moneyPokeBall2 = 10000;

  return (
    <ShopWrapper>
      <ShopHeader >
        Shop
      </ShopHeader>

      <ShopContent>
        <div>
          <input type="text" style={{
            width: '296px',
            height: '32px',
            backgroundColor: 'rgba(255, 255, 255, 1)',
            border: '1px solid rgba(217, 217, 217, 1)',
            borderRadius: '2px',
          }} />
        </div>
        <ShopCard image={Berry} tittle={tittleBerry} text={textBerry} money={moneyBerry} />
        <ShopCard image={PokeBall1} tittle={tittlePokeBall1} text={textPokeBall1} money={moneyPokeBall1} />
        <ShopCard image={PokeBall2} tittle={tittlePokeBall2} text={textPokeBall2} money={moneyPokeBall2} />
      </ShopContent>
    </ShopWrapper>
  );
};