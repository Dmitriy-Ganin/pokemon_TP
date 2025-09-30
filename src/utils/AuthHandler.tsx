import { useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { useNavigate } from 'react-router';
import type { RootState } from '../store/store';
import { refreshTokens } from '../utils/refreshTokens';
import { removeAuthCookies } from '../utils/cookes';
import { clearToken, setAuthError  } from '../store/slices/tokenSlice';

interface AuthHandlerProps {
  children: React.ReactNode;
}

export const AuthHandler = ({ children }: AuthHandlerProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authError } = useSelector((state: RootState) => state.token);

  useEffect(() => {
    if (authError) {
      navigate(import.meta.env.VITE_LOGIN);
      dispatch(setAuthError(false));
    }
  }, [authError, navigate, dispatch]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const success = await refreshTokens(dispatch);
        
        if (!success) {
          removeAuthCookies();
          dispatch(clearToken());
          dispatch(setAuthError(true));
          return;
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        removeAuthCookies();
        dispatch(clearToken());
        dispatch(setAuthError(true));
      }
    };

    checkAuth();
  }, [dispatch, navigate]);

  return <>{children}</>;
};