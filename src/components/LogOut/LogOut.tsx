import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

import { saveStateToStorage, store } from '../../store/store';
import { removeAuthCookies } from '../../utils/cookes';
import { clearToken } from '../../store/slices/tokenSlice';
import { clearLogin } from '../../store/slices/loginSlice';

export const LogOut = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LogOut = () => {
    const state = store.getState();
    if (state.login) {
      saveStateToStorage(state);
    }

    removeAuthCookies();
    dispatch(clearToken());
    dispatch(clearLogin());

    localStorage.removeItem('activeLogin');

    navigate(import.meta.env.VITE_LOGIN);
  };
  return (
    <button onClick={LogOut}>
      Log out
    </button>
  )
}