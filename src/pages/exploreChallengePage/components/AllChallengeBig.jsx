import React from 'react';
import s from './styles/AllChallengeBig.module.scss';
import img22 from '../datas/22.png';

const AllChallenge = ({ challenges }) => {
  return (
    <section className={s.allChallengeContainer}>
      <div className={s.challengeList}>
        {challenges.map((c) => (
          <article key={c.id} className={s.challengeItem}>
            <img src={img22} className={s.coverImage} alt={c.title} />
            <div className={s.contentBox}>
              <h3 className={s.challengeTitle}>{c.title}</h3>
              <p className={s.challengeSubtitle}>{c.subtitle}</p>
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
