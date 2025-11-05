// 숫자에 콤마(,)를 추가
export const formatNumberWithCommas = (number) => {
  if (number === null || number === undefined) {
    return '';
  }
  return number.toLocaleString();
};

// 날짜 문자열의 하이픈(-)을 점(.)으로 변경
export const formatDateToDots = (dateString) => {
  if (!dateString) {
    return '';
  }
  return dateString.replace(/-/g, '.');
};
