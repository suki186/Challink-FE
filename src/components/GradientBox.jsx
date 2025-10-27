import React from 'react';
import s from './style/GradientBox.module.scss';

const GradientBox = ({ width, height, text, borderRadius }) => {
  return (
    <div className={s.gradientBox} style={{ width, height, borderRadius }}>
      <p>{text}</p>
    </div>
  );
};

export default GradientBox;
