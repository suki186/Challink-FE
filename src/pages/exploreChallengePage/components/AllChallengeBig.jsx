import React from 'react';
import s from './styles/AllChallengeBig.module.scss';
import DefaultPhoto from '@assets/images/no_photo.png';

const AllChallenge = ({ challenges, onCardClick }) => {
  return (
    <section className={s.allChallengeContainer}>
      <div className={s.challengeList}>
        {challenges.map((c) => (
          <article key={c.id} className={s.challengeItem} onClick={() => onCardClick?.(c)}>
            {c.cover_image == null ? (
              <img src={DefaultPhoto} alt={c.title} className={s.coverImage} />
            ) : (
              <img src={c.cover_image} alt={c.title} className={s.coverImage} />
            )}{' '}
            <div className={s.contentBox}>
              <h3 className={s.challengeTitle}>{c.title}</h3>
              <p className={s.challengeSubtitle}>{c.subtitle}</p>
              <ul className={s.metaList}>
                <li>{c.duration_weeks}주 동안</li>
                {c.freq_n_days == null ? <li>{c.freq_type}</li> : <li>주 {c.freq_n_days}일</li>}
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
