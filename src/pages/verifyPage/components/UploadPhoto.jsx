import React, { useState, useRef } from 'react';
import s from './style/UploadPhoto.module.scss';
import GradientButton from '../../../components/GradientButton';
import CHAR from '@assets/images/character.png';
import Bubble from './Bubble';

const UploadPhoto = () => {
  const [photo, setPhoto] = useState(null); // 업로드 사진
  const fileInputRef = useRef(null);

  // 파일 선택 input 여는 함수
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // 사진 업로드
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  return (
    <div className={s.uploadPhotoContainer}>
      <div className={s.photo}>
        {photo ? (
          <img src={photo} alt="업로드된 사진" className={s.uploadedPhoto} />
        ) : (
          // 사진 안올린 경우
          <div className={s.noUpload}>
            <Bubble
              width="207px"
              height="80.7px"
              text={`혹시… 오늘 인증 깜빡하신 건\n아니죠?`}
              fontSize="14px"
            />
            <img src={CHAR} alt="캐릭터" width="83px" />
          </div>
        )}
      </div>

      {/* 사진올리기 버튼 */}
      <GradientButton width="255px" height="48px" text="사진올리기" onClick={handleButtonClick} />

      {/* 숨겨진 파일 첨부 input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handlePhotoUpload}
      />
    </div>
  );
};

export default UploadPhoto;
