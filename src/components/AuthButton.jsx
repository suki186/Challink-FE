import React from 'react';
import s from './style/AuthButton.module.scss';

const AuthButton = ({ text, isActive = false, onClick }) => {
  const handleClick = (e) => {
    // isActive가 false일 때 클릭 방지
    if (!isActive) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  return (
    <button
      className={`${s.authButton} ${isActive ? s.authButtonActive : ''}`} // 활성화 클래스 조건부 적용
      onClick={handleClick}
      disabled={!isActive}
    >
      {text}
    </button>
  );
};

export default AuthButton;
