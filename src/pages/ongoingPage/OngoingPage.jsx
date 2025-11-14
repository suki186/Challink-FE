import { useEffect } from 'react';
import { useLocation, useOutletContext } from 'react-router-dom';
import s from './OngoingPage.module.scss';
import useNavigation from '../../hooks/useNavigation';
import FIRE from '@assets/images/icons/fire_icon.svg';
import DUPLICATE from '@assets/images/icons/duplicate_icon.svg';
import NOPHOTO from '@assets/images/no_photo.png';
import GradientBox from '../../components/GradientBox';
import IconButton from '../../components/IconButton';
import TodayPhotoBox from './components/TodayPhotoBox';
import GradientButton from '../../components/GradientButton';
import ChallengeBody from '../challengeLayout/ChallengeBody';
import { formatDateToDots } from '../../utils/format';
import { getFullImagePath } from '../../utils/imagePath';
import { challengeEndApi } from '../../apis/challenge/result';
import useAuthStore from '../../store/authStore';
import LoadingSpinner from '../../components/LoadingSpinner';

const OngoingPage = () => {
  const { goTo } = useNavigation();
  const location = useLocation();
  const { userId } = useAuthStore();
  const { challengeData } = useOutletContext();

  const currentPath = location.pathname;

  // 챌린지 종료 체크
  useEffect(() => {
    if (!challengeData) return;

    const today = new Date();
    const endDate = new Date(challengeData.end_date + 'T00:00:00');
    //const endDate = new Date('2025-11-11T00:00:00'); // 테스트용

    const endNextDayMidnight = new Date(endDate);
    endNextDayMidnight.setDate(endDate.getDate() + 1);
    endNextDayMidnight.setHours(0, 0, 0, 0);

    if (today >= endNextDayMidnight) {
      challengeEndApi(challengeData.id)
        .then((res) => {
          console.log('챌린지 종료 성공:', res);
          goTo(`${currentPath}/result`); // ResultPage로 이동
        })
        .catch((err) => {
          if (err.response?.data?.error === 'ALREADY_ENDED') {
            console.log('이미 종료된 챌린지입니다.');
            goTo(`${currentPath}/result`);
          } else {
            console.error('챌린지 종료 실패:', err);
          }
        });
    }
  }, [challengeData, currentPath, goTo]);

  if (!challengeData) return <p>로딩 중...</p>;

  // 데이터 파싱
  const {
    start_date,
    end_date,
    progress_summary,
    participants,
    settlement_note,
    total_entry_pot,
    invite_codes,
    ai_condition,
  } = challengeData;

  const inviteCode = invite_codes?.[0]?.code;

  const successRateText = progress_summary
    ? `${progress_summary.total_members}명 중 ${progress_summary.success_today}명 성공!`
    : '로딩 중...';

  const todayDate = progress_summary ? formatDateToDots(progress_summary.date) : '';
  const challengePeriod = `${formatDateToDots(start_date)} ~ ${formatDateToDots(end_date)}`;

  // 현재 로그인한 유저의 참여 정보
  const myParticipationInfo = participants?.find((p) => p.user_id === userId);
  // 오늘 인증했는지
  const hasUserVerifiedToday = myParticipationInfo?.has_proof_today || false;

  const todayPhotos =
    participants?.map((p) => ({
      src: getFullImagePath(p.has_proof_today ? p.latest_proof_image : null, NOPHOTO),
      name: p.user_id === userId ? 'MY' : p.name,
      userId: p.user_id,
    })) || [];

  // 정산 정보 파싱
  let totalMoneyText = '총 참가비: N/A';
  let distributionRuleText = '정산 방법 정보';
  if (settlement_note) {
    const parts = settlement_note.split(' / ');

    totalMoneyText = `총 참가비: ${total_entry_pot.toLocaleString('ko-KR')}p`;
    if (parts[1]) distributionRuleText = parts[1].trim();
  }

  // 복사 핸들러
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteCode);
      alert('초대코드가 복사되었습니다!');
    } catch (err) {
      console.error('복사 실패:', err);
      alert('복사에 실패했습니다');
    }
  };

  if (!challengeData) {
    return (
      <div className={s.todayChallenge}>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <ChallengeBody>
      <div className={s.todayChallenge}>
        <section className={s.challengeTop}>
          <GradientBox width="150px" height="38px" text={successRateText} borderRadius="20000px" />
          <p>{todayDate} 함께하는 챌린저들은?</p>

          <div className={s.challengePeriod}>
            <p>{challengePeriod}</p>
            <div className={s.invitedCode}>
              <p>초대코드: {inviteCode}</p>
              <IconButton src={DUPLICATE} alt="복사아이콘" width="16px" onClick={handleCopy} />
            </div>
          </div>
        </section>

        <section className={s.todayPhotoGrid}>
          {todayPhotos.length > 0 ? (
            todayPhotos.map((item, index) => (
              <TodayPhotoBox
                key={index}
                src={item.src}
                name={item.name}
                userId={item.userId}
                onClick={() => {
                  const otherParticipants = participants
                    .filter((p) => p.user_id !== userId)
                    .map((p) => ({ name: p.name, user_id: p.user_id }));

                  goTo(`${currentPath}/photos`, {
                    state: {
                      participants: otherParticipants,
                    },
                  });
                }}
              />
            ))
          ) : (
            <p style={{ color: '#bbb', textAlign: 'center', marginTop: '20px' }}>
              아직 참여자가 없습니다.
            </p>
          )}
        </section>

        <section className={s.challengeButtom}>
          <div className={s.twoButton}>
            <GradientButton
              text={hasUserVerifiedToday ? '인증 완료' : '인증하기'}
              disabled={hasUserVerifiedToday}
              onClick={() =>
                goTo(`${currentPath}/verify`, {
                  state: {
                    ai_condition,
                    owner_id: participants.find((p) => p.is_owner)?.user_id,
                    start_date: challengeData.start_date,
                    end_date: challengeData.end_date,
                  },
                })
              }
            />
            <GradientButton
              text="도전앨범"
              onClick={() => {
                const otherParticipants = participants
                  .filter((p) => p.user_id !== userId)
                  .map((p) => ({ name: p.name, user_id: p.user_id }));

                goTo(`${currentPath}/photos`, {
                  state: {
                    participants: otherParticipants,
                  },
                });
              }}
            />
          </div>

          <div className={s.moneyInfo}>
            <div className={s.totalMoney}>
              <img src={FIRE} width="18px" alt="불꽃" />
              <p>{totalMoneyText}</p>
              <img src={FIRE} width="18px" alt="불꽃" />
            </div>
            <p>{distributionRuleText}</p>
          </div>
        </section>
      </div>
    </ChallengeBody>
  );
};

export default OngoingPage;
