import React from 'react';
import s from './style/TabBar.module.scss';
import HOME from '../../assets/images/home_fill_icon.svg';
import MY from '../../assets/images/my_empty_icon.svg';
import CreateChallengeBtn from './CreateChallengeBtn';

const TabBar = () => {
  return (
    <div className={s.tabBarWrapper}>
      {/* 챌린지 생성 버튼 */}
      <CreateChallengeBtn className={s.createChallengeBtn} />

      {/* 탭바 Body */}
      <svg
        viewBox="0 0 349 68"
        width="349"
        height="88"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMax meet"
      >
        <defs>
          <filter
            id="tabBarShadow"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
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

      {/* 홈, 마이 아이콘 -> 나중에 클릭 여부에 따라 아이콘 변경 예정 */}
      <div className={s.tabIcons}>
        <div className={s.tabIcon}>
          <img src={HOME} width="18px" height="22px" />
          <p className={s.tabText}>홈</p>
        </div>
        <div className={s.tabIcon}>
          <img src={MY} width="18.69px" height="20.13px" />
          <p className={s.tabText}>마이</p>
        </div>
      </div>
    </div>
  );
};

export default TabBar;
