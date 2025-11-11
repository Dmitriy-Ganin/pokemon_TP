import { RouterProvider } from 'react-router';
import { router } from './router';
import { saveStateToStorage, store } from './store/store';

export const App = () => {
  window.addEventListener('beforeunload', () => {
    const state = store.getState();
    if (state.login) {
      console.log(state.login);
      saveStateToStorage(state);
    }
  });
  return <RouterProvider router={router} />;
};

