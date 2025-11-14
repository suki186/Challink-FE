import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import s from './ChallengeLayout.module.scss';
import ChallengeTitle from './components/ChallengeTitle.jsx';
import { challengeDetailApi } from '../../apis/auth/challengeApi.js';
import LoadingSpinner from '../../components/LoadingSpinner.jsx';

// 챌린지 상세 데이터의 부제목
const createSubtitle = (data) => {
  if (!data) return '...';
  const fee = data.entry_fee ? data.entry_fee.toLocaleString('ko-KR') : 0;
  const weeks = data.duration_weeks || 0;

  let freq;
  if (data.freq_n_days) {
    freq = `주 ${data.freq_n_days}일`;
  } else {
    freq = data.freq_type || '알 수 없음';
  }

  return `${fee}p 걸고 ${weeks}주 동안 ${freq} 인증하기!`;
};

const ChallengeLayout = () => {
  const { id } = useParams(); // 챌린지 ID
  const [challengeData, setChallengeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        setLoading(true);
        const data = await challengeDetailApi(id);

        if (!data || !data.my_membership.is_joined) {
          setError('참여 중인 챌린지가 아닙니다.');
          setChallengeData(null);
        } else {
          setChallengeData(data);
        }
      } catch (err) {
        console.error('챌린지 상세 조회 실패:', err);
        setError('데이터를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // 로딩 및 에러 상태
  if (loading) {
    return (
      <div className={s.challengePageContainer} style={{ color: '#FFF', textAlign: 'center' }}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !challengeData) {
    return (
      <div className={s.challengePageContainer} style={{ color: '#FFF', textAlign: 'center' }}>
        {error || '데이터를 찾을 수 없습니다.'}
      </div>
    );
  }

  return (
    <div className={s.challengePageContainer}>
      <ChallengeTitle
        title={challengeData.title || '챌린지'}
        subTitle={createSubtitle(challengeData)}
      />
      <Outlet context={{ challengeData, loading, error }} />
    </div>
  );
};
export default ChallengeLayout;
