import React from 'react';
import ReactDOM from 'react-dom';
import s from './style/Popup.module.scss';
import CHAR from '@assets/images/character.svg';
import GradientButton from './GradientButton.jsx';

const popupRoot = document.getElementById('popup-root');
const Popup = ({
  type = 'default',
  title = '제목',
  subtitle = '설명',
  buttonText = '확인',
  onClick,
}) => {
  const imageSection = type === 'fail' || type === 'success';
  const popupClasses = `${s.popupContainer} ${s[type]}`; // type에 따른 클래스명

  return ReactDOM.createPortal(
    <div className={s.overlay}>
      <div className={popupClasses}>
        <p className={s.title}>{title}</p>

        {/* 'default' 타입이 아닐 경우에만 이미지/그라데이션 */}
        {imageSection && (
          <div className={s.imageWrapper}>
            <div className={s.gradientCircle}></div>
            <img src={CHAR} alt="popup-visual" className={s.image} />
          </div>
        )}

        <p className={s.subtitle}>{subtitle}</p>

        <GradientButton
          width="127px"
          text={buttonText}
          onClick={onClick}
          isWhite={type === 'fail'}
        />
      </div>
    </div>,
    popupRoot,
  );
};

export default Popup;
