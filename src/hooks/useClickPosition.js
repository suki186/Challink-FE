import { useState, useCallback } from 'react';

// ref를 받아 해당 영역 클릭 시 비율 좌표를 반환하는 훅
export const useClickPosition = (ref) => {
  const [clickedPos, setClickedPos] = useState(null);

  const handleClick = useCallback(
    (e) => {
      if (!ref.current || e.target !== ref.current) {
        return;
      }

      const rect = ref.current.getBoundingClientRect();
      const xRatio = (e.clientX - rect.left) / rect.width;
      const yRatio = (e.clientY - rect.top) / rect.height;

      setClickedPos({ xRatio, yRatio });
    },
    [ref],
  );

  const clearClickedPos = useCallback(() => {
    setClickedPos(null);
  }, []);

  return { clickedPos, handleClick, clearClickedPos };
};
