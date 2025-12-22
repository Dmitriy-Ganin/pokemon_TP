import React from 'react';
import { ShopWrapper, ShopHeader, ShopContent, } from './ShopStyle';
import { ShopCard } from '../ShopCard';
import Berry from '../ShopCard/ShopCardImage/Berry.png'
import PokeBall1 from '../ShopCard/ShopCardImage/PokeBall1.png'
import PokeBall2 from '../ShopCard/ShopCardImage/PokeBall2.png'
import { InventoryCardData } from '../InventoryCard';

export const Shop: React.FC = () => {

  const tittleBerry = 'Ягода 1 уровня';
  const textBerry = 'Накорми ей покемона для увеличения веса на 0.1 кг';
  const priceBerry = 1000;

  const tittlePokeBall1 = 'Покеболл 1 уровня';
  const textPokeBall1 = 'Во время охоты ловит покемона с шансом 7%';
  const pricePokeBall1 = 5000;

  const tittlePokeBall2 = 'Покеболл 2 уровня';
  const textPokeBall2 = 'Во время охоты ловит покемона с шансом 15%';
  const pricePokeBall2 = 10000;

  const berryItemData: Omit<InventoryCardData, 'position' | 'id'> = {
    type: 'berry',
    width: 2,
    height: 2,
    imageUrl: Berry,
  };

  const pokeball1ItemData: Omit<InventoryCardData, 'position' | 'id'> = {
    type: 'pokeball1',
    width: 1,
    height: 1,
    imageUrl: PokeBall1,
  };

  const pokeball2ItemData: Omit<InventoryCardData, 'position' | 'id'> = {
    type: 'pokeball2',
    width: 2,
    height: 2,
    imageUrl: PokeBall2,
  };

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
        <ShopCard 
          image={Berry} 
          title={tittleBerry} 
          text={textBerry} 
          price={priceBerry} 
          itemData={berryItemData} 
        />
        <ShopCard 
          image={PokeBall1} 
          title={tittlePokeBall1} 
          text={textPokeBall1} 
          price={pricePokeBall1} 
          itemData={pokeball1ItemData}
        />
        <ShopCard 
          image={PokeBall2} 
          title={tittlePokeBall2} 
          text={textPokeBall2} 
          price={pricePokeBall2} 
          itemData={pokeball2ItemData}
        />
      </ShopContent>
    </ShopWrapper>
  );
};