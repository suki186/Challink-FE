import React, { useState, useEffect } from 'react';
import { challengeListApi } from '@apis/auth/challengeApi';
import s from '././ExploreChallengePage.module.scss';
import Header from './components/Header.jsx';
import CategoryFilter from '../../components/CategoryFilter.jsx';
import AllChallenge from './components/AllChallengeBig.jsx';
import ChallengeModal from '@components/challengeModal/ChallengeModal.jsx';

const pageCategories = ['전체', '운동', '삭습관', '생활', '기타'];

const ExploreChallengePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedChallengeId, setSelectedChallengeId] = useState(null);
  // API 데이터
  const [listData, setListData] = useState({ items: [] });
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        // setIsLoading(true);
        const result = await challengeListApi(); // API 호출
        setListData(result); // state에 저장
      } catch (err) {
        console.error('챌린지 목록 로딩 실패:', err);
      }
      //  finally {
      //   setIsLoading(false);
      // }
    })();
  }, []); // 마운트 시 1회 실행

  // 선택한 카테고리에 맞게 필터링
  const filteredItems =
    selectedCategory === '전체'
      ? listData.items // 더미 데이터 대신 listData 사용
      : listData.items.filter((c) => c.category.name === selectedCategory);

  // 카드 클릭 시 모달 오픈
  const handleCardClick = (challenge) => {
    setSelectedChallengeId(challenge.id);
  };
  const handleCloseModal = () => setSelectedChallengeId(null);

  return (
    <div className={s.exploreChallengePageContainer} style={{ marginBottom: '105px' }}>
      <Header />
      <CategoryFilter
        categories={pageCategories}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <AllChallenge challenges={filteredItems} onCardClick={handleCardClick} />{' '}
      {/*  모달 렌더링 (선택됐을 때만) */}
      {selectedChallengeId && (
        <ChallengeModal challengeId={selectedChallengeId} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ExploreChallengePage;
