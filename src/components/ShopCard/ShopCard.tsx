import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { decrementMoney } from '../../store/slices/moneySlice';
import { addItem } from '../../store/slices/inventorySlice';
import { findFreePosition } from '../../utils/inventoryUtils';
import { InventoryCardData } from '../InventoryCard';

export const ShopCard = ({ 
  image, 
  title, 
  text, 
  price,
  itemData
}: { 
  image: string, 
  title: string, 
  text: string, 
  price: number,
  itemData: Omit<InventoryCardData, 'position' | 'id'>
}) => {
  const dispatch = useDispatch();
  const currentMoney = useSelector((state: RootState) => state.money);
  const inventory = useSelector((state: RootState) => state.inventory); // <-- получаем инвентарь

  const handleBuy = () => {
    if (currentMoney >= price) {
      // Генерируем ID
      const id = `${itemData.type}-${Date.now()}`;
      
      // Ищем свободное место
      const freePosition = findFreePosition(inventory, { ...itemData, id });
      
      if (freePosition !== null) {
        // Добавляем предмет
        dispatch(addItem({
          ...itemData,
          id,
          position: freePosition
        }));
        
        // оплата
        dispatch(decrementMoney(price));
      } else {
        alert('Недостаточно места в инвентаре!');
      }
    } else {
      alert('Недостаточно денег!');
    }
  };

  return (<div style={{
    display: 'flex',
    width: '296px',
    height: '105px',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: '16px',
    marginTop: '16px',
    padding: '2px',
    gap: '10px',
    boxShadow: '0px 0px 16px 0px rgba(58, 58, 58, 0.1)',
  }}>
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'space-around',
    }}>
      <div>
        <img src={image}
          alt='Berry'
          width='59px'
          height='59px'
        />
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
      }}>
        <div style = {{
          fontWeight: 700,
          fontSize: "16px",
        }}>{title}</div>
        <div>{text}г</div>
      </div>
    </div>
    <div>
      <button style={{
        width: '232px',
        height: '32px',
        backgroundColor: 'rgba(54, 95, 172, 1)',
        color: 'rgba(255, 255, 255, 1)',
      }}
      onClick={handleBuy}
      >Купить за {price}</button>
    </div>
  </div>)
}