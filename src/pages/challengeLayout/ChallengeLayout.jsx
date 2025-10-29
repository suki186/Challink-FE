import React from 'react';
import { Outlet } from 'react-router-dom';
import s from './ChallengeLayout.module.scss';
import ChallengeTitle from './components/ChallengeTitle.jsx';

const ChallengeLayout = () => {
  return (
    <div className={s.challengePageContainer}>
      <ChallengeTitle
        title={`📚 매일매일 독서 챌린지`}
        subTitle={`50,000p 걸고 1주 동안 매일 인증하기!`}
      />
      <Outlet />
    </div>
  );
};
export default ChallengeLayout;
