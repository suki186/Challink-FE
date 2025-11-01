import React from 'react';
import s from './style/GradientBox.module.scss';

const GradientBox = ({ width, height, text, borderRadius, square = false, fontSize = '16px' }) => {
  const boxClassName = `${s.gradientBox} ${square ? s.isSquare : ''}`;

  return (
    <div className={boxClassName.trim()} style={{ width, height, borderRadius }}>
      <div className={s.gradientText} style={{ fontSize }}>
        {text}
      </div>
    </div>
  );
};

export default GradientBox;
