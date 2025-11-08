import { defaultInstance } from '../utils/instance';

// 회원가입
export const signupUserApi = async (data) => {
  const res = await defaultInstance.post('/auth/signup/', data);
  return res.data;
};

// 로그인
export const loginUserApi = async (data) => {
  const res = await defaultInstance.post('/auth/login/', data);
  return res.data;
};
