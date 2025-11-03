import React from 'react';
import { useNavigate } from 'react-router-dom';
import s from './styles/AllChallenge.module.scss';
import dummyData from '../datas/AllChallengeDummy.json';
import img22 from '../datas/22.png';
import chevron from '../../../assets/images/chevron_right_icon.svg';

const AllChallenge = () => {
  const navigate = useNavigate();

  return (
    <section className={s.allChallengeContainer}>
      {/* 상단 타이틀 */}
      <header className={s.header}>
        <h2 className={s.title}>모든 챌린지</h2>
        <button
          className={s.moreButton}
          onClick={() => {
            navigate('/explore');
          }}
        >
          더보기
          <img src={chevron} className={s.moreIcon} alt="더보기 아이콘" />
        </button>
      </header>

      {/* 챌린지 리스트 */}
      <div className={s.challengeList}>
        {dummyData.items.map((c) => (
          <article key={c.id} className={s.challengeItem}>
            <img src={img22} className={s.coverImage} />
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
      </div>
    </section>
  );
};

export default AllChallenge;
