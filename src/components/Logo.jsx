import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoSvg from '@assets/images/logo.svg?react';

const Logo = ({ width = '62px', height = '17px', color = '#FCFCFC' }) => {
  const navigate = useNavigate();

  const style = {
    width,
    height,
    color: color,
    cursor: 'pointer',
  };

  return (
    <LogoSvg
      style={style}
      onClick={() => navigate('/')}
      draggable="false"
      aria-label="Logo"
    />
  );
};

export default Logo;
