import { defaultInstance } from '../utils/instance';

// 챌린지 기록 사진 목록(GET)
export const getAllPhotosApi = async (challenge_id, name) => {
  const config = {
    params: {},
  };

  if (name) {
    config.params.name = name;
  }

  const res = await defaultInstance.get(`/challenges/${challenge_id}/albums/`, config);
  return res.data;
};

// 챌린지 기록 사진 댓글 작성(POST)
export const createPhotoCommentApi = async (photo_id, data) => {
  const res = await defaultInstance.post(`/challenges/detail/${photo_id}/comments/`, {
    content: data.content,
    x_ratio: data.x_ratio,
    y_ratio: data.y_ratio,
  });
  return res.data;
};

// 기록 사진 + 댓글 상세 조회(GET)
export const getPhotoDetailApi = async (photo_id) => {
  const res = await defaultInstance.get(`/challenges/detail/${photo_id}/`);
  return res.data;
};
