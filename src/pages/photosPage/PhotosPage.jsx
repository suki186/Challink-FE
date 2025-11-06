import React, { useState } from 'react';
import s from './PhotosPage.module.scss';
import ChallengeBody from '../challengeLayout/ChallengeBody';
import PhotosChallenge from './components/PhotosChallenge';
import data from './datas/photosDummy.json';
import PhotoDetail from './components/PhotoDetail';
import useBodyScrollLock from '../../hooks/useBodyScrollLock';
import CategoryFilter from '../../components/CategoryFilter';

const pageCategories = ['MY', '전체', '김동국', '김숙명', '박한성', '김국민'];

const PhotosPage = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null); // 선택된 사진
  const [selectedCategory, setSelectedCategory] = useState('MY');

  useBodyScrollLock(selectedPhoto);

  // 클릭된 사진 정보를 받아 state에 저장
  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
  };

  // 사진 상세 닫기
  const handleCloseOverlay = () => {
    setSelectedPhoto(null);
  };

  // 카테고리 필터링 -> 통신할때 ?name={name} 형식으로 수정 예정
  const filteredPhotos =
    selectedCategory === '전체' ? data : data.filter((p) => p.user_name === selectedCategory);

  return (
    <>
      <div className={s.PhotosPageContainer}>
        <CategoryFilter
          categories={pageCategories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />
        <ChallengeBody height="624px">
          <PhotosChallenge photoData={filteredPhotos} onPhotoClick={handlePhotoClick} />
        </ChallengeBody>
      </div>
      {selectedPhoto && <PhotoDetail photo={selectedPhoto} onClose={handleCloseOverlay} />}
    </>
  );
};

export default PhotosPage;
