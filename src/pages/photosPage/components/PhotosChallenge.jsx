import React from 'react';
import s from './style/PhotosChallenge.module.scss';
import CHAR from '@assets/images/character_gradient.png';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PhotosChallenge = ({ photoData, onPhotoClick }) => {
  if (!photoData || photoData.length === 0) {
    return (
      <div className={s.noPhotos}>
        <img src={CHAR} alt="캐릭터" width="150px" />
        <div className={s.firstText}>빨리 도전을 시작해 보세요!</div>
      </div>
    );
  }

  return (
    <div className={s.photosContainer}>
      {photoData.map((photo) => {
        let fullImageUrl = photo.image; // 이미지 경로

        if (fullImageUrl && !fullImageUrl.startsWith('http')) {
          fullImageUrl = `${API_BASE_URL}${fullImageUrl}`;
        }

        return (
          <img
            key={photo.id}
            className={s.onePhoto}
            src={fullImageUrl}
            alt={photo.id}
            onClick={() => onPhotoClick(photo)}
          />
        );
      })}
    </div>
  );
};

export default PhotosChallenge;
