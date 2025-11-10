import React, { useState } from 'react';
import s from './ChallengeModal.module.scss';
import dummyData from './ChallengeModalDummy.json';
import img23 from './23.png';
import closeIcon from '../../assets/images/icon_close.svg';
import checkFillIcon from '../../assets/images/check_fill_icon.svg';
import checkIcon from '../../assets/images/check_icon.svg';
import GradientButton from '../../components/GradientButton';

const ChallengeModal = ({ onClose }) => {
  const c = dummyData;

  const [agreed, setAgreed] = useState(false);

  const handleAgreeClick = () => {
    setAgreed((prev) => !prev);
  };

  const handleSubmit = () => {
    if (!agreed) return;
  };

  return (
    <div className={s.modalOverlay}>
      <section className={s.challengeModalContainer}>
        {/* 닫기 버튼 */}
        <button className={s.closeButton} onClick={onClose}>
          <img src={closeIcon} alt="닫기 아이콘" />
        </button>

        {/* 제목 */}
        <h2 className={s.challengeTitle}>{c.title}</h2>

        {/* 유저 정보 */}
        <div className={s.userInfo}>
          <p className={s.userName}>{c.userName}님의 챌린지</p>
        </div>

        {/* 커버 */}
        <img src={img23} className={s.coverImage} alt="" />

        {/* 상세 카드 */}
        <div className={s.challengeInfoCard}>
          <h3 className={s.challengeInfo}>
            {c.entry_fee.toLocaleString()}p 걸고 {c.duration_weeks}주 동안 {c.freq_type} 인증하기!
          </h3>

          <div className={s.meta}>
            <p className={s.description}>{c.description}</p>
            <p className={s.aiCondition}>{c.ai_condition}</p>
          </div>

          <p className={s.duration}>
            {c.start_date.replaceAll('-', '.')} ~ {c.end_date.replaceAll('-', '.')}
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
      </section>
    </div>
  );
};

export default ChallengeModal;
