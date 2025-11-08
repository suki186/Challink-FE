import React from 'react';
import s from './style/CreateChallengeBtn.module.scss';
import PLUS from '../../assets/images/plus_icon.svg';
import useNavigation from '../../hooks/useNavigation';

// 챌린지 생성 버튼
const CreateChallengeBtn = ({ className }) => {
  const { goTo } = useNavigation();

  return (
    <div className={`${s.buttonContainer} ${className || ''}`}>
      <img
        src={PLUS}
        style={{
          height: '100%',
          maxHeight: 'min(6.11vw, 24px)',
          width: '100%',
          maxWidth: 'min(6.11vw, 24px)',
        }}
        onClick={() => goTo('/challenge/create')}
      />
    </div>
  );
};

export default CreateChallengeBtn;
