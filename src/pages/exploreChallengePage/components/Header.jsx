import React from 'react';
import { useNavigate } from 'react-router-dom';
import s from './styles/Header.module.scss';
import chevron from '@assets/images/chevron_left_icon.svg';
import SearchBar from '@components/searchBar/SearchBar.jsx';

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className={s.headerContainer}>
      <div className={s.headerTop}>
        <button className={s.backButton} onClick={() => navigate(-1)}>
          <img src={chevron} alt="뒤로 가기 아이콘" className={s.backIcon} />
        </button>
        <h2 className={s.title}>모든 챌린지</h2>
      </div>
      <div className={s.headerBottom}>
        <SearchBar
          placeholder="관심있는 챌린지를 검색해보세요!"
          backgroundColor="#E9E9E9"
        />
      </div>
    </div>
  );
};

export default Header;
