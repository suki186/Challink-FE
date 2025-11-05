import React, { useState } from 'react';
import s from './MyPage.module.scss';
import GradientBox from '../../components/GradientBox.jsx';
import LOGO from '@assets/images/logo_gradient.png';
import CHAR from '@assets/images/character.svg';
import GradientButton from '../../components/GradientButton.jsx';
import ChallengeCard from '../mainPage/components/ChallengeCard.jsx';
import Bubble from '../verifyPage/components/Bubble.jsx';
import user from './datas/userDummy.json';
import PointHistory from './components/PointHistory.jsx';
import { formatNumberWithCommas } from '../../utils/format.js';
import useBodyScrollLock from '../../hooks/useBodyScrollLock.js';

const MyPage = () => {
  const isLoggedIn = true; // 로그인 여부(임시)
  const [isPointModal, setIsPointModal] = useState(false); // 포인트 내역 모달

  // 모달이 열려있을때 뒷배경 스크롤 방지
  useBodyScrollLock(isPointModal);

  // 포인트 모달 열기
  const openPointModal = () => {
    setIsPointModal(true);
  };

  // 포인트 모달 닫기
  const closePointModal = () => {
    setIsPointModal(false);
  };

  if (!isLoggedIn) {
    return (
      <div className={s.myPageContainer}>
        <div className={s.topSection}>
          <section className={s.logoTitle}>
            <img src={LOGO} alt="로고" width="93px" />
            <p>마이페이지</p>
          </section>
          <section className={s.bubbleChar}>
            <Bubble
              width="275px"
              height="49.53"
              text={`로그인을 하고 다양한 챌린지에 참여해 보세요!`}
              fontSize="12px"
            />
            <img src={CHAR} alt="캐릭터" width="145px" />
          </section>
          <GradientBox width="345px" height="40px" square={true} text={`로그인이 필요합니다`} />
        </div>
      </div>
    );
  }

  const { name, email, point_balance, completed_challenges_count } = user;

  return (
    <div className={s.myPageContainer}>
      {/* 로고, 타이틀 */}
      <div className={s.topSection}>
        <section className={s.logoTitle}>
          <img src={LOGO} alt="로고" width="93px" />
          <p>마이페이지</p>
        </section>
        {/* 도전한 챌린지 개수 */}
        <GradientBox
          width="345px"
          height="40px"
          text={`지금까지 ${completed_challenges_count}개의 챌린지에 도전했어요!`}
          square={true}
        />
      </div>
      {/* 계정 정보 */}
      <section className={s.profileBox}>
        <p className={s.sectionTitle}>{name} 님</p>
        <div>
          <p className={s.email}>{email}</p>
          <GradientButton
            width="89px"
            height="29px"
            text={`로그아웃`}
            borderRadius="8px"
            fontSize="12px"
            isFilled={true}
          />
        </div>
      </section>
      {/* 포인트 관리 */}
      <section className={s.pointBox}>
        <p className={s.sectionTitle}>나의 지갑</p>
        <div className={s.totalPoint} onClick={openPointModal}>
          <div className={s.point}>포인트 | {formatNumberWithCommas(point_balance)}</div>
          <p>클릭하면 상세 내역 조회가 가능합니다.</p>
        </div>
        <div className={s.pointButtons}>
          <GradientButton
            width="166px"
            height="40px"
            text={`충전하기`}
            borderRadius="8px"
            fontSize="16px"
            isFilled={true}
          />
          <GradientButton
            width="166px"
            height="40px"
            text={`계좌송금`}
            borderRadius="8px"
            fontSize="16px"
            isFilled={true}
          />
        </div>
      </section>
      <div className={s.divider} />
      <section className={s.endChallenges}>
        <p className={s.sectionTitle}>완료한 챌린지</p>
        <div className={s.endCards}>
          <ChallengeCard />
        </div>
      </section>

      {/* 포인트 내역 모달 */}
      {isPointModal && (
        <div className={s.modalOverlay}>
          <PointHistory onClose={closePointModal} />
        </div>
      )}
    </div>
  );
};

export default MyPage;
