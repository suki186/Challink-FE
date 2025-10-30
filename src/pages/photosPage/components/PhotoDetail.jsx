import React from 'react';
import s from './style/PhotoDetail.module.scss';
import EX from '@assets/images/no_photo.png';
import CANCLE from '@assets/images/icons/cancel_icon.svg';
import IconButton from '../../../components/IconButton';

const PhotoDetail = ({ onClose }) => {
  return (
    <div className={s.photoDetailContainer}>
      {/* 이름, 날짜, x버튼 */}
      <div className={s.photoInfo}>
        <div className={s.tags}>
          <p className={s.tag}>김한성</p>
          <p className={s.tag}>2025.10.02.</p>
        </div>
        <IconButton src={CANCLE} alt="취소" width="20px" onClick={onClose} />
      </div>
      <img src={EX} alt="사진" width="100%" height="408px" />
    </div>
  );
};

export default PhotoDetail;
