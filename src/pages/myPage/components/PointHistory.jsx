import React from 'react';
import s from './styles/PointHistory.module.scss';
import PointItem from './PointItem';
import GradientButton from '../../../components/GradientButton';
import data from '../datas/pointItemDummy.json';

const PointHistory = ({ onClose }) => {
  const points = data.results;

  return (
    <div className={s.pointHistoryContainer}>
      <p className={s.pointTitle}>포인트 내역</p>
      <div className={s.pointItemBox}>
        <div className={s.pointItemBoxWrapper}>
          {points.map((item) => (
            <PointItem key={item.history_id} point={item} />
          ))}
        </div>
      </div>
      <GradientButton width="255px" height="48px" text={`확인`} onClick={onClose} />
    </div>
  );
};

export default PointHistory;
