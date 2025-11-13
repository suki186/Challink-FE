import React from 'react';
import s from './styles/ChallengeCard.module.scss';
import useNavigation from '../../../hooks/useNavigation';
import DefaultPhoto from '@assets/images/no_photo.png';

const ChallengeCard = ({ item, linkType = 'default' }) => {
  const { goTo } = useNavigation();

  const { challenge } = item;

  const handleClick = () => {
    if (linkType === 'my') {
      goTo(`/challenge/${challenge.id}/result`);
    } else {
      goTo(`/challenge/${challenge.id}`);
    }
  };

  return (
    <article key={challenge.id} className={s.challengeCard} onClick={handleClick}>
      <div className={s.coverImageBox}>
        {challenge.cover_image == null ? (
          <img src={DefaultPhoto} alt={challenge.title} className={s.coverImage} />
        ) : (
          <img src={challenge.cover_image} alt={challenge.title} className={s.coverImage} />
        )}
      </div>
      <div className={s.contentBox}>
        <h3 className={s.title}>{challenge.title}</h3>
        <p className={s.subtitle}>{challenge.subtitle}</p>
        <ul className={s.metaList}>
          <li>{challenge.duration_weeks}주 동안</li>
          {challenge.freq_n_days == null ? (
            <li>{challenge.freq_type}</li>
          ) : (
            <li>주 {challenge.freq_n_days}일</li>
          )}
          <li>{challenge.entry_fee.toLocaleString()}p</li>
          <li>{challenge.category.name}</li>
          <li>{challenge.member_count}명</li>
        </ul>
      </div>
    </article>
  );
};

export default ChallengeCard;
