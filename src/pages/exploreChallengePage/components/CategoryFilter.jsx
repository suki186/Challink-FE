import React from 'react';
import s from './styles/CategoryFilter.module.scss';

const categories = ['전체', '운동', '식습관', '생활', '기타'];

const CategoryFilter = ({ selectedCategory, onSelect }) => {
  const handleClick = (category) => {
    // 중복 클릭 방지
    if (selectedCategory === category) return;
    onSelect(category);
  };

  return (
    <div className={s.categoryFilter}>
      {categories.map((cat) => (
        <button
          key={cat}
          className={`${s.categoryButton} ${
            selectedCategory === cat ? s.categoryButtonActive : ''
          }`}
          onClick={() => handleClick(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
