import React, { useState } from 'react';
import useNavigation from '../../../hooks/useNavigation';
import s from './styles/Header.module.scss';
import chevron from '@assets/images/chevron_left_icon.svg';
import SearchBar from '@components/searchBar/SearchBar.jsx';
import { challengeListApi, challengeDetailApi } from '@apis/auth/challengeApi';
import useModalStore from '@store/modalStore';
import Popup from '../../../components/Popup';

const Header = () => {
  const { goTo, goBack } = useNavigation();
  const [query, setQuery] = useState('');
  const openModal = useModalStore((state) => state.openModal);
  // 팝업 확인 버튼
  const [showPopup, setShowPopup] = useState(false);
  const handlePopupConfirm = () => {
    setShowPopup(false);
    goTo('/explore');
  };
  const handleSearchSubmit = async (searchText) => {
    const code = searchText.trim();
    if (code === '') return;

    // challink로 시작하는지 확인
    if (code.startsWith('challink')) {
      // 초대코드 로직
      try {
        // 초대코드로 목록 API 호출
        const listResult = await challengeListApi({ q: code });

        if (listResult.items.length === 0) {
          setShowPopup(true);
          setQuery('');
          return;
        }

        //  챌린지 ID로 상세 API 호출
        const challengeId = listResult.items[0].id;
        const detailData = await challengeDetailApi(challengeId);

        // 이미 참여 중인 챌린지일 경우
        if (detailData.my_membership.is_joined) {
          alert('이미 참여 중인 챌린지입니다.');
          goTo(`/challenge/${challengeId}`); // 상세 페이지로 이동
        } else {
          // 아직 참여하지 않은 경우
          openModal('ChallengeModal', { challengeData: detailData });
        }
      } catch (err) {
        console.error('초대코드 처리 실패:', err);
        alert('초대코드 처리 중 오류가 발생했습니다.');
      }
    } else {
      // 일반 검색어
      goTo(`/explore?q=${code}`);
    }
    setQuery('');
  };

  return (
    <div className={s.headerContainer}>
      <div className={s.headerTop}>
        <button className={s.backButton} onClick={() => goBack()}>
          <img src={chevron} alt="뒤로 가기 아이콘" className={s.backIcon} />
        </button>
        <h2 className={s.title}>모든 챌린지</h2>
      </div>
      <div className={s.headerBottom}>
        <SearchBar
          placeholder="관심있는 챌린지를 검색해보세요!"
          backgroundColor="#E9E9E9"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onSubmit={handleSearchSubmit}
        />
      </div>
      {/* 팝업 조건부 렌더링 */}
      {showPopup && (
        <Popup
          type="success"
          title="잘못된 초대코드"
          subtitle="유효하지 않거나 만료된 초대코드 입니다."
          buttonText="확인"
          onClick={handlePopupConfirm}
        />
      )}
    </div>
  );
};

export default Header;
