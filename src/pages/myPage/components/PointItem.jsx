import React from 'react';
import s from './styles/PointItem.module.scss';
import { formatNumberWithCommas, formatDateToDots } from '../../../utils/format';

const PointItem = ({ point }) => {
  // 음수, 양수별 포인트 색상
  const pointColor = point.amount < 0 ? '#9D9D9D' : '#00bfff';

  // 금액에 콤마(,) 추가
  const formattedPoint = formatNumberWithCommas(point.amount);

  // 날짜 형식 'YYYY.MM.DD'
  const formattedDate = formatDateToDots(point.occurred_at.slice(0, 10));

  return (
    <div className={s.pointItemContainer}>
      <p className={s.type}>{point.type}</p>
      <div className={s.info}>
        <p className={s.title}>{point.title}</p>
        <p className={s.date}>{formattedDate}</p>
      </div>
      <div className={s.point} style={{ color: pointColor }}>
        {formattedPoint} p
      </div>
    </div>
  );
};

export default PointItem;
