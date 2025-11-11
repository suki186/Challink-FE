import React, { useState, useEffect, useRef } from 'react';
import s from './style/UploadPhoto.module.scss';
import GradientButton from '../../../components/GradientButton';
import CHAR from '@assets/images/character.png';
import Bubble from './Bubble';
import { verifyChallengePhotoApi } from '../../../apis/challenge/verify';
import Popup from '../../../components/Popup';
import AiLoadingBox from './AiLoadingBox';

const UploadPhoto = ({ challengeId }) => {
  const [photo, setPhoto] = useState(null); // 업로드 사진
  const fileInputRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [popupInfo, setPopupInfo] = useState(null);

  // 파일 선택 input 여는 함수
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // 사진 업로드
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }
    setIsLoading(true);
    setPopupInfo(null);

    // 사진 프리뷰 생성
    if (photo) {
      URL.revokeObjectURL(photo);
    }
    setPhoto(URL.createObjectURL(file));

    try {
      if (!challengeId) {
        throw new Error('Challenge ID가 없습니다.');
      }

      const responseData = await verifyChallengePhotoApi(challengeId, file);

      // API 응답에 따라 팝업 상태 설정
      if (responseData.approved) {
        // [인증 성공]
        setPopupInfo({
          type: 'success',
          title: '인증 성공!',
          subtitle: `도전하는 당신, 정말 대단해요 🙌`,
        });
      } else {
        // [인증 실패]
        setPopupInfo({
          type: 'fail',
          title: '인증 실패',
          subtitle: `인증 조건 불일치, 도용, 중복 사용을\n점검해 주세요`,
        });
        setPhoto(null);
      }
    } catch (err) {
      console.error('AI 인증 오류:', err);
      setPopupInfo({
        type: 'fail',
        title: '인증 실패',
        subtitle: `인증 조건 불일치, 도용, 중복 사용을\n점검해 주세요`,
      });
      setPhoto(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (photo) {
        URL.revokeObjectURL(photo);
      }
    };
  }, [photo]);

  // 팝업 닫기
  const handlePopupClose = () => {
    setPopupInfo(null);
  };

  return (
    <div className={s.uploadPhotoContainer}>
      {popupInfo && (
        <Popup
          type={popupInfo.type}
          title={popupInfo.title}
          subtitle={popupInfo.subtitle}
          onClick={handlePopupClose}
        />
      )}
      <div className={s.photo}>
        {photo ? (
          <>
            <img src={photo} alt="업로드된 사진" className={s.uploadedPhoto} />
            {isLoading && <AiLoadingBox />}
          </>
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
      <GradientButton
        width="255px"
        height="48px"
        text={isLoading ? '분석 중...' : '사진올리기'}
        onClick={handleButtonClick}
        disabled={isLoading}
      />

      {/* 숨겨진 파일 첨부 input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handlePhotoUpload}
        disabled={isLoading}
      />
    </div>
  );
};

export default UploadPhoto;
