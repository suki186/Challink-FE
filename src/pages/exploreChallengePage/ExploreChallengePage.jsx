import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { challengeListApi, challengeDetailApi } from '@apis/auth/challengeApi';
import s from './ExploreChallengePage.module.scss';
import Header from './components/Header.jsx';
import Character from '../../assets/images/character.svg';
import CategoryFilter from '../../components/CategoryFilter.jsx';
import AllChallenge from './components/AllChallengeBig.jsx';
import useNavigation from '../../hooks/useNavigation.js';
import useModalStore from '../../store/modalStore';
import ChallengeModal from '@components/challengeModal/ChallengeModal';
import LoadingSpinner from '../../components/LoadingSpinner.jsx';

const pageCategories = ['전체', '운동', '식습관', '생활', '기타'];

const ExploreChallengePage = () => {
  const { goTo } = useNavigation();
  const openModal = useModalStore((state) => state.openModal);
  const modalData = useModalStore((state) => state.modalData);
  const closeModal = useModalStore((state) => state.closeModal);

  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [listData, setListData] = useState({ items: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  // 챌린지 목록 호출
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const params = {};
        if (query) params.q = query;

        const result = await challengeListApi(params);
        setListData(result);
      } catch (err) {
        console.error('챌린지 목록 로딩 실패:', err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [query]);

  // 카드 클릭 처리
  const handleCardClick = async (challenge) => {
    try {
      const data = await challengeDetailApi(challenge.id);

      if (data.my_membership.is_joined) {
        // 참여중이면 이동
        goTo(`/challenge/${challenge.id}`);
      } else {
        // 미참여면 글로벌 모달 오픈
        openModal('ChallengeModal', { challengeData: data });
      }
    } catch (err) {
      console.error('챌린지 상세 조회 실패:', err);
    }
  };

  // 필터링
  const filteredItems =
    selectedCategory === '전체'
      ? listData.items
      : listData.items.filter((c) => c.category.name === selectedCategory);

  const finalItemsToShow = filteredItems;
  const hasResults = finalItemsToShow.length > 0;
  const isInviteCodeSearch = query && query.startsWith('challink');

  // 글로벌 모달 렌더링
  const renderGlobalModal = () => {
    if (!modalData) return null;
    const { modalType, modalProps } = modalData;

    if (modalType === 'ChallengeModal') {
      return <ChallengeModal challengeData={modalProps.challengeData} onClose={closeModal} />;
    }

    return null;
  };

  return (
    <React.Fragment>
      <div className={s.exploreChallengePageContainer} style={{ marginBottom: '105px' }}>
        <Header />
        <CategoryFilter
          categories={pageCategories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {isLoading ? (
          <LoadingSpinner />
        ) : hasResults ? (
          <AllChallenge challenges={finalItemsToShow} onCardClick={handleCardClick} />
        ) : (
          !isInviteCodeSearch && (
            <div className={s.emptyContainer}>
              <img src={Character} alt="캐릭터" style={{ width: '83px' }} />
              <p>{`챌린지가 없어요.\n직접 만들어 시작해 보세요!`}</p>
            </div>
          )
        )}
      </div>

      {/* 글로벌 모달 렌더링 */}
      {renderGlobalModal()}
    </React.Fragment>
  );
};

export default ExploreChallengePage;
