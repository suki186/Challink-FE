import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: null,
      user: null, // 사용자 정보
      isLoggedIn: false,

      // 로그인 액션
      login: (token, userData) => {
        set({ accessToken: token, user: userData, isLoggedIn: true });
      },

      // 로그아웃 액션
      logout: () => {
        set({ accessToken: null, user: null, isLoggedIn: false });
        // localStorage도 자동으로 비워줌
      },

      // 사용자 정보 업데이트
      setUser: (userData) => {
        set({ user: userData });
      },
    }),
    {
      name: 'auth-storage', // localStorage에 저장될 키 이름
    },
  ),
);

export default useAuthStore;
