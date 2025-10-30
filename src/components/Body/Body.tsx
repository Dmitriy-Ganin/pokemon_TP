import { Inventory } from '../Inventory';
import { Menu } from '../Menu';
import { Shop } from '../Shop';
import { BodyWrapper } from './BodyStyle';

export const Body = () => {

  return (
    <BodyWrapper>
      <Inventory />
      <Menu/>
      <Shop />
    </BodyWrapper>
  );
};