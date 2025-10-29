import React from 'react';
import s from './style/ChallengeTitle.module.scss';
import BACK from '@assets/images/icons/back_icon.svg';
import IconButton from '../../../components/IconButton';
import GradientBox from '../../../components/GradientBox';

const ChallengeTitle = ({ title, subTitle }) => {
  return (
    <div className={s.challengeTitleContainer}>
      <div className={s.ongoingTitle}>
        <IconButton src={BACK} alt="뒤로가기" width="16px" />
        <p>{title}</p>
      </div>

      <GradientBox
        width="349px"
        height="40px"
        text={subTitle}
        borderRadius="4px"
      />
    </div>
  );
};

export default ChallengeTitle;
