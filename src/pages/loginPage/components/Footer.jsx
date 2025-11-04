import React from 'react';
import s from './styles/Footer.module.scss';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className={s.FooterContainer}>
      <button className={s.SignupBtn} onClick={() => navigate('/signup')}>
        계정이 없으신가요?
      </button>
    </div>
  );
};

export default Footer;
