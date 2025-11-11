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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const OngoingPage = () => {
  const { goTo } = useNavigation();
  const location = useLocation();

  const { challengeData } = useOutletContext();

  const currentPath = location.pathname;
  const inviteCode = 'FDFsFE23sRE'; // 임시

  // 데이터 파싱
  const {
    start_date,
    end_date,
    progress_summary,
    participants,
    settlement_note,
    entry_fee,
    member_count,
  } = challengeData;

  const successRateText = progress_summary
    ? `${progress_summary.total_members}명 중 ${progress_summary.success_today}명 성공!`
    : '로딩 중...';

  const todayDate = progress_summary ? formatDateToDots(progress_summary.date) : '';
  const challengePeriod = `${formatDateToDots(start_date)} ~ ${formatDateToDots(end_date)}`;

  const todayPhotos =
    participants?.map((p) => {
      let imageSrc = p.latest_proof_image;
      if (imageSrc && !imageSrc.startsWith('http')) {
        imageSrc = `${API_BASE_URL}media/${imageSrc}`;
      }

      return {
        src: imageSrc || NOPHOTO, // NOPHOTO는 http로 시작하지 않으므로 이 로직을 타지 않음
        name: p.name,
        userId: p.user_id,
      };
    }) || [];

  // 정산 정보 파싱
  let totalMoneyText = '총 참가비: N/A';
  let distributionRuleText = '정산 방법 정보';
  if (settlement_note) {
    const parts = settlement_note.split(' / ');

    const calculatedFee = (entry_fee * member_count).toLocaleString('ko-KR');
    totalMoneyText = `총 참가비: ${calculatedFee}p`;
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
              <TodayPhotoBox key={index} src={item.src} name={item.name} userId={item.userId} />
            ))
          ) : (
            <p style={{ color: '#bbb', textAlign: 'center', marginTop: '20px' }}>
              아직 참여자가 없습니다.
            </p>
          )}
        </section>

        <section className={s.challengeButtom}>
          <div className={s.twoButton}>
            <GradientButton text="인증하기" onClick={() => goTo(`${currentPath}/verify`)} />
            <GradientButton text="도전앨범" onClick={() => goTo(`${currentPath}/photos`)} />
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
