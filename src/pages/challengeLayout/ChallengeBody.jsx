import React from 'react';
import s from './ChallengeLayout.module.scss';

// 네이비 박스
const ChallengeBody = ({ height, children }) => {
  return (
    <div className={s.challengeBody} style={{ height: height || 'auto' }}>
      <div className={s.circle}></div>
      <div className={s.contents}>{children}</div>
    </div>
  );
};

export default ChallengeBody;
