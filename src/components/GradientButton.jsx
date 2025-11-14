import React from 'react';
import s from './style/GradientButton.module.scss';

const GradientButton = ({
  width = '140px',
  height = '48px',
  text,
  borderRadius = '20000px',
  isFilled = false,
  isWhite = false,
  fontSize = '20px',
  disabled = false,
  blueShadow = false,
  onClick,
}) => {
  const computedFilled = disabled ? false : (isFilled ?? true);

  const buttonClasses = [
    s.gradientButton,
    computedFilled ? s.filled : '',
    isWhite ? s.white : '',
    disabled ? s.disabled : '',
    blueShadow ? s.blueshadow : '',
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = (e) => {
    if (disabled) return;
    if (onClick) onClick(e);
  };

  return (
    <div
      className={buttonClasses}
      style={{ width, height, borderRadius }}
      onClick={handleClick}
      aria-disabled={disabled}
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
