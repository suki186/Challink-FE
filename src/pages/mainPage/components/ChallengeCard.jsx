import React from 'react';
import s from './styles/ChallengeCard.module.scss';
import dummyData from '../datas/ChallengeCardDummy.json';
import img22 from '../datas/22.png';

const ChallengeCard = () => {
  return (
    <section className={s.challengeCardContainer}>
      {dummyData.results.map((c) => (
        <article key={c.id} className={s.challengeCard}>
          <div className={s.coverImageBox}>
            <img src={img22} className={s.coverImage} />
          </div>
          <div className={s.contentBox}>
            <h3 className={s.title}>{c.title}</h3>
            <p className={s.desc}>{c.description}</p>
            <ul className={s.metaList}>
              <li>{c.duration_weeks}주 동안</li>
              <li>{c.freq_type}</li>
              <li>{c.entry_fee.toLocaleString()}p</li>
              <li>{c.category}</li>
              <li>{c.member_count}명</li>
            </ul>
          </div>
        </article>
      ))}
    </section>
  );
};

export default ChallengeCard;
