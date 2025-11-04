import React from 'react';
import s from './style/GradientButton.module.scss';

const GradientButton = ({
  width = '140px',
  height = '48px',
  text,
  borderRadius = '20000px',
  isFilled = false,
  fontSize = '20px',
  onClick,
}) => {
  return (
    <div
      className={`${s.gradientButton} ${isFilled ? s.filled : ''}`}
      style={{ width, height, borderRadius }}
      onClick={onClick}
    >
      <span className={s.innerSpan}>
        <div className={s.innderText} style={{ fontSize }}>
          {text}
        </div>
      </span>
    </div>
  );
};

export default GradientButton;
