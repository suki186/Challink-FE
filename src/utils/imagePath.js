const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 이미지 경로에 백엔드 주소 붙이기
export const getFullImagePath = (imagePath, fallbackImage) => {
  if (!imagePath) {
    return fallbackImage;
  }

  if (imagePath.startsWith('http')) {
    return imagePath;
  }

  return `${API_BASE_URL}${imagePath}`;
};
