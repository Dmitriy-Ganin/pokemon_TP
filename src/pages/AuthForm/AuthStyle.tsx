import styled from 'styled-components';

/* Стили логотипов */
export const AuthWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
`;

export const AuthLayout = styled.div`
  width: 400px;
  height: 388px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const LogoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 328px;
  height: 54px;
`;

export const Divider = styled.div`
  width: 2px;
  height: 54px;
  background: #EFEFEF;
`;

/* Стили формы */
export const LoginWrapper = styled.div`
  width: 400px;
  height: 314px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border-radius: 16px;
  padding: 24px;
  background: #FFFFFF;
  box-shadow: 0px 0px 16px 0px #3A3A3A1A;
`;

export const RegisterWrapper = styled.div`
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border-radius: 16px;
  padding: 24px;
  background: #FFFFFF;
  box-shadow: 0px 0px 16px 0px #3A3A3A1A;
`;

export const Form = styled.form`
  width: 352px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const Tabs = styled.div`
  height: 46px;
  width: 352px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
`;

interface TabProps {
  $active?: boolean;
}

export const Tab = styled.div<TabProps>`
  display: flex;
  gap: 10px;
  padding: 12px 12px;
  cursor: pointer;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.85);
  
  ${props => props.$active && `
    color: #365FAC;
    border-bottom: 2px solid #365FAC;
  `}
`;

export const FormEl = styled.div`
  padding-bottom: 24px;
`;

export const RequiredLabel = styled.label`
  display: flex;
  padding-bottom: 8px;
  gap: 4px;

  &::before {
    content: '*';
    color: #FF4D4F;
    margin-right: 4px;
  }
`;

export const Input = styled.input`
  width: 352px;
  height: 32px;
  border-radius: 2px;
  border: 1px solid #D9D9D9;
  background: #FFFFFF;
`;

export const SignInButton = styled.input`
  width: 352px;
  height: 32px;
  border-radius: 2px;
  background: var(--Secondary, rgba(54, 95, 172, 1));
  border: 1px solid var(--Secondary, rgba(54, 95, 172, 1));
  box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.04);
  color: #FFFFFF;
  cursor: pointer;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;