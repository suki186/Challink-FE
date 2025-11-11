import { useEffect, useState, useCallback } from 'react';
import s from './MyPage.module.scss';
import GradientBox from '../../components/GradientBox.jsx';
import LOGO from '@assets/images/logo_gradient.png';
import CHAR from '@assets/images/character.svg';
import GradientButton from '../../components/GradientButton.jsx';
import ChallengeCard from '../mainPage/components/ChallengeCard.jsx';
import Bubble from '../verifyPage/components/Bubble.jsx';
import PointHistory from './components/PointHistory.jsx';
import { formatNumberWithCommas } from '../../utils/format.js';
import useBodyScrollLock from '../../hooks/useBodyScrollLock.js';
import useNavigation from '../../hooks/useNavigation.js';
import useAuthStore from '../../store/authStore.js';
import {
  chargePointApi,
  getCompletedChallengesApi,
  userInfoApi,
} from '../../apis/my/profileApi.js';
import { logoutUserApi } from '../../apis/auth/authApi.js';
import { useModal } from '../../hooks/useModal.js';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll.js';

const MyPage = () => {
  const { goTo } = useNavigation();

  // 계정 정보
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);

  // 포인트 내역 모달 상태
  const {
    isOpen: isPointModal,
    openModal: openPointModal,
    closeModal: closePointModal,
  } = useModal();

  // 무한 스크롤 상태
  const {
    items: completedList, // 완료한 챌린지들
    isLoading: listLoading,
    triggerRef,
    reset: resetList,
    loadFirstPage, // 첫 페이지 로드 함수
  } = useInfiniteScroll(getCompletedChallengesApi);

  // 로딩 State
  const [pageLoading, setPageLoading] = useState(true); // 페이지 전체(유저 정보) 로딩
  const [isCharging, setIsCharging] = useState(false); // 충전 버튼 로딩 상태

  // 모달이 열려있을때 뒷배경 스크롤 방지
  useBodyScrollLock(isPointModal);

  // 마이페이지 상세 정보 조회
  useEffect(() => {
    if (isLoggedIn) {
      const fetchUserData = async () => {
        try {
          setPageLoading(true);
          const data = await userInfoApi();
          setUser(data);
          console.log('마이페이지 정보 조회 성공');
        } catch (error) {
          console.error('마이페이지 정보 조회 실패:', error);
          if (error.response && error.response.status === 401) {
            handleLogout();
          }
        } finally {
          setPageLoading(false);
        }
      };
      fetchUserData();
    } else {
      setPageLoading(false);
    }
  }, [isLoggedIn, setUser]);

  useEffect(() => {
    if (isLoggedIn) {
      loadFirstPage();
    } else {
      resetList();
    }
  }, [isLoggedIn, loadFirstPage, resetList]);

  // 로그아웃 함수
  const handleLogout = useCallback(async () => {
    try {
      await logoutUserApi();
    } catch (error) {
      console.error('서버 로그아웃 실패:', error);
    } finally {
      logout(); // 스토어 비우기
      goTo('/');
    }
  }, [logout, goTo]);

  // 포인트 충전 함수
  const handleCharge = useCallback(async () => {
    if (isCharging) return;
    setIsCharging(true);

    const chargeData = {
      amount: 10000,
      description: '충전',
    };

    try {
      const data = await chargePointApi(chargeData);
      console.log('포인트 충전 성공');

      // 스토어 업데이트
      setUser({ point_balance: data.point_balance_after });
      alert('10,000 포인트가 충전되었습니다.');
    } catch (error) {
      console.error('포인트 충전 실패:', error);
      alert('충전에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsCharging(false);
    }
  }, [isCharging, setUser]);

  if (pageLoading) {
    return <div className={s.myPageContainer}>로딩 중...</div>;
  }

  // 비로그인 UI
  if (!isLoggedIn) {
    return (
      <div className={s.myPageContainer}>
        <div className={s.topSection}>
          <section className={s.logoTitle}>
            <img src={LOGO} alt="로고" width="93px" />
            <p>마이페이지</p>
          </section>
          <section className={s.bubbleChar}>
            <Bubble
              width="275px"
              height="49.53"
              text={`로그인을 하고 다양한 챌린지에 참여해 보세요!`}
              fontSize="12px"
            />
            <img src={CHAR} alt="캐릭터" width="145px" />
          </section>
          <GradientBox width="345px" height="40px" square={true} text={`로그인이 필요합니다`} />
        </div>
      </div>
    );
  }

  const { name, email, point_balance, completed_challenges_count } = user || {};

  return (
    <div className={s.myPageContainer}>
      {/* 로고, 타이틀 */}
      <div className={s.topSection}>
        <section className={s.logoTitle}>
          <img src={LOGO} alt="로고" width="93px" />
          <p>마이페이지</p>
        </section>
        {/* 도전한 챌린지 개수 */}
        <GradientBox
          width="345px"
          height="40px"
          text={
            completed_challenges_count
              ? `지금까지 ${completed_challenges_count}개의 챌린지에 도전했어요!`
              : '아직 완료한 챌린지가 없네요. 함께 시작해봐요!'
          }
          square={true}
        />
      </div>
      {/* 계정 정보 */}
      <section className={s.profileBox}>
        <p className={s.sectionTitle}>{name} 님</p>
        <div>
          <p className={s.email}>{email}</p>
          <GradientButton
            width="89px"
            height="29px"
            text={`로그아웃`}
            borderRadius="8px"
            fontSize="12px"
            isFilled={true}
            onClick={handleLogout}
          />
        </div>
      </section>
      {/* 포인트 관리 */}
      <section className={s.pointBox}>
        <p className={s.sectionTitle}>나의 지갑</p>
        <div className={s.totalPoint} onClick={openPointModal}>
          <div className={s.point}>포인트 | {formatNumberWithCommas(point_balance)}</div>
          <p>클릭하면 상세 내역 조회가 가능합니다.</p>
        </div>
        <div className={s.pointButtons}>
          <GradientButton
            width="166px"
            height="40px"
            text={isCharging ? '충전 중...' : '충전하기'}
            borderRadius="8px"
            fontSize="16px"
            isFilled={true}
            onClick={handleCharge}
          />
          <GradientButton
            width="166px"
            height="40px"
            text={`계좌송금`}
            borderRadius="8px"
            fontSize="16px"
            isFilled={true}
          />
        </div>
      </section>

      {/* 완료한 챌린지 */}
      <div className={s.divider} />
      <section className={s.endChallenges}>
        <p className={s.sectionTitle}>완료한 챌린지</p>
        <div className={s.endCards}>
          {completedList.length > 0
            ? completedList.map((item) => <ChallengeCard key={item.challenge.id} item={item} />)
            : !listLoading && <p></p>}
        </div>

        {/* 무한 스크롤 트리거 */}
        <div ref={triggerRef} className={s.scrollTrigger}>
          {listLoading && <p>불러오는 중...</p>}
        </div>
      </section>

      {/* 포인트 내역 모달 */}
      {isPointModal && (
        <div className={s.modalOverlay}>
          <PointHistory onClose={closePointModal} />
        </div>
      )}
    </div>
  );
};

export default MyPage;
