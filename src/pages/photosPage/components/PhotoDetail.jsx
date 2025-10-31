import React, { useState, useRef } from 'react';
import s from './style/PhotoDetail.module.scss';
import EX from '@assets/images/no_photo.png';
import CANCLE from '@assets/images/icons/cancel_icon.svg';
import IconButton from '../../../components/IconButton';
import CommentInput from './CommentInput';
import CommentItem from './CommentItem';
import { useClickPosition } from '../../../hooks/useClickPosition';
import { useCommentPositioning } from '../../../hooks/useCommentPositioning';

const PhotoDetail = ({ onClose }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const containerRef = useRef(null); // 사진 영역 Ref

  // 클릭 위치 로직
  const { clickedPos, handleClick, clearClickedPos } = useClickPosition(containerRef);

  // 스타일 계산 로직
  const { calculateStyleProps } = useCommentPositioning(containerRef);

  // 댓글 등록
  const handleSubmit = () => {
    if (!clickedPos || !newComment.trim()) return;
    setComments([...comments, { ...clickedPos, text: newComment }]);
    clearClickedPos();
    setNewComment('');
  };

  // 입력창 스타일
  const newCommentStyleProps = calculateStyleProps(clickedPos, 'input');
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
      {clickedPos && (
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
