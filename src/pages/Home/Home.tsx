import { AuthHandler } from '../../utils/AuthHandler';
import { Header } from '../../components/Header'
import { Body } from '../../components/Body'

export const Home = () => {
  return (
    <AuthHandler>
      <Header />
      <Body />
    </AuthHandler>
  );
};