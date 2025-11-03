import React from 'react';
import s from './style/ResultItem.module.scss';
import MY from '../../../assets/images/icons/my_icon.svg';

const ResultItem = ({ isMe = false }) => {
  const progress = (6 / 7) * 100;

  return (
    <div className={s.resultItemContainer}>
      <section className={s.section1}>
        <p className={s.name}>김한성</p>
        {isMe && <img src={MY} alt="MY" width="17px" />}
      </section>
      <section className={s.section2}>
        <p className={s.count}>22/27</p>
        <div className={s.statusBar}>
          <div className={s.statusBarFill} style={{ width: `${progress}%` }}></div>
        </div>
        <p className={s.point}>300,000p</p>
      </section>
    </div>
  );
};

export default ResultItem;
