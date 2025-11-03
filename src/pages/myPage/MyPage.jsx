import React from 'react';
import s from './MyPage.module.scss';
import GradientBox from '../../components/GradientBox.jsx';
import LOGO from '@assets/images/logo_gradient.png';
import GradientButton from '../../components/GradientButton.jsx';

const MyPage = () => {
  return (
    <div className={s.myPageWrapper}>
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
            text={`지금까지 3개의 챌린지에 도전했어요!`}
            square={true}
          />
        </div>

        {/* 계정 정보 */}
        <section className={s.profileBox}>
          <p className={s.sectionTitle}>최유성 님</p>
          <div>
            <p className={s.email}>cys990922@naver.com</p>
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
          <div className={s.totalPoint}>
            <div className={s.point}>포인트 | 50,000</div>
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
        </section>
      </div>
    </div>
  );
};

export default MyPage;
