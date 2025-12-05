

import { HeaderWrapper } from './HeaderStyle';
import Clicker from "../../pages/AuthForm/AuthLogo/Clicker.png"
import Pokemon from "../../pages/AuthForm/AuthLogo/Pokemon.png"
import { Divider, LogoWrapper } from "../../pages/AuthForm/"
import { Wallet } from "../../components/Wallet"
import { LogOut } from "../../components/LogOut"
import { store } from '../../store/store';

export const Header = () => {
  const state = store.getState();

  return (
    <HeaderWrapper>
      <LogoWrapper>
        <img src={Clicker}
          alt="Clicker"
          width="149px"
          height="54px" />
        <Divider></Divider>
        <img src={Pokemon}
          alt="Pokemon"
          width="153px"
          height="54px" />
      </LogoWrapper>
      <div>
        <Wallet />
        {state.login}
        <LogOut />
      </div>
    </HeaderWrapper>

  );
};