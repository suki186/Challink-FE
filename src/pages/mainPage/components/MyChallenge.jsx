import React from 'react';
import s from './styles/MyChallenge.module.scss';
import Character from '@/assets/images/character_body.svg';
import Tail from '@assets/images/character_tail.svg';
import Floor from '../../../assets/images/character_floor.svg';

const MyChallenge = () => {
  return (
    <section className={s.myChallengeContainer}>
      {/* 제목 + 설명 */}
      <header className={s.header}>
        <h2 className={s.title}>나의 챌린지</h2>
        <p className={s.description}>다양한 경험을 직접 만들어보세요</p>
      </header>
      <div className={s.characterBox}>
        <img src={Character} className={s.characterBody} />
        <img src={Tail} className={s.characterTail} />
        <img src={Floor} className={s.characterFloor} />
      </div>
      <div className={s.quoteBubble}>
        <blockquote className={s.quoteText}>
          가장 위대한 영광은 한 번도 실패하지 않음이 아니라 실패할 때마다 다시 일어서는 데에 있다
        </blockquote>
      </div>
    </section>
  );
};

export default MyChallenge;
