import React, { useState, useEffect, useRef } from 'react';
import s from './style/PhotoDetail.module.scss';
import CANCLE from '@assets/images/icons/cancel_icon.svg';
import IconButton from '../../../components/IconButton';
import CommentInput from './CommentInput';
import CommentItem from './CommentItem';
import { useClickPosition } from '../../../hooks/useClickPosition';
import { useCommentPositioning } from '../../../hooks/useCommentPositioning';
import { formatDateToDots } from '../../../utils/format';
import { createPhotoCommentApi, getPhotoDetailApi } from '../../../apis/challenge/albums';

const PhotoDetail = ({ photo, onClose }) => {
  const { id: photoId } = photo;
  const [detail, setDetail] = useState(photo);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const containerRef = useRef(null); // 사진 영역 Ref

  const [isLoadingComments, setIsLoadingComments] = useState(false); // 댓글 로딩

  // 날짜 형식 'YYYY.MM.DD'
  const formattedDate = detail.created_at ? formatDateToDots(detail.created_at.slice(0, 10)) : '';

  // 기존 댓글 목록 불러오기
  useEffect(() => {
    const fetchComments = async () => {
      if (!photoId) return;

      setIsLoadingComments(true);
      try {
        const detailData = await getPhotoDetailApi(photoId);
        setDetail(detailData);
        setComments(detailData.comments || []); // 댓글 목록만 저장
      } catch (err) {
        console.error('기존 댓글 로딩 실패:', err);
        setComments([]);
      } finally {
        setIsLoadingComments(false);
      }
    };

    fetchComments();
  }, [photoId]);

  // 클릭 위치 로직
  const { clickedPos, handleClick, clearClickedPos } = useClickPosition(containerRef);

  // 스타일 계산 로직
  const { calculateStyleProps } = useCommentPositioning(containerRef);

  // 댓글 등록
  const handleSubmit = async () => {
    if (!clickedPos || !newComment.trim()) return;

    const commentData = {
      content: newComment.trim(),
      x_ratio: clickedPos.x,
      y_ratio: clickedPos.y,
    };

    try {
      const createdComment = await createPhotoCommentApi(photoId, commentData);
      setComments([...comments, createdComment]);

      clearClickedPos();
      setNewComment('');
    } catch (err) {
      console.error('댓글 작성 실패:', err);
      alert('댓글 등록에 실패했습니다.');
    }
  };

  // 입력창 스타일
  const newCommentStyleProps = calculateStyleProps(clickedPos, 'input');
  if (newCommentStyleProps) {
    newCommentStyleProps.zIndex = 10000;
  }

  return (
    <div className={s.overlay}>
      <div className={s.photoDetailContainer}>
        {/* 이름, 날짜, x버튼 */}
        <div className={s.photoInfo}>
          <div className={s.tags}>
            <p className={s.tag}>{detail.user_name}</p>
            <p className={s.tag}>{formattedDate}</p>
          </div>
          <IconButton src={CANCLE} alt="취소" width="20px" onClick={onClose} />
        </div>

        {/* 댓글 클릭 영역 */}
        <div className={s.photoWrapper}>
          <img src={detail.image} alt="사진" width="100%" height="408px" />
          <div ref={containerRef} className={s.commentOverlay} onClick={handleClick} />
        </div>

        <div className={s.commentInfo}>
          <p>사진을 클릭해 댓글을 남겨보세요!</p>
        </div>

        {/* 댓글과 입력창 */}
        {isLoadingComments ? (
          <p>댓글을 불러오는 중...</p>
        ) : (
          comments.map((comment) => {
            const styleProps = calculateStyleProps(comment, 'item');
            if (styleProps) {
              styleProps.zIndex = 9999;
            }
            return <CommentItem key={comment.id} text={comment.content} styleProps={styleProps} />;
          })
        )}

        {clickedPos && (
          <CommentInput
            styleProps={newCommentStyleProps}
            value={newComment}
            onChange={setNewComment}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default PhotoDetail;
