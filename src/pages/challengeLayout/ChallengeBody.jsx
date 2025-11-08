import React from 'react';
import s from './ChallengeLayout.module.scss';

// 네이비 박스
const ChallengeBody = ({ children }) => {
  return (
    <div className={s.challengeBody} style={{ height: '100vh' }}>
      <div className={s.circle}></div>
      <div className={s.contents}>{children}</div>
    </div>
  );
};

export default ChallengeBody;
