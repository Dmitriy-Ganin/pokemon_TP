import { useNavigate } from 'react-router';
import { removeAuthCookies } from '../../utils/cookes';
import { clearToken } from '../../store/slices/tokenSlice';
import { clearLogin } from '../../store/slices/loginSlice';

import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import moneyLogo from "./moneyLogo.png"

import { incrementMoney, decrementMoney } from '../../store/slices/moneySlice';

export const Wallet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const money = useSelector((state: RootState) => state.money.money);

  const LogOut = () => {
    removeAuthCookies();
    dispatch(clearToken());
    dispatch(clearLogin());
    navigate(import.meta.env.VITE_LOGIN);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginRight: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ display: 'flex', gap: '16px'}}>
          <img src={moneyLogo}
            alt="Clicker"
            width="32px"
            height="32px" />
          <div style={{
            WebkitTextStroke: '2px var(--Secondary, rgba(54, 95, 172, 1))',
            paintOrder: 'stroke fill',
            fontFamily: 'Inter',
            fontWeight: 700,
            fontStyle: 'bold',
            fontSize: '24px',
            lineHeight: '100%',
            letterSpacing: '0%',
            color: 'var(--Primary, rgba(255, 204, 1, 1))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {money}
          </div>
        </div>
        <button onClick={() => { dispatch(incrementMoney(10000)); }}>
          +
        </button>
        <button onClick={() => { dispatch(decrementMoney(10000)); }}>
          -
        </button>
      </div>
      <button onClick={LogOut}>
        Log out
      </button>
    </div>
  );
};