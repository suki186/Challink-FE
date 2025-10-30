import React, { useState } from 'react';
import ChallengeBody from '../challengeLayout/ChallengeBody';
import PhotosChallenge from './components/PhotosChallenge';
import data from './datas/photosDummy.json';
import PhotoDetail from './components/PhotoDetail';

const PhotosPage = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null); // 선택된 사진

  // 클릭된 사진 정보를 받아 state에 저장
  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
  };

  // 사진 상세 닫기
  const handleCloseOverlay = () => {
    setSelectedPhoto(null);
  };

  return (
    <>
      <div style={{ width: '100%', height: '32px', backgroundColor: 'red' }}>필터링</div>
      <ChallengeBody height="624px">
        <PhotosChallenge photoData={data} onPhotoClick={handlePhotoClick} />
      </ChallengeBody>

      {selectedPhoto && <PhotoDetail photo={selectedPhoto} onClose={handleCloseOverlay} />}
    </>
  );
};

export default PhotosPage;
