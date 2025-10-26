// 참여 중인 챌린지 상세 페이지
import React from 'react';
import s from './style/OngoingChallenge.module.scss';
import GradientBox from '../../../components/GradientBox';
import GradientButton from '../../../components/GradientButton';
import FIRE from '@assets/images/icons/fire_icon.svg';
import DUPLICATE from '@assets/images/icons/duplicate_icon.svg';
import IconButton from '../../../components/IconButton';

const OngoingChallenge = () => {
  return (
    <div>
      <div className={s.todayChallenge}>
        <section className={s.challengeTop}>
          {/* 성공한 사람 수, 오늘 날짜 */}
          <GradientBox width="150px" height="38px" text="6명 중 3명 성공!" />
          <p>2025.10.06 함께하는 챌린저들은?</p>

          {/* 챌린지 기간, 초대 코드 */}
          <div className={s.challengePeriod}>
            <p>2025.10.01 ~ 2025.10.08</p>
            <div className={s.invitedCode}>
              <p>초대코드: FDFsFE34sRE</p>
              <IconButton src={DUPLICATE} alt="복사아이콘" width="16px" />
            </div>
          </div>
        </section>
        <section>사진</section>
        <section className={s.challengeButtom}>
          {/* 인증하기, 도전앨범 버튼 */}
          <div className={s.twoButton}>
            <GradientButton text="인증하기" />
            <GradientButton text="도전앨범" />
          </div>

          {/* 총 참가비, 정산 방법 */}
          <div className={s.moneyInfo}>
            <div className={s.totalMoney}>
              <img src={FIRE} width="18px" />
              <p>총 참가비: 300,000p</p>
              <img src={FIRE} width="18px" />
            </div>
            <p>모인 참가비를 성공자들끼리 N:1 분배해요</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OngoingChallenge;
