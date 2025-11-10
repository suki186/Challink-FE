import { defaultInstance } from '../utils/instance';

// 마이페이지 정보 조회(GET)
export const userInfoApi = async () => {
  const res = await defaultInstance.get(`/users/me/`);
  return res.data;
};

// 완료한 챌린지 목록(GET)
export const getCompletedChallengesApi = async (params) => {
  const res = await defaultInstance.get(`/challenges/my/completed/`, { params });
  return res.data;
};

// 포인트 내역(GET)
export const getHistoryPointApi = async ({ page, page_size }) => {
  const res = await defaultInstance.get(`/wallet/history/`, {
    params: { page, page_size },
  });
  return res.data;
};
// 포인트 내역: useInfiniteScroll 훅을 위한 Wrapper 함수
export const getPointHistoryForHook = async ({ page, page_size }) => {
  const data = await getHistoryPointApi({ page, page_size });
  return {
    items: data.results,
    total: data.total_count,
  };
};

// 포인트 충전(POST)
export const chargePointApi = async (data) => {
  const res = await defaultInstance.post(`/challenges/wallet/charge/`, data);
  return res.data;
};
