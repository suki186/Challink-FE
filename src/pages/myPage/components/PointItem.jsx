import React from 'react';
import s from './styles/PointItem.module.scss';

const PointItem = () => {
  return (
    <div className={s.pointItemContainer}>
      <p className={s.type}>참가</p>
      <div className={s.info}>
        <p className={s.title}>⏰ 매일 7시 기상팟 모집</p>
        <p className={s.date}>2025.10.26</p>
      </div>
      <div className={s.point}>- 30,000 p</div>
    </div>
  );
};

export default PointItem;
