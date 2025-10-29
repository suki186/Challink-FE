import React from 'react';
import s from './style/GradientButton.module.scss';

const GradientButton = ({ width = '140px', height = '48px', text, onClick }) => {
  return (
    <div className={s.gradientButton} style={{ width, height }} onClick={onClick}>
      <span className={s.innerSpan}>
        <div className={s.innderText}>{text}</div>
      </span>
    </div>
  );
};

export default GradientButton;
