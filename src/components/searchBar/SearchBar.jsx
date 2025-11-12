import React from 'react';
import s from './SearchBar.module.scss';
import searchIcon from '@assets/images/search_icon.svg';

const SearchBar = ({
  placeholder = '검색어를 입력하세요',
  backgroundColor = '#fcfcfc',
  onSubmit,
  value,
  onChange,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(value);
    }
  };

  return (
    <form className={s.searchForm} onSubmit={handleSubmit} style={{ backgroundColor }}>
      <input
        className={s.searchInput}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <button type="submit" className={s.searchButton}>
        <img src={searchIcon} alt="검색 아이콘" />
      </button>
    </form>
  );
};

export default SearchBar;
