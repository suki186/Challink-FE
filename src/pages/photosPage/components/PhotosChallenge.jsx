import React from 'react';
import s from './style/PhotosChallenge.module.scss';
import CHAR from '@assets/images/character.png';

const PhotosChallenge = ({ photoData, onPhotoClick }) => {
  if (!photoData || !photoData.data || photoData.data.length === 0) {
    return (
      <div className={s.noPhotos}>
        <img src={CHAR} alt="캐릭터" width="83px" />
        <div className={s.firstText}>가장 먼저 도전을 시작해 보세요!</div>
      </div>
    );
  }

  return (
    <div className={s.photosContainer}>
      {photoData.data.map((photo) => (
        <img
          key={photo.photo_id}
          className={s.onePhoto}
          src={photo.image_url}
          alt={photo.photo_id}
          onClick={() => onPhotoClick(photo)}
        />
      ))}
    </div>
  );
};

export default PhotosChallenge;
