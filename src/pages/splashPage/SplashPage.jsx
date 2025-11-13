import React, { useEffect } from 'react'; // 1. useEffect 임포트
import { useNavigate } from 'react-router-dom'; // 2. useNavigate 임포트
import s from './SplashPage.module.scss';
import Logo from '../../components/Logo';

const SplashPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/main', { replace: true });
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={s.splashPageContainer}>
      <Logo className={s.splashLogo} width="200px" height="56px" color="#FCFCFC" />
    </div>
  );
};

export default SplashPage;
