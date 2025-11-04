import React from 'react';
import s from './styles/PointHistory.module.scss';
import PointItem from './PointItem';
import GradientButton from '../../../components/GradientButton';

const PointHistory = () => {
  return (
    <div className={s.pointHistoryContainer}>
      <p className={s.pointTitle}>포인트 내역</p>
      <div className={s.pointItemBox}>
        <div className={s.pointItemBoxWrapper}>
          <PointItem />
          <PointItem />
          <PointItem />
          <PointItem />
          <PointItem />
          <PointItem />
          <PointItem />
          <PointItem />
        </div>
      </div>
      <GradientButton width="255px" height="48px" text={`확인`} />
    </div>
  );
};

export default PointHistory;
