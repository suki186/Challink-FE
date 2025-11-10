import React, { useEffect, useState } from 'react';
import { challengeListApi } from '@apis/auth/challengeApi';
import useNavigation from '../../../hooks/useNavigation';
import s from './styles/AllChallenge.module.scss';
import chevron from '@assets/images/chevron_right_icon.svg';
import ChallengeModal from '@components/challengeModal/ChallengeModal';

const AllChallenge = () => {
  const { goTo } = useNavigation();
  const [list, setList] = useState({ items: [] });
  const [selectedChallengeId, setSelectedChallengeId] = useState(null);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        // setIsLoading(true);
        const result = await challengeListApi();
        console.log('챌린지 조회 성공', result);
        setList(result);
      } catch (err) {
        console.log(err);
      }
      //  finally {
      //   setIsLoading(false);
      // }
    })();
  }, []);

  return (
    <section className={s.allChallengeContainer}>
      {/* 상단 타이틀 */}
      <header className={s.header}>
        <h2 className={s.title}>모든 챌린지</h2>
        <button
          className={s.moreButton}
          onClick={() => {
            goTo('/explore');
          }}
        >
          더보기
          <img src={chevron} className={s.moreIcon} alt="더보기 아이콘" />
        </button>
      </header>

      {/* 챌린지 리스트 */}
      <div className={s.challengeList}>
        {list.items.map((c) => (
          <article
            key={c.id}
            className={s.challengeItem}
            onClick={() => setSelectedChallengeId(c.id)}
          >
            <img src={c.cover_image} className={s.coverImage} />
            <div className={s.contentBox}>
              <h3 className={s.challengeTitle}>{c.title}</h3>
              <ul className={s.metaList}>
                <li>{c.duration_weeks}주 동안</li>
                <li>{c.freq_type}</li>
                <li>{c.entry_fee.toLocaleString()}p</li>
                <li>{c.member_count}명</li>
              </ul>
            </div>
          </article>
        ))}
        {selectedChallengeId && (
          <ChallengeModal
            challengeId={selectedChallengeId}
            onClose={() => setSelectedChallengeId(null)} // 닫기 버튼
          />
        )}
      </div>
    </section>
  );
};

export default AllChallenge;
