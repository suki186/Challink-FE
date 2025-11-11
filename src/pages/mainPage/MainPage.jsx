import React from 'react';
import Header from './components/Header';
import MyChallenge from './components/MyChallenge';
import AllChallenge from './components/AllChallenge';
import Footer from '../../components/footer/Footer';
import useModalStore from '../../store/modalStore';
import ChallengeModal from '../../components/challengeModal/ChallengeModal';

const MainPage = () => {
  // 1. (무한 루프 방지) 스토어 구독을 '따로' 합니다.
  const modalData = useModalStore((state) => state.modalData);
  const closeModal = useModalStore((state) => state.closeModal);

  // 2. 렌더링 함수
  const renderGlobalModal = () => {
    if (!modalData) return null;

    const { modalType, modalProps } = modalData;

    if (modalType === 'ChallengeModal') {
      return <ChallengeModal challengeData={modalProps.challengeData} onClose={closeModal} />;
    }

    return null;
  };

  return (
    // 3. React.Fragment로 감싸기
    <React.Fragment>
      {/* 3-1. 페이지 본문 */}
      <div>
        <Header />
        <MyChallenge />
        <AllChallenge />
        <Footer />
      </div>

      {/* 3-2. 모달 렌더링 위치 */}
      {renderGlobalModal()}
    </React.Fragment>
  );
};

export default MainPage;
