import React from 'react';
import s from './styles/PointHistory.module.scss';
import PointItem from './PointItem';
import GradientButton from '../../../components/GradientButton';
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll';
import { getPointHistoryForHook } from '../../../apis/my/profileApi';

const PointHistory = ({ onClose }) => {
  const {
    items: pointList,
    isLoading,
    hasMore,
    triggerRef,
  } = useInfiniteScroll(getPointHistoryForHook);

  return (
    <div className={s.pointHistoryContainer}>
      <p className={s.pointTitle}>포인트 내역</p>
      <div className={s.pointItemBox}>
        <div className={s.pointItemBoxWrapper}>
          {pointList.map((item) => (
            <PointItem key={item.history_id} point={item} />
          ))}

          <div ref={triggerRef} className={s.scrollTrigger}>
            {isLoading && <p>불러오는 중...</p>}
            {!isLoading && !hasMore && pointList.length === 0 && <p>포인트 내역이 없습니다.</p>}
          </div>
        </div>
      </div>
      <GradientButton width="255px" height="48px" text={`확인`} onClick={onClose} />
    </div>
  );
};

export default PointHistory;
