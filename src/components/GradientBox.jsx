import React from 'react';
import s from './style/GradientBox.module.scss';

const GradientBox = ({ width, height, text, borderRadius }) => {
  return (
    <div className={s.gradientBox} style={{ width, height, borderRadius }}>
      {text}
    </div>
  );
};

export default GradientBox;
