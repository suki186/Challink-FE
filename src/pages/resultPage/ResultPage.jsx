import ChallengeBody from '../challengeLayout/ChallengeBody';
import s from './ResultPage.module.scss';
import { formatNumberWithCommas } from '../../utils/format';
import ResultItem from './components/ResultItem';
import GradientBox from '../../components/GradientBox';
import GradientButton from '../../components/GradientButton';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { challengeRewardsApi, claimPointApi } from '../../apis/challenge/result';
import useNavigation from '../../hooks/useNavigation';

const ResultPage = () => {
  const { id } = useParams();
  const { goTo } = useNavigation();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [claiming, setClaiming] = useState(false);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const res = await challengeRewardsApi(id);
        setData(res);
      } catch (err) {
        console.error('정산 결과 불러오기 실패:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRewards();
  }, [id]);

  // 보상받기 클릭 핸들러
  const handleClaim = async () => {
    if (!id) return;
    try {
      setClaiming(true);
      await claimPointApi(id);
      alert('보상이 지급되었습니다!');
      goTo('/profile');
    } catch (err) {
      console.error('보상 수령 실패:', err);
      alert('보상 수령 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setClaiming(false);
    }
  };

  if (loading)
    return (
      <ChallengeBody>
        <p>불러오는 중...</p>
      </ChallengeBody>
    );
  if (error)
    return (
      <ChallengeBody>
        <p>정산 정보를 불러오지 못했습니다.</p>
      </ChallengeBody>
    );
  if (!data) return null;

  if (data.status === 'scheduled') {
    return (
      <ChallengeBody>
        <div className={s.resultChallengeContainer}>
          <p style={{ color: 'red' }}>
            정산은 {new Date(data.scheduled_at).toLocaleString()}에 진행됩니다.
          </p>
        </div>
      </ChallengeBody>
    );
  }
  if (data.status === 'processing') {
    return (
      <ChallengeBody>
        <div className={s.resultChallengeContainer}>
          <p style={{ color: 'red' }}>정산이 진행 중입니다. 잠시 후 다시 확인해주세요.</p>
        </div>
      </ChallengeBody>
    );
  }

  if (data.status === 'ready' || data.status === 'paid') {
    const { pot_total, rule_text, allocations, my } = data;
    return (
      <ChallengeBody>
        <div className={s.resultChallengeContainer}>
          {/* 총 참가비, 정산 방법 */}
          <div className={s.moneyInfo}>
            <GradientBox
              width="211px"
              height="36px"
              text={`총 참가비: ${formatNumberWithCommas(pot_total)}p`}
              borderRadius="20000px"
              fontSize="14px"
              icon={true}
            />
            <p>{rule_text}</p>
          </div>

          {/* 멤버별 성공횟수 및 포인트 */}
          <div className={s.memberItems}>
            {allocations.map((allocation) => (
              <ResultItem
                key={allocation.user_id}
                data={allocation}
                isMe={allocation.user_id === my.user_id}
              />
            ))}
          </div>

          {/* 보상받기 버튼 */}
          {data.status === 'ready' && my.can_claim && (
            <GradientButton
              width="196px"
              text={claiming ? '지급 중...' : '보상받기'}
              borderRadius="12px"
              onClick={handleClaim}
            />
          )}
          {data.status === 'paid' && (
            <p className={s.alreadyClaimed}>
              <GradientButton width="196px" text="정산완료!" borderRadius="12px" disabled={true} />
            </p>
          )}
        </div>
      </ChallengeBody>
    );
  }
};

export default ResultPage;
