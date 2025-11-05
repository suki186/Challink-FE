import React from 'react';
import s from './style/ChallengeTitle.module.scss';
import BACK from '@assets/images/icons/back_icon.svg';
import IconButton from '../../../components/IconButton';
import GradientBox from '../../../components/GradientBox';
import useNavigation from '../../../hooks/useNavigation';

const ChallengeTitle = ({ title, subTitle }) => {
  const { goBack } = useNavigation();

  return (
    <div className={s.challengeTitleContainer}>
      <div className={s.ongoingTitle}>
        <IconButton src={BACK} alt="뒤로가기" width="16px" onClick={() => goBack()} />
        <p>{title}</p>
      </div>

      <div>
        <GradientBox width="349px" height="40px" text={subTitle} square={true} />
      </div>
    </div>
  );
};

export default ChallengeTitle;
