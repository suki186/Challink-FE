import React, { useState, useEffect, useRef } from 'react';
import heic2any from 'heic2any';
import s from './style/UploadPhoto.module.scss';
import GradientButton from '../../../components/GradientButton';
import CHAR from '@assets/images/character.png';
import Bubble from './Bubble';
import { verifyChallengePhotoApi } from '../../../apis/challenge/verify';
import Popup from '../../../components/Popup';
import AiLoadingBox from './AiLoadingBox';
import useNavigation from '../../../hooks/useNavigation';

const UploadPhoto = ({ challengeId }) => {
  const { goTo } = useNavigation();

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

    // API 전송용 파일
    const fileForApi = file;

    // 미리보기용 Blob
    let blobForPreview = file;

    const fileName = file.name.toLowerCase();
    const isHeic = fileName.endsWith('.heic') || fileName.endsWith('.heif');

    if (isHeic) {
      try {
        console.log('HEIC 파일 프리뷰 변환 시작');
        const conversionResult = await heic2any({
          blob: file, // 원본 HEIC
          toType: 'image/jpeg',
          quality: 0.8,
        });

        const convertedBlob = Array.isArray(conversionResult)
          ? conversionResult[0]
          : conversionResult;

        blobForPreview = convertedBlob;

        console.log('HEIC 프리뷰 변환 성공.');
      } catch (err) {
        console.error('HEIC 프리뷰 변환 실패:', err);
      }
    }

    const localPreviewUrl = URL.createObjectURL(blobForPreview);
    setPhoto(localPreviewUrl);

    // 인증 API 호출
    try {
      if (!challengeId) {
        throw new Error('Challenge ID 없음');
      }

      const responseData = await verifyChallengePhotoApi(challengeId, fileForApi);

      // API 응답에 따라 팝업 상태 설정
      if (responseData.approved) {
        // [인증 성공]
        setPopupInfo({
          type: 'success',
          title: '인증 성공!',
          subtitle: `도전하는 당신, 정말 대단해요 🙌`,
        });

        const backendImageUrl = responseData.imageUrl;

        if (backendImageUrl) {
          setPhoto(backendImageUrl);
        }
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

    // 성공하면 챌린지 상세 페이지로 이동
    if (popupInfo?.type === 'success') {
      goTo(`/challenge/${challengeId}`);
    }
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
        accept="image/*,image/heic,image/heif"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handlePhotoUpload}
        disabled={isLoading}
      />
    </div>
  );
};

export default UploadPhoto;
