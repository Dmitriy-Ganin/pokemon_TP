import { Outlet } from "react-router"
import Clicker from "./AuthLogo/Clicker.png"
import Pokemon from "./AuthLogo/Pokemon.png"

import { AuthWrapper, AuthLayout, LogoWrapper, Divider } from "./AuthStyle"

export const AuthForm = () => {
  return (
    <AuthWrapper>
      <AuthLayout>
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
        <Outlet />
      </AuthLayout>
    </AuthWrapper>
  )
}