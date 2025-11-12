import React from 'react';
import s from './style/PhotosChallenge.module.scss';
import CHAR from '@assets/images/character_gradient.png';
import { getFullImagePath } from '../../../utils/imagePath';

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
        let fullImageUrl = getFullImagePath(photo.image);

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
