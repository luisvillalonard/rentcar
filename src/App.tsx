import { useEffect } from 'react';
import './app.css';
import HeaderApp from './components/header';
import RutasApp from './components/rutas';
import { useData } from './hooks/useData';
import { useLocation } from 'react-router';
import LoginPage from './pages/login';
import FooterApp from './components/footer';

const App = () => {
  const { contextAuth: { state: { isLogin }, getUser } } = useData();
  const url = useLocation();

  useEffect(() => {
    getUser();
  }, [url.pathname])

  if (isLogin) {
    <LoginPage />
  }

  return (
    <div className='vh-100 w-100 d-flex flex-column overflow-auto'>
      <HeaderApp />
      <div className='flex-grow-1 position-relative'>
        <RutasApp />
      </div>
      <FooterApp />
    </div>
  );
}

export default App;
