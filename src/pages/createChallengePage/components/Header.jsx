import React from 'react';
import s from './styles/Header.module.scss';
import LOGO from '@assets/images/logo_gradient.png';
import useNavigation from '@hooks/useNavigation';

const Header = () => {
  const { goTo } = useNavigation();

  return (
    <div className={s.headerContainer}>
      <img src={LOGO} alt="로고" width="87px" onClick={() => goTo('/')} />
      <p className={s.headerComment}>새로운 챌린지를 만들어보아요!</p>
    </div>
  );
};

export default Header;
