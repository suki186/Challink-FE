import React, { useState, useRef } from 'react';
import s from './style/PhotoDetail.module.scss';
import EX from '@assets/images/no_photo.png';
import CANCLE from '@assets/images/icons/cancel_icon.svg';
import IconButton from '../../../components/IconButton';
import CommentInput from './CommentInput';
import CommentItem from './CommentItem';

const PhotoDetail = ({ onClose }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [inputPos, setInputPos] = useState(null);
  const containerRef = useRef(null); // 사진 영역 Ref

  // 클릭 좌표 계산
  const handleClick = (e) => {
    if (!containerRef.current || e.target !== containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width;
    const yRatio = (e.clientY - rect.top) / rect.height;

    setInputPos({ xRatio, yRatio });
    setNewComment('');
  };

  // 댓글 등록
  const handleSubmit = () => {
    if (!inputPos || !newComment.trim()) return;
    setComments([...comments, { ...inputPos, text: newComment }]);
    setInputPos(null);
    setNewComment('');
  };

  // px 좌표 계산
  const getPixelPosition = (pos) => {
    if (!containerRef.current) return { top: 0, left: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    return {
      top: rect.top + pos.yRatio * rect.height + window.scrollY,
      left: rect.left + pos.xRatio * rect.width + window.scrollX,
    };
  };

  // 스타일 계산 로직
  const calculateStyleProps = (pos, type = 'input') => {
    if (!pos || !containerRef.current) return null;

    const { top: clickTop, left: clickLeft } = getPixelPosition(pos);
    const wrapperRect = containerRef.current.getBoundingClientRect();
    const wrapperWidth = wrapperRect.width;

    // 기본 너비(CommentInput)
    const inputTotalWidth = wrapperWidth / 2;
    let dynamicWidth;
    let dynamicMaxWidth;

    if (type === 'input') {
      // Input: 고정 너비
      dynamicWidth = `${inputTotalWidth}px`;
      dynamicMaxWidth = `${inputTotalWidth}px`;
    } else {
      // Item: 너비 auto, 최대 너비만 버튼 뺌
      const itemMaxWidth = inputTotalWidth - 19 - 11;

      dynamicWidth = undefined; // fit-content
      dynamicMaxWidth = `${itemMaxWidth}px`; // 최대 너비
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
  };

  // 입력창 스타일
  const newCommentStyleProps = calculateStyleProps(inputPos, 'input');
  if (newCommentStyleProps) {
    newCommentStyleProps.zIndex = 10000;
  }

  return (
    <div className={s.photoDetailContainer}>
      {/* 이름, 날짜, x버튼 */}
      <div className={s.photoInfo}>
        <div className={s.tags}>
          <p className={s.tag}>김한성</p>
          <p className={s.tag}>2025.10.02.</p>
        </div>
        <IconButton src={CANCLE} alt="취소" width="20px" onClick={onClose} />
      </div>

      {/* 댓글 클릭 영역 */}
      <div className={s.photoWrapper}>
        <img src={EX} alt="사진" width="100%" height="408px" />
        <div ref={containerRef} className={s.commentOverlay} onClick={handleClick} />
      </div>

      {/* 댓글과 입력창 */}
      {comments.map((comment, index) => {
        const styleProps = calculateStyleProps(comment, 'item');
        if (styleProps) {
          styleProps.zIndex = 9999;
        }
        return <CommentItem key={index} text={comment.text} styleProps={styleProps} />;
      })}
      {inputPos && (
        <CommentInput
          styleProps={newCommentStyleProps}
          value={newComment}
          onChange={setNewComment}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default PhotoDetail;
