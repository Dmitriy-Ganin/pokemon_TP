import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

import { saveStateToStorage, store } from '../../store/store';
import { removeAuthCookies } from '../../utils/cookes';
import { clearToken } from '../../store/slices/tokenSlice';
import { clearLogin } from '../../store/slices/loginSlice';
import { clearMoney } from '../../store/slices/moneySlice';
import { clearPokemon } from '../../store/slices/pokemonSlice';
import { clearFirstEntry } from '../../store/slices/firstEntrySlice';
import { clearInventory } from '../../store/slices/inventorySlice';

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
    dispatch(clearMoney());
    dispatch(clearPokemon());
    dispatch(clearFirstEntry());
    dispatch(clearInventory());

    localStorage.removeItem('activeLogin');

    navigate(import.meta.env.VITE_LOGIN);
  };
  return (
    <button onClick={LogOut}>
      Log out
    </button>
  )
}