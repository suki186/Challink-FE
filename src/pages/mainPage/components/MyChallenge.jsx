import React, { useState, useEffect } from 'react';
import { myChallengeListApi } from '@apis/auth/challengeApi';
import s from './styles/MyChallenge.module.scss';
import Character from '@/assets/images/character_body.svg';
import Tail from '@assets/images/character_tail.svg';
import Floor from '../../../assets/images/character_floor.svg';
import ChallengeCard from './ChallengeCard';

const MyChallenge = () => {
  // API 데이터 state
  const [myChallenges, setMyChallenges] = useState({ items: [] });
  // const [isLoading, setIsLoading] = useState(true);

  // API 호출
  useEffect(() => {
    (async () => {
      try {
        // setIsLoading(true);
        // 파라미터 객체
        const params = {
          status: 'active',
          include_owner: true,
          page: 1,
          page_size: 30,
        };
        const result = await myChallengeListApi(params);
        console.log('나의 챌린지 조회 성공', result);
        setMyChallenges(result);
      } catch (err) {
        console.error('나의 챌린지 목록 로딩 실패:', err);
      } // finally {
      //   setIsLoading(false);
      // }
    })();
  }, []); // 마운트 시 1회 실행

  //  챌린지 개수 확인
  const challengeCount = myChallenges.items.length;

  return (
    <section className={s.myChallengeContainer}>
      {/* 제목 + 설명 */}
      <header className={s.header}>
        <h2 className={s.title}>나의 챌린지</h2>
        <p className={s.description}>다양한 경험을 직접 만들어보세요</p>
      </header>
      {/* 캐릭터 + 말풍선 */}
      <div className={s.characterBox}>
        <img src={Character} className={s.characterBody} />
        <img src={Tail} className={s.characterTail} />
        <img src={Floor} className={s.characterFloor} />
      </div>
      <div className={s.quoteBubble}>
        <blockquote className={s.quoteText}>
          {challengeCount === 0
            ? '아직 챌린지가 없어요!'
            : '가장 위대한 영광은 한 번도 실패하지 않음이 아니라 실패할 때마다 다시 일어서는 데에 있다'}
        </blockquote>
      </div>
      {/* 나의 챌린지 목록 */}
      <div className={s.challengeList}>
        {myChallenges.items.map((item) => (
          <ChallengeCard key={item.challenge.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default MyChallenge;
