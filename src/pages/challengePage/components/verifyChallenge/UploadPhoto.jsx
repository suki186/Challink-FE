import React from 'react';
import s from '../style/UploadPhoto.module.scss';
import GradientButton from '../../../../components/GradientButton';

const UploadPhoto = () => {
  return (
    <div className={s.uploadPhotoContainer}>
      <div className={s.photo}>사진</div>
      <GradientButton width="255px" height="48px" text="사진올리기" />
    </div>
  );
};

export default UploadPhoto;
