import React, { useState } from 'react';
import useNavigation from '../../../hooks/useNavigation';
import s from './styles/Header.module.scss';
import Logo from '@components/Logo.jsx';
import Popup from '../../../components/Popup';
import SearchBar from '@components/searchBar/SearchBar.jsx';
import { challengeListApi, challengeDetailApi } from '@apis/auth/challengeApi'; // ✅ 1. API 2개 임포트
import useModalStore from '@store/modalStore';

const Header = () => {
  const { goTo } = useNavigation();
  const [query, setQuery] = useState('');
  const openModal = useModalStore((state) => state.openModal);

  // 팝업 확인 버튼
  const [showPopup, setShowPopup] = useState(false);
  const handlePopupConfirm = () => {
    setShowPopup(false);
    goTo('/');
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

        // 2. 챌린지 ID로 상세 API 호출 (모달에 보낼 정확한 데이터)
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

    setQuery(''); // 공통: 입력창 비우기
  };

  return (
    <div className={s.headerContainer}>
      <div className={s.headerTop}>
        <Logo width="62px" height="17px" color="#FCFCFC" />
        <button className={s.loginButton} onClick={() => goTo('/login')}>
          로그인
        </button>
      </div>

      <div className={s.headerBottom}>
        <SearchBar
          placeholder="초대코드로 참여하기"
          backgroundColor="#FCFCFC"
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
