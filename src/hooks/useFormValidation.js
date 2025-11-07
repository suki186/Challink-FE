// 입력 필드가 모두 채워져야 활성화되는 훅 (로그인, 회원가입, 챌린지 생성에 사용)
import { useEffect, useState } from 'react';

export default function useFormValidation(fields) {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const allFilled = Object.values(fields).every((v) => v.trim() !== '');
    setIsValid(allFilled);
  }, [fields]);

  return isValid;
}

// const isNextActive = useFormValidation({ title, intro, fee, rule });
