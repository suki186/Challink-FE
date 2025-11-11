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
export const joinChallengeApi = async (challengeId, body) => {
  const res = await defaultInstance.post(`challenges/${challengeId}/join/`, body);
  return res.data;
};

// 모든 챌린지 목록
export const challengeListApi = async () => {
  const res = await defaultInstance.get(`challenges/`);
  return res.data;
};

// 챌린지 검색
export const inviteChallengeApi = async () => {
  const res = await defaultInstance.post(`invites/join/`);
  return res.data;
};

// 챌린지 상세 조회 (팝업)
export const challengeDetailApi = async (challengeId) => {
  const res = await defaultInstance.get(`/challenges/${challengeId}/`);
  return res.data;
};
