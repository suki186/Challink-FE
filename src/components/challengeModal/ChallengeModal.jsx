import React, { useState } from 'react';
import { joinChallengeApi } from '@apis/auth/challengeApi';
import useNavigation from '../../hooks/useNavigation';
import s from './ChallengeModal.module.scss';
import Popup from '../Popup';
import closeIcon from '../../assets/images/icon_close.svg';
import checkFillIcon from '../../assets/images/check_fill_icon.svg';
import checkIcon from '../../assets/images/check_icon.svg';
import GradientButton from '../../components/GradientButton';

const ChallengeModal = ({ onClose, challengeData }) => {
  const { goTo } = useNavigation();

  const [agreed, setAgreed] = useState(false);

  // 동의하기 버튼
  const handleAgreeClick = () => {
    setAgreed((prev) => !prev);
  };

  // 에러/로딩 상태
  const [apiError, setApiError] = useState('');
  const [errorTitle, setErrorTitle] = useState('');

  // 팝업 확인 버튼
  const [showPopup, setShowPopup] = useState(false);
  const handlePopupConfirm = () => {
    setShowPopup(false);
    goTo('/');
  };

  // 도전하기 버튼
  const handleSubmit = async (e) => {
    if (!agreed) return;
    e.preventDefault();
    try {
      // 성공
      const result = await joinChallengeApi(challengeData.id, { agree_terms: agreed });
      console.log(result);
      onClose();
    } catch (err) {
      if (err.response) {
        const { status, data } = err.response;
        setShowPopup(true); // 실패 시 팝업 열기

        if (status === 400) {
          setApiError(data.message || '이미 참가 중인 챌린지입니다.');
          setErrorTitle('참가중인 챌린지');
        } else if (status === 401) {
          setApiError(data.message || '인증이 누락되었습니다.');
          setErrorTitle('인증 누락');
        } else if (status === 403) {
          setApiError(data.message || '이 챌린지는 현재 참여가 불가합니다.');
          setErrorTitle('참여 불가능');
        } else if (status === 404) {
          setApiError(data.message || '챌린지가 없습니다.');
          setErrorTitle('챌린지 없음');
        } else if (status === 409) {
          setApiError(data.message || '포인트가 부족하거나 정원이 모두 찼습니다.');
          setErrorTitle('포인트 부족');
        } else {
          setApiError('서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
        }
      } else {
        setApiError('인터넷 연결을 확인해주세요.');
      }
      // } finally {
      //   setLoading(false);
    }
  };

  return (
    <div className={s.modalOverlay}>
      <section className={s.challengeModalContainer}>
        {/* 닫기 버튼 */}
        <button className={s.closeButton} onClick={onClose}>
          <img src={closeIcon} alt="닫기 아이콘" />
        </button>

        {/* 제목 */}
        <h2 className={s.challengeTitle}>{challengeData.title}</h2>

        {/* 유저 정보 */}
        <div className={s.userInfo}>
          <p className={s.userName}>{challengeData.owner_name}님의 챌린지</p>
        </div>

        {/* 커버 */}
        <img src={challengeData.cover_image} className={s.coverImage} alt="" />

        {/* 상세 카드 */}
        <div className={s.challengeInfoCard}>
          <h3 className={s.challengeInfo}>
            {challengeData.entry_fee.toLocaleString()}p 걸고 {challengeData.duration_weeks}주 동안{' '}
            {challengeData.freq_type} 인증하기!
          </h3>

          <div className={s.meta}>
            <p className={s.description}>{challengeData.subtitle}</p>
            <p className={s.aiCondition}>{challengeData.ai_condition}</p>
          </div>

          <p className={s.duration}>
            {challengeData.start_date.replaceAll('-', '.')} ~{' '}
            {challengeData.end_date.replaceAll('-', '.')}
          </p>
        </div>

        {/* 동의하기 버튼 */}
        <div className={s.agreeContainer}>
          <button
            type="button"
            className={s.agreeButton}
            onClick={handleAgreeClick}
            aria-pressed={agreed}
          >
            <img
              src={agreed ? checkFillIcon : checkIcon}
              alt={agreed ? '동의됨' : '동의 필요'}
              className={s.agreeIcon}
            />
            위 내용에 동의합니다.
          </button>
        </div>

        {/* 도전하기: 동의해야 활성화 */}
        <GradientButton
          width="255px"
          height="48px"
          text="도전하기"
          fontSize="14px"
          isFilled={true}
          onClick={handleSubmit}
          disabled={!agreed}
        />
        {/* 팝업 조건부 렌더링 */}
        {showPopup && (
          <Popup
            type="success"
            title={errorTitle}
            subtitle={apiError}
            buttonText="확인"
            onClick={handlePopupConfirm}
          />
        )}
      </section>
    </div>
  );
};

export default ChallengeModal;
