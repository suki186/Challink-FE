import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { challengeListApi, challengeDetailApi } from '@apis/auth/challengeApi';
import s from '././ExploreChallengePage.module.scss';
import Header from './components/Header.jsx';
import Character from '../../assets/images/character.svg';
import CategoryFilter from '../../components/CategoryFilter.jsx';
import AllChallenge from './components/AllChallengeBig.jsx';
import ChallengeModal from '@components/challengeModal/ChallengeModal.jsx';

const pageCategories = ['전체', '운동', '식습관', '생활', '기타'];

const ExploreChallengePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedChallengeId, setSelectedChallengeId] = useState(null);
  // 목록 API 데이터
  const [listData, setListData] = useState({ items: [] });
  const [isLoading, setIsLoading] = useState(true);

  //  상세 API 데이터
  const [detailData, setDetailData] = useState(null);
  // const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  // 목록 API 호출
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        // API에 전달할 params 객체 생성
        const params = {};
        if (query) {
          params.q = query; // 검색어가 있으면 q 파라미터 추가
        }

        const result = await challengeListApi(params);
        setListData(result); // state에 저장
      } catch (err) {
        console.error('챌린지 목록 로딩 실패:', err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [query]); // 마운트 시 1회 실행

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
      } finally {
        // setIsDetailLoading(false);
      }
    })();
  }, [selectedChallengeId]);

  // 선택한 카테고리에 맞게 필터링
  const filteredItems =
    selectedCategory === '전체'
      ? listData.items
      : listData.items.filter((c) => c.category.name === selectedCategory);

  // 카테고리까지 필터링된 최종 결과
  const finalItemsToShow = filteredItems;
  const hasResults = finalItemsToShow.length > 0;

  // 현재 검색어가 초드코대인지 확인
  const isInviteCodeSearch = query && query.startsWith('challink');

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
      {/* 모달 렌더링 조건 detailData가 있고 (API 응답 완료), is_joined가 false인 (미참여) 경우 */}
      {detailData && !detailData.my_membership.is_joined && (
        <ChallengeModal challengeData={detailData} onClose={handleCloseModal} />
      )}
      {/* 참고: 팀원이 구현할 부분 (참여 중)
          {detailData && detailData.my_membership.is_joined && ( // 조건
            // 불러올 페이지 및 컴포넌트
          )}
        */}
      {/* 조건부 렌더링 */}
      {isLoading ? (
        <p>로딩 중...</p>
      ) : hasResults ? (
        // 결과가 있을 때 -> AllChallenge 렌더링
        <AllChallenge challenges={finalItemsToShow} onCardClick={handleCardClick} />
      ) : (
        // 결과가 없을 때
        //  "초대코드 검색"이 아닐 때
        !isInviteCodeSearch && (
          <div className={s.emptyContainer}>
            <img src={Character} alt="캐릭터" style={{ width: '83px' }} />
            <p>
              검색한 챌린지가 없어요.
              <br /> 직접 만들어 시작해 보세요!
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default ExploreChallengePage;
