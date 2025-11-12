import React from 'react';
import Header from './components/Header';
import MyChallenge from './components/MyChallenge';
import AllChallenge from './components/AllChallenge';
import Footer from '../../components/footer/Footer';
import useModalStore from '../../store/modalStore';
import ChallengeModal from '../../components/challengeModal/ChallengeModal';

const MainPage = () => {
  // 무한 루프 방지
  const modalData = useModalStore((state) => state.modalData);
  const closeModal = useModalStore((state) => state.closeModal);

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
      <div>
        <Header />
        <MyChallenge />
        <AllChallenge />
        <Footer />
      </div>
      {renderGlobalModal()}
    </React.Fragment>
  );
};

export default MainPage;
