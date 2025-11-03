import React from 'react';
import s from './style/ResultItem.module.scss';
import MY from '../../../assets/images/icons/my_icon.svg';

const ResultItem = ({ data, isMe }) => {
  const { name, success_days, required_days, reward_points } = data;

  const progress = required_days > 0 ? (success_days / required_days) * 100 : 0; // 성공률

  return (
    <div className={s.resultItemContainer}>
      <section className={s.section1}>
        <p className={s.name}>{name}</p>
        {isMe && <img src={MY} alt="MY" width="17px" />}
      </section>
      <section className={s.section2}>
        <p className={s.count}>
          {success_days}/{required_days}
        </p>
        <div className={s.statusBar}>
          <div className={s.statusBarFill} style={{ width: `${progress}%` }}></div>
        </div>
        <p className={s.point}>{reward_points.toLocaleString()}p</p>
      </section>
    </div>
  );
};

export default ResultItem;
