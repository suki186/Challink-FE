import React from 'react';
import s from './style/GradientBox.module.scss';
import FIRE from '../assets/images/icons/fire_icon.svg';

const GradientBox = ({
  width,
  height,
  text,
  borderRadius,
  square = false,
  fontSize = '16px',
  icon = false,
}) => {
  const boxClassName = `${s.gradientBox} ${square ? s.isSquare : ''}`;

  return (
    <div className={boxClassName.trim()} style={{ width, height, borderRadius }}>
      <div className={s.gradientText} style={{ fontSize }}>
        {icon && <img src={FIRE} alt="불" width="18px" />}
        {text}
        {icon && <img src={FIRE} alt="불" width="18px" />}
      </div>
    </div>
  );
};

export default GradientBox;
