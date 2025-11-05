// 참여 중인 챌린지 상세 페이지
import React from 'react';
import s from './style/OngoingChallenge.module.scss';
import GradientBox from '../../../components/GradientBox';
import GradientButton from '../../../components/GradientButton';
import FIRE from '@assets/images/icons/fire_icon.svg';
import DUPLICATE from '@assets/images/icons/duplicate_icon.svg';
import BOOK from '@assets/images/book_ex.jpg';
import NOPHOTO from '@assets/images/no_photo.png';

import IconButton from '../../../components/IconButton';
import TodayPhotoBox from './TodayPhotoBox';
import useNavigation from '../../../hooks/useNavigation';
import { useLocation } from 'react-router-dom';

const todayPhotos = [
  { src: BOOK, name: '김한성' },
  { src: NOPHOTO, name: '김한성' },
  { src: BOOK, name: '김한성' },
  { src: NOPHOTO, name: '김한성' },
  { src: NOPHOTO, name: '김한성' },
  { src: BOOK, name: '김한성' },
];

const OngoingChallenge = () => {
  const { goTo } = useNavigation();
  const location = useLocation(); // 챌린지 id
  const currentPath = location.pathname;

  const inviteCode = 'FDFsFE23sRE';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteCode);
      alert('초대코드가 복사되었습니다!');
    } catch (err) {
      console.error('복사 실패:', err);
      alert('복사에 실패했습니다');
    }
  };

  return (
    <div className={s.todayChallenge}>
      <section className={s.challengeTop}>
        {/* 성공한 사람 수, 오늘 날짜 */}
        <GradientBox width="150px" height="38px" text="6명 중 3명 성공!" borderRadius="20000px" />
        <p>2025.10.06 함께하는 챌린저들은?</p>

        {/* 챌린지 기간, 초대 코드 */}
        <div className={s.challengePeriod}>
          <p>2025.10.01 ~ 2025.10.08</p>
          <div className={s.invitedCode}>
            <p>초대코드: {inviteCode}</p>
            <IconButton src={DUPLICATE} alt="복사아이콘" width="16px" onClick={handleCopy} />
          </div>
        </div>
      </section>
      <section className={s.todayPhotoGrid}>
        {todayPhotos.map((item, index) => (
          <TodayPhotoBox key={index} src={item.src} name={item.name} />
        ))}
      </section>
      <section className={s.challengeButtom}>
        {/* 인증하기, 도전앨범 버튼 */}
        <div className={s.twoButton}>
          <GradientButton text="인증하기" onClick={() => goTo(`${currentPath}/verify`)} />
          <GradientButton text="도전앨범" onClick={() => goTo(`${currentPath}/photos`)} />
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
  );
};

export default OngoingChallenge;
