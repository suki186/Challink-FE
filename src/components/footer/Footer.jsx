import React from 'react';
import s from './Footer.module.scss';
import LOGO from '@assets/images/logo.svg';
import Logo from '@components/Logo.jsx';

const Footer = () => {
  return (
    <div className={s.footerContainer}>
      <section className={s.footerTop}>
        <Logo width="58px" height="16px" color="#1D1C42" />
        <p className={s.footerText}>
          AI 인증으로 공정성을 확보하고, 재미있게 습관을 만드는 챌린지 플랫폼
        </p>
      </section>
      <section className={s.developer}>
        <p>
          PM
          <br />
          김서희
        </p>
        <p>
          Design
          <br />
          최유성
        </p>
        <p>
          FrontEnd
          <br />
          김서희, 정교은
        </p>
        <p>
          BackEnd
          <br />
          권수현, 김석준, 김유미
        </p>
      </section>
    </div>
  );
};

export default Footer;
