import React from 'react';
import s from './ChallengeField.module.scss';
const Field = ({
  placeholder,
  value,
  onChange,
  multiline = false,
  type = 'text',
  rows = 4,
  width = '100%',
  height,
  rightAddon,
  comment,
}) => {
  const commonStyle = {
    width: width || '100%',
    height: height || '37px',
  };

  return (
    <div className={s.challengeField}>
      <div className={s.fieldControl}>
        {multiline ? (
          <textarea
            className={s.fieldTextarea}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            rows={rows}
            style={commonStyle}
          />
        ) : (
          <input
            className={s.fieldInput}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            style={commonStyle}
          />
        )}

        {rightAddon && <span className={s.fieldAddon}>{rightAddon}</span>}
      </div>

      {comment && <p className={s.fieldComment}>{comment}</p>}
    </div>
  );
};

export default Field;
