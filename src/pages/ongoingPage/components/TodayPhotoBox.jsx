import s from './style/TodayPhotoBox.module.scss';
import MY from '@assets/images/icons/my_icon.svg';
import useAuthStore from '../../../store/authStore';

const TodayPhotoBox = ({ name, src, userId }) => {
  const currentUserId = useAuthStore((state) => state.userId);
  const isCurrentUser = currentUserId && userId === currentUserId;

  return (
    <div className={s.todayPhotoBox}>
      <img src={src} alt="인증된 사진" className={s.photo} />
      <div className={s.nameBox}>
        <p className={isCurrentUser ? s.myName : ''}>{isCurrentUser ? 'MY' : name}</p>

        {/* '나'일 경우에만 MY 아이콘 표시 */}
        {isCurrentUser && <img src={MY} alt="나" style={{ width: '12px' }} />}
      </div>
    </div>
  );
};

export default TodayPhotoBox;
