import React, { useState, useEffect } from 'react';
import { challengeListApi, challengeDetailApi } from '@apis/auth/challengeApi';
import s from '././ExploreChallengePage.module.scss';
import Header from './components/Header.jsx';
import CategoryFilter from '../../components/CategoryFilter.jsx';
import AllChallenge from './components/AllChallengeBig.jsx';
import ChallengeModal from '@components/challengeModal/ChallengeModal.jsx';

const pageCategories = ['전체', '운동', '삭습관', '생활', '기타'];

const ExploreChallengePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedChallengeId, setSelectedChallengeId] = useState(null);
  // 목록 API 데이터
  const [listData, setListData] = useState({ items: [] });
  // const [loading, setLoading] = useState(false);

  //  상세 API 데이터
  const [detailData, setDetailData] = useState(null);
  // const [isDetailLoading, setIsDetailLoading] = useState(false);

  // 목록 API 호출
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

  useEffect(() => {
    if (!selectedChallengeId) {
      setDetailData(null); // ID가 null이면(닫기) 상세 데이터 비우기
      return;
    }

    // ID가 선택되면 상세 API 호출
    (async () => {
      try {
        // setIsDetailLoading(true);
        const data = await challengeDetailApi(selectedChallengeId);
        setDetailData(data); // API 응답(A 또는 B)을 state에 저장
      } catch (err) {
        console.error('챌린지 상세 조회 실패:', err);
      } // finally {
      // setIsDetailLoading(false);
      // }
    })();
  }, [selectedChallengeId]);

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
      {/* 모달 렌더링 조건 수
           - detailData가 있고 (API 응답 완료)
           - is_joined가 false인 (미참여) 경우
      */}
      {detailData && !detailData.my_membership.is_joined && (
        <ChallengeModal
          challengeData={detailData} // ID 대신 '데이터 객체'를 prop으로 전달
          onClose={handleCloseModal}
        />
      )}
      {/* 참고: 팀원이 구현할 부분 (참여 중)
          {detailData && detailData.my_membership.is_joined && ( // 조건
            // 불러올 페이지 및 컴포넌트
          )}
        */}
    </div>
  );
};

export default ExploreChallengePage;
