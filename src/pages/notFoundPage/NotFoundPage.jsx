import React from 'react';
import s from './NotFoundPage.module.scss';
import LOGO from '@assets/images/logo_gradient.png';
import CHAR from '@assets/images/character.png';

const NotFoundPage = () => {
  return (
    <div className={s.notFoundContainer}>
      <img src={LOGO} alt="로고" width="131px" />
      <img
        src={CHAR}
        alt="캐릭터"
        width="145px"
        style={{ marginTop: '157px', marginRight: '30px' }}
      />
      <div className={s.textBox}>
        <p className={s.notFoundText}>404 Not Found</p>
        <p className={s.subText}>앗! 여기서는 챌린지를 찾을 수 없어요 😅</p>
      </div>
    </div>
  );
};

export default NotFoundPage;
