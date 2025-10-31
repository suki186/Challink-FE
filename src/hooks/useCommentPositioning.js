import { useCallback } from 'react';

// 비율 좌표 -> 픽셀 좌표
const getPixelPosition = (pos, containerEl) => {
  if (!containerEl) return { top: 0, left: 0 };
  const rect = containerEl.getBoundingClientRect();
  return {
    top: rect.top + pos.yRatio * rect.height + window.scrollY,
    left: rect.left + pos.xRatio * rect.width + window.scrollX,
  };
};

// 댓글 위치, 스타일 계산 로직
export const useCommentPositioning = (ref) => {
  const calculateStyleProps = useCallback(
    (pos, type = 'input') => {
      if (!pos || !ref.current) return null;

      const { top: clickTop, left: clickLeft } = getPixelPosition(pos, ref.current);
      const wrapperRect = ref.current.getBoundingClientRect();
      const wrapperWidth = wrapperRect.width;

      // 기본 너비(CommentInput)
      const inputTotalWidth = wrapperWidth / 2;
      let dynamicWidth;
      let dynamicMaxWidth;

      if (type === 'input') {
        dynamicWidth = `${inputTotalWidth}px`;
        dynamicMaxWidth = `${inputTotalWidth}px`;
      } else {
        const itemMaxWidth = inputTotalWidth - 19 - 11; // 버튼 너비 제외
        dynamicWidth = undefined; // fit-content
        dynamicMaxWidth = `${itemMaxWidth}px`;
      }

      const isRightSideClick = pos.xRatio > 0.5;
      let dynamicTransform = '';
      let dynamicRadius = '';

      if (isRightSideClick) {
        dynamicRadius = '8px 8px 0 8px';
        dynamicTransform = 'translate(-100%, -100%)';
      } else {
        dynamicRadius = '8px 8px 8px 0';
        dynamicTransform = 'translateY(-100%)';
      }

      return {
        position: 'absolute',
        top: clickTop,
        left: clickLeft,
        transform: dynamicTransform,
        width: dynamicWidth,
        maxWidth: dynamicMaxWidth,
        borderRadius: dynamicRadius,
      };
    },
    [ref],
  );

  return { calculateStyleProps };
};
