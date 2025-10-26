import React from 'react';
import s from './style/GradientBox.module.scss';

const GradientBox = ({ width, height, text }) => {
  return (
    <div className={s.gradientBox} style={{ width, height }}>
      {text}
    </div>
  );
};

export default GradientBox;
