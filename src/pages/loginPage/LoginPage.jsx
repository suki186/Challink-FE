import React, { useState } from 'react';
import { loginUserApi } from '@apis/auth/authApi';
import useNavigation from '@hooks/useNavigation';
import useFormValidation from '../../hooks/useFormValidation';
import s from './components/styles/LoginPage.module.scss';

import Header from './components/Header';
import AuthBox from '@components/authBox/AuthBox';
import Footer from './components/Footer';
import { CheckIcon, CheckFillIcon } from './components/icon/index';
import AuthButton from '../../components/AuthButton';

const LoginPage = () => {
  const { goTo } = useNavigation();

  const savedEmail = localStorage.getItem('savedEmail') || '';

  const [form, setForm] = useState({
    email: savedEmail,
    password: '',
    remember_id: !!savedEmail,
  });

  const isValid = useFormValidation({
    email: form.email,
    pw: form.password,
  });

  // 에러/로딩 상태
  const [apiError, setApiError] = useState('');
  const [invalidError, setInvalidError] = useState('');
  // const [loading, setLoading] = useState(false);

  const handleButtonClick = async (e) => {
    e.preventDefault();
    try {
      // setLoading(true);
      const result = await loginUserApi(form);
      console.log('로그인 성공', result);
      // 액세스 토큰 저장
      localStorage.setItem('accessToken', result.access_token);
      // 이메일 저장
      if (form.remember_id) {
        localStorage.setItem('savedEmail', form.email.trim());
      } else {
        localStorage.removeItem('savedEmail');
      }

      goTo('/');
    } catch (err) {
      if (err.response) {
        const { status, data } = err.response;
        if (status === 401) {
          setInvalidError(data.message || '이메일 또는 비밀번호가 올바르지 않습니다.');
        } else {
          setApiError('서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
        }
      } else {
        setApiError('인터넷 연결을 확인해주세요.');
      }
      // } finally {
      //   setLoading(false);
    }
  };
  return (
    <div>
      <Header />
      <div className={s.loginFormContainer}>
        <AuthBox
          label="이메일"
          type="email"
          placeholder="이메일을 입력해 주세요"
          value={form.email}
          onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
        />
        <AuthBox
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          value={form.password}
          onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
        />
        <div className={s.idSaveContainer}>
          <button
            type="button"
            onClick={() => setForm((prev) => ({ ...prev, remember_id: !prev.remember_id }))}
            className={s.idSaveBtn}
          >
            {form.remember_id ? <CheckFillIcon /> : <CheckIcon />} 아이디 저장
          </button>
        </div>
      </div>

      <div className={s.loginBtnContainer}>
        <AuthButton text="로그인" isActive={isValid} onClick={handleButtonClick} />
        {(invalidError || apiError) && <p className={s.error}>{invalidError || apiError}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
