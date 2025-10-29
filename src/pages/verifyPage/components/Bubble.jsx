import React from 'react';
import s from './style/Bubble.module.scss';

// 말풍선
const Bubble = ({ width, height, text, fontSize }) => {
  return (
    <div className={s.bubble} style={{ width, height }}>
      <p style={{ fontSize }}>{text}</p>
    </div>
  );
};

export default Bubble;
