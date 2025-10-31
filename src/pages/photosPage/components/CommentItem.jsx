import React from 'react';
import { createPortal } from 'react-dom';
import s from './style/Comment.module.scss';

const CommentItem = ({ text, styleProps }) => {
  return createPortal(
    <div style={styleProps} className={`${s.commentInputPopup} ${s.itemPopup}`}>
      <p className={s.commentItemText}>{text}</p>
    </div>,
    document.body,
  );
};

export default CommentItem;
