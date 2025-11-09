import axios from 'axios';
import useAuthStore from '../../store/authStore';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ===== 공통 요청 인터셉터
const onRequestFulfilled = (config) => {
  // 스토어에서 토큰 가져오기
  const { accessToken } = useAuthStore.getState();

  // 토큰이 있다면 헤더에 추가
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
};

const onRequestRejected = (error) => {
  return Promise.reject(error);
};

// ===== 공통 응답 인터셉터
const onResponseFulfilled = (response) => {
  return response;
};

const onResponseRejected = (error) => {
  const { response } = error;

  if (response?.status === 401) {
    console.error('401 Unauthorized: 토큰이 만료되었거나 유효하지 않습니다.');
    useAuthStore.getState().logout(); // 스토어 비우기

    if (window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
  }

  return Promise.reject(error);
};

// 기본 인스턴스
export const defaultInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
});
defaultInstance.interceptors.request.use(onRequestFulfilled, onRequestRejected);
defaultInstance.interceptors.response.use(onResponseFulfilled, onResponseRejected);

// form-data 인스턴스
export const multiInstance = axios.create({
  baseURL: BASE_URL,
});
multiInstance.interceptors.request.use(onRequestFulfilled, onRequestRejected);
multiInstance.interceptors.response.use(onResponseFulfilled, onResponseRejected);
