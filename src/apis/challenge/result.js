import { defaultInstance } from '../utils/instance';

// 챌린지 종료(POST)
export const challengeEndApi = async (challenge_id) => {
  const res = await defaultInstance.post(`/challenges/${challenge_id}/end/`);
  return res.data;
};

// 챌린지 정산 결과 조회(GET)
export const challengeRewardsApi = async (challenge_id) => {
  const res = await defaultInstance.get(`/challenges/${challenge_id}/rewards/`);
  return res.data;
};

// 보상 받기(POST)
export const claimPointApi = async (challenge_id) => {
  const res = await defaultInstance.post(`/challenges/${challenge_id}/rewards/claim/`);
  return res.data;
};
