import React, { useState } from 'react';
import s from '././ExploreChallengePage.module.scss';
import Header from './components/Header.jsx';
import CategoryFilter from '../../components/CategoryFilter.jsx';
import AllChallenge from './components/AllChallengeBig.jsx';
import dummyData from './datas/AllChallengeDummy.json';

const pageCategories = ['전체', '운동', '삭습관', '생활', '기타'];

const ExploreChallengePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  // 선택한 카테고리에 맞게 필터링
  const filteredItems =
    selectedCategory === '전체'
      ? dummyData.items
      : dummyData.items.filter((c) => c.category.name === selectedCategory);

  return (
    <div className={s.exploreChallengePageContainer} style={{ marginBottom: '105px' }}>
      <Header />
      <CategoryFilter
        categories={pageCategories}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <AllChallenge challenges={filteredItems} />
    </div>
  );
};

export default ExploreChallengePage;
