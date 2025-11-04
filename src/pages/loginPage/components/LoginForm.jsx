import React, { useState } from 'react';
import s from './styles/LoginForm.module.scss';
import GradientButton from '../../../components/GradientButton';

import {
  EmailIcon,
  PasswordIcon,
  EyeIcon,
  EyeCloseIcon,
  CheckIcon,
  CheckFillIcon,
} from '../components/icon/index';

const LoginForm = () => {
  const [visible, setVisible] = useState(true);
  const [idSave, setIdSave] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleButtonClick = () => {
    //연동
  };

  return (
    <div className={s.LoginFormContainer}>
      <div className={s.inputField}>
        <label className={s.inputLabel} htmlFor="email">
          이메일
        </label>
        <div className={s.emailWrapper}>
          <EmailIcon style={{ color: email.trim() ? '#111' : '#777C89' }} />

          <input
            className={s.inputBox}
            type="email"
            id="email"
            name="email"
            placeholder="이메일을 입력해 주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className={s.inputField}>
        <label className={s.inputLabel} htmlFor="password">
          비밀번호
        </label>
        <div className={s.passwordWrapper}>
          <PasswordIcon style={{ color: password.trim() ? '#111' : '#777C89' }} />
          <input
            className={s.inputBox}
            type={visible ? 'password' : 'text'}
            id="password"
            name="password"
            placeholder="비밀번호를 입력해 주세요"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className={s.togglePasswordBtn}
            onClick={() => setVisible(!visible)}
            aria-label={visible ? '비밀번호 숨기기' : '비밀번호 보기'}
          >
            {visible ? <EyeCloseIcon /> : <EyeIcon />}
          </button>
        </div>
      </div>

      <div className={s.idSaveContainer}>
        <button type="button" onClick={() => setIdSave(!idSave)} className={s.idSaveBtn}>
          {idSave ? <CheckFillIcon /> : <CheckIcon />} 아이디 저장
        </button>
      </div>
      <div className={s.loginBtnContainer}>
        <GradientButton
          width="100%"
          height="60px"
          text="로그인"
          borderRadius="16px"
          isFilled="false"
          fontSize="18px"
          onClick={handleButtonClick}
        />
      </div>
    </div>
  );
};

export default LoginForm;
