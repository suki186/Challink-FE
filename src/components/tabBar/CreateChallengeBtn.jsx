import React, { useState } from 'react';
import s from './style/CreateChallengeBtn.module.scss';
import PLUS from '../../assets/images/plus_icon.svg';
import Popup from '../../components/Popup';
import useNavigation from '../../hooks/useNavigation';
import useAuthStore from '../../store/authStore';

// 챌린지 생성 버튼
const CreateChallengeBtn = ({ className }) => {
  const { goTo } = useNavigation();

  // 로그인 상태
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [showPopup, setShowPopup] = useState(false);

  const handleCreateClick = () => {
    if (!isLoggedIn) {
      setShowPopup(true); // 팝업 열기
      return;
    }
    goTo('/challenge/create');
  };

  const handlePopupConfirm = () => {
    setShowPopup(false);
    goTo('/login');
  };

  return (
    <div className={`${s.buttonContainer} ${className || ''}`}>
      <img
        src={PLUS}
        style={{
          height: '100%',
          maxHeight: 'min(6.11vw, 24px)',
          width: '100%',
          maxWidth: 'min(6.11vw, 24px)',
        }}
        onClick={handleCreateClick}
      />
      {/* 팝업 조건부 렌더링 */}
      {showPopup && (
        <Popup
          type="success"
          title="로그인을 안했군요!"
          subtitle="로그인을 해야 이용이 가능해요."
          buttonText="확인"
          onClick={handlePopupConfirm}
        />
      )}
    </div>
  );
};

export default CreateChallengeBtn;
