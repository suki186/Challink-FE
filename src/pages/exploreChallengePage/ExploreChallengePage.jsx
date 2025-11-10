import React, { useState } from 'react';
import s from '././ExploreChallengePage.module.scss';
import Header from './components/Header.jsx';
import CategoryFilter from '../../components/CategoryFilter.jsx';
import AllChallenge from './components/AllChallengeBig.jsx';
import dummyData from './datas/AllChallengeDummy.json';
import ChallengeModal from '@components/challengeModal/ChallengeModal.jsx';

const pageCategories = ['전체', '운동', '삭습관', '생활', '기타'];

const ExploreChallengePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  // 선택한 카테고리에 맞게 필터링
  const filteredItems =
    selectedCategory === '전체'
      ? dummyData.items
      : dummyData.items.filter((c) => c.category.name === selectedCategory);

  // 카드 클릭 시 모달 오픈
  const handleCardClick = (challenge) => {
    setSelectedChallenge(challenge);
  };

  //모달 닫기
  const handleCloseModal = () => setSelectedChallenge(null);

  return (
    <div className={s.exploreChallengePageContainer} style={{ marginBottom: '105px' }}>
      <Header />
      <CategoryFilter
        categories={pageCategories}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <AllChallenge challenges={filteredItems} onCardClick={handleCardClick} />

      {/*  모달 렌더링 (선택됐을 때만) */}
      {selectedChallenge && (
        <ChallengeModal challenge={selectedChallenge} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ExploreChallengePage;
