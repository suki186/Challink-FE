import React, { useState } from 'react';
import s from './AuthBox.module.scss';
import {
  EmailIcon,
  PasswordIcon,
  NameIcon,
  EyeIcon,
  EyeCloseIcon,
} from '@pages/loginPage/components/icon/index.jsx';

const AuthBox = ({
  label = '이메일',
  type = 'email',
  placeholder = '이메일을 입력해 주세요',
  value = '',
  onChange,
}) => {
  const getIcon = () => {
    switch (label) {
      case '이름':
        return NameIcon;
      case '이메일':
        return EmailIcon;
      case '비밀번호':
        return PasswordIcon;
      case '비밀번호 확인':
        return PasswordIcon;
      default:
        return null;
    }
  };
  const Icon = getIcon();
  const [visible, setVisible] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (visible ? 'text' : 'password') : type;
  return (
    <div className={s.inputContainer}>
      <label className={s.inputLabel}>{label}</label>
      <div className={s.inputWrapper}>
        {Icon && <Icon style={{ color: value.trim() ? '#111' : '#777C89' }} />}
        <input
          className={s.inputBox}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {isPassword && (
          <button
            type="button"
            className={s.togglePasswordBtn}
            onClick={() => setVisible((prev) => !prev)}
            aria-label={visible ? '비밀번호 숨기기' : '비밀번호 보기'}
          >
            {visible ? <EyeIcon /> : <EyeCloseIcon />}
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthBox;
