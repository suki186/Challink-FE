import React from 'react';
import s from './Header.module.scss';
import Logo from '@components/Logo.jsx';
import searchIcon from '../../../assets/images/search_icon.svg';

const Header = () => {
  return (
    <div class={s.headerContainer}>
      <div class={s.headerTop}>
        <Logo width="62px" height="17px" color="#FCFCFC" />
      </div>
      <div class={s.headerBottom}>
        <form class={s.searchForm}>
          <input
            class={s.searchInput}
            type="text"
            placeholder="초대코드로 참여하기"
          />
          <button type="submit" class={s.searchButton}>
            <img src={searchIcon} alt="searchIcon" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
