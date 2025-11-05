import React from 'react';
import s from './styles/Header.module.scss';
import Logo from '@components/Logo.jsx';

const Header = () => {
  return (
    <div className={s.headerContainer}>
      <Logo width="131px" height="37px" color="#ff3e3d" />
    </div>
  );
};

export default Header;
