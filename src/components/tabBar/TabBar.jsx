import React from 'react';
import s from './style/TabBar.module.scss';
import HOME_FILL from '../../assets/images/icons/home_fill_icon.svg';
import HOME_EMPTY from '../../assets/images/icons/home_empty_icon.svg';
import MY_FILL from '../../assets/images/icons/my_fill_icon.svg';
import MY_EMPTY from '../../assets/images/icons/my_empty_icon.svg';
import CreateChallengeBtn from './CreateChallengeBtn';
import useNavigation from '../../hooks/useNavigation';
import { useLocation } from 'react-router-dom';

const TabBar = () => {
  const { goTo } = useNavigation();
  const { pathname } = useLocation();

  const isActiveHome = pathname.startsWith('/main') || pathname === '/';
  const isActiveMy = pathname.startsWith('/profile');

  return (
    <div className={s.tabBarWrapper}>
      {/* 챌린지 생성 버튼 */}
      <CreateChallengeBtn className={s.createChallengeBtn} />

      {/* 탭바 Body */}
      <svg
        viewBox="0 0 349 68"
        style={{
          width: '100%',
          maxWidth: 'min(88.8vw, 380px)',
          minWidth: '340px',
          height: '88px',
          overflow: 'visible',
        }}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMax meet"
      >
        <defs>
          <filter id="tabBarShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="2"
              dy="-4"
              stdDeviation="3"
              floodColor="#4300D1"
              floodOpacity="0.05"
            />
          </filter>
        </defs>
        <path
          d="M134 0C138.418 0 142 3.58172 142 8V9C142 22.4632 146.804 52.3345 177.25 52.4971C202.613 52.3616 210.18 31.6097 212 16.9004V8C212 3.58175 215.582 0 220 0H341C345.418 0 349 3.58175 349 8V52C349 60.8366 341.837 68 333 68H16C7.16344 68 0 60.8366 0 52V8C2.07779e-06 3.58172 3.58172 0 8 0H134Z"
          fill="white"
          filter="url(#tabBarShadow)"
        />
      </svg>

      {/* 홈, 마이 아이콘 */}
      <div className={s.tabIcons}>
        <div className={s.tabIcon} onClick={() => goTo('/main')}>
          <img src={isActiveHome ? HOME_FILL : HOME_EMPTY} width="18px" height="22px" alt="홈" />
          <p className={s.tabText}>홈</p>
        </div>
        <div className={s.tabIcon} onClick={() => goTo('/profile')}>
          <img src={isActiveMy ? MY_FILL : MY_EMPTY} width="18.69px" height="20.13px" alt="마이" />
          <p className={s.tabText}>마이</p>
        </div>
      </div>
    </div>
  );
};

export default TabBar;
