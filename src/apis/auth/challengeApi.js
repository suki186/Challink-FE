import { defaultInstance, multiInstance } from '../utils/instance';

// 챌린지 생성 (payload: JSON 객체 또는 FormData)
export const createChallengeApi = async (payload) => {
  //  payload가 FormData인지 확인
  const isMultipart = typeof FormData !== 'undefined' && payload instanceof FormData;
  // 타입에 따라 인스턴스 선택
  const client = isMultipart ? multiInstance : defaultInstance;
  const res = await client.post('/challenges/', payload);

  return res.data;
};

// 챌린지 참가
export const joinChallengeApi = async () => {
  const res = await defaultInstance.post(`challenges/{challenge_id}/join/`);
  return res;
};

// 챌린지 검색
export const inviteChallengeApi = async () => {
  const res = await defaultInstance.post(`invites/join/`);
  return res;
};
