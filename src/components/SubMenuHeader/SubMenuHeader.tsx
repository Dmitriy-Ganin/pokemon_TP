import chevronUp from './Image/chevronUp.png';
import { SubMenuHeaderStyle } from '../Menu/MenuStyle';

type SubMenuHeaderProps = {
  title: string;
  isOpen: boolean;
  onClick: () => void;
}

export const SubMenuHeader = ({title, isOpen, onClick}: SubMenuHeaderProps) => {
  return (
  <SubMenuHeaderStyle onClick={onClick}>
        <div>{title}</div>
        <div>
          <img
            src={chevronUp}
            alt='Setting'
            width='20px'
            height='20px'
            style={{
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease'
            }} />
        </div>
      </SubMenuHeaderStyle>)
  }
