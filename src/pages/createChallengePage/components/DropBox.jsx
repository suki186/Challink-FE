import React, { useState, useRef, useEffect } from 'react';
import s from './styles/DropBox.module.scss';
import DownIcon from '../../../assets/images/drop_down _icon.svg';
const DropBox = ({ options, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 첫 번째 옵션을 기본 선택값
  useEffect(() => {
    if (!value && options.length > 0) {
      onChange(options[0].value);
    }
  }, [value, options, onChange]);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={s.dropdownContainer} ref={ref}>
      <button type="button" className={s.dropdownButton} onClick={() => setOpen((prev) => !prev)}>
        <span>{selectedOption ? selectedOption.label : options[0].label}</span>
        <span className={`${s.arrow} ${open ? s.arrowUp : ''}`}>
          <img src={DownIcon} className={s.downIcon} />
        </span>
      </button>

      {open && (
        <ul className={s.dropdownList}>
          {options.map((opt) => (
            <li
              key={opt.value}
              className={`${s.dropdownItem} ${opt.value === value ? s.active : ''}`}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropBox;
