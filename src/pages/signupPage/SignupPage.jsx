import React, { useState } from 'react';
import Header from './components/Header';
import AuthBox from '@components/authBox/AuthBox';
import s from './components/styles/SignupPage.module.scss';
import GradientButton from '@components/GradientButton';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const handleButtonClick = () => {
    //연동
  };

  return (
    <div>
      <Header />
      <div className={s.signUpFormContainer}>
        <AuthBox
          label="이름"
          type="text"
          placeholder="이름을 입력해 주세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <AuthBox
          label="이메일"
          type="email"
          placeholder="이메일을 입력해 주세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <AuthBox
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
        <AuthBox
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 다시 입력해 주세요"
          value={pw2}
          onChange={(e) => setPw2(e.target.value)}
        />
      </div>
      <p className={s.condition}>영문, 숫자 포함 8자리 이상</p>
      <div className={s.signUpBtnContainer}>
        <GradientButton
          width="100%"
          height="60px"
          text="회원가입"
          borderRadius="16px"
          isFilled="false"
          fontSize="18px"
          onClick={handleButtonClick}
        />
      </div>
    </div>
  );
};

export default SignupPage;
