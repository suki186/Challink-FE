import React from 'react';
import s from './styles/Header.module.scss';
import { useNavigate } from 'react-router-dom';
import Logo from '@components/Logo.jsx';
import SearchBar from '@components/searchBar/SearchBar.jsx';

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className={s.headerContainer}>
      <div className={s.headerTop}>
        <Logo width="62px" height="17px" color="#FCFCFC" />
        <button className={s.loginButton} onClick={() => navigate('/login')}>
          로그인
        </button>
      </div>

      <div className={s.headerBottom}>
        <SearchBar placeholder="초대코드로 참여하기" backgroundColor="#FCFCFC" />
      </div>
    </div>
  );
};

export default Header;
