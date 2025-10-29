import React from 'react';
import s from './style/TodayPhotoBox.module.scss';

const TodayPhotoBox = ({ name, src }) => {
  return (
    <div className={s.todayPhotoBox}>
      <img src={src} alt="인증된 사진" />
      <p>{name}</p>
    </div>
  );
};

export default TodayPhotoBox;
