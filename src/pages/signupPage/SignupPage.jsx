import React, { useState } from 'react';
import { signupUserApi } from '@apis/auth/authApi';
import useNavigation from '@hooks/useNavigation';
import useFormValidation from '@hooks/useFormValidation';
import s from './components/styles/SignupPage.module.scss';

import Header from './components/Header';
import AuthBox from '@components/authBox/AuthBox';
import AuthButton from '@components/AuthButton';
import LoadingSpinner from '../../components/LoadingSpinner';

const SignupPage = () => {
  const { goTo } = useNavigation();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirm: '',
  });

  const isValid = useFormValidation(form);

  // 에러/로딩 상태
  const [apiError, setApiError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = (key) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key === 'email') setEmailError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    setEmailError('');
    try {
      setLoading(true);
      const result = await signupUserApi(form);
      console.log('회원가입 성공!', result);
      goTo('/login');
    } catch (err) {
      if (err.response) {
        const { status, data } = err.response;
        if (status === 409) {
          setEmailError(data.message || '이미 사용 중인 이메일입니다.');
        } else if (status === 400) {
          setApiError(data.message || '입력 형식이 올바르지 않습니다.');
        } else {
          setApiError('서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
        }
      } else {
        setApiError('인터넷 연결을 확인해주세요.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={s.signUpFormContainer}>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <Header />

      <form onSubmit={handleSubmit}>
        <div className={s.signUpFormContainer}>
          <AuthBox
            label="이름"
            type="text"
            placeholder="이름을 입력해 주세요"
            value={form.name}
            onChange={onChange('name')}
          />
          <AuthBox
            label="이메일"
            type="email"
            placeholder="이메일을 입력해 주세요"
            value={form.email}
            onChange={onChange('email')}
          />
          <AuthBox
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            value={form.password}
            onChange={onChange('password')}
          />
          <AuthBox
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 다시 입력해 주세요"
            value={form.password_confirm}
            onChange={onChange('password_confirm')}
          />
        </div>

        <p className={s.condition}>영문, 숫자 포함 8자리 이상</p>

        <div className={s.signUpBtnContainer}>
          <AuthButton text="회원가입" isActive={isValid} type="submit" />
          {(emailError || apiError) && <p className={s.error}>{emailError || apiError}</p>}
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
