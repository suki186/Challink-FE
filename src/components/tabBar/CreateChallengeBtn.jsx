import React from 'react';
import s from './style/CreateChallengeBtn.module.scss';
import PLUS from '../../assets/images/plus_icon.svg';

// 챌린지 생성 버튼
const CreateChallengeBtn = ({ className }) => {
  return (
    <div className={`${s.buttonContainer} ${className || ''}`}>
      <img src={PLUS} width={24} height={24} />
    </div>
  );
};

export default CreateChallengeBtn;
