import { authAPI } from '../API/authAPI'
import { setCookie } from './cookes'
import { setToken } from '../store/slices/tokenSlice'

export const refreshTokens = async (dispatch: any) => {
  try {
    const result = await dispatch(
      authAPI.endpoints.refresh.initiate(undefined)
    );
    
    if (result.data) {
      const { access_token } = result.data; 
      
      setCookie('access_token', access_token, 3600);
      
      dispatch(setToken(access_token));
      return true;
    }
    
    if (result.error?.status === 401) {
      console.error('Refresh token invalid');
      return false;
    }
    
    return false;
  } catch (error) {
    console.error('Refresh tokens failed:', error);
    return false;
  }
};