import React from 'react';
import s from './styles/ChallengeModal.module.scss';
import dummyData from '../datas/ChallengeModalDummy.json';
import img23 from '../datas/23.png';
import closeIcon from '../../../assets/images/icon_close.svg';

const ChallengeModal = () => {
  const c = dummyData;
  return (
    <div className={s.modalOverlay}>
      <section className={s.challengeModalContainer}>
        {/* 닫기 버튼 */}
        <button className={s.closeButton}>
          <img src={closeIcon} alt="닫기 아이콘" />
        </button>

        {/* 챌린지 제목 */}
        <h2 className={s.challengeTitle}>{c.title}</h2>

        {/* 유저 정보 */}
        <div className={s.userInfo}>
          <p className={s.userName}>{c.userName}님의 챌린지</p>
        </div>

        {/* 챌린지 커버 이미지 */}
        <img src={img23} className={s.coverImage} />

        {/* 챌린지 상세 정보 카드 */}
        <div className={s.challengeInfoCard}>
          <h3 className={s.challengeInfo}>
            {c.entry_fee.toLocaleString()}p 걸고 {c.duration_weeks}주 동안 매일 인증하기!
          </h3>

          <div className={s.meta}>
            <p className={s.description}>{c.description}</p>
            <p className={s.aiCondition}>{c.ai_condition}</p>
          </div>

          <p className={s.duration}>
            {c.start_date.replaceAll('-', '.')} ~ {c.end_date.replaceAll('-', '.')}
          </p>
        </div>
      </section>
    </div>
  );
};

export default ChallengeModal;

// {
//     "id": 90,
//     "creator_id": 11,
//     "category": {"id": 4, "name": "생활"},
//     "title": "매일매일 독서 챌린지",
//     "description": "하루에 한 번 조금씩이라도 책을 읽자!",
//     "cover_image": "https://cdn.example.com/covers/reading.jpg",
//     "entry_fee": 50000,
//     "duration_weeks": 1,
//     "freq_type": "daily",
//     "freq_n_days": null,
//     "ai_condition": "책 페이지 번호 + 손가락 브이",
//     "settlement_method": "proportional",
//     "status": "active",
//     "start_date": "2025-10-01",
//     "end_date": "2025-10-08",
//     "created_at": "2025-09-25T06:00:00Z",
//     "updated_at": "2025-10-01T00:00:00Z",

//     "my_membership": {
//       "is_joined": true,
//       "challenge_member_id": 501,
//       "role": "member",
//       "joined_at": "2025-10-26T08:00:00Z"
//     },

//     "invite": {
//       "is_active": true,
//       "code": "BOOK-DAILY-7AM",
//       "expire_at": "2025-10-01T00:00:00Z",
//       "used_count": 12
//     }
//   }
