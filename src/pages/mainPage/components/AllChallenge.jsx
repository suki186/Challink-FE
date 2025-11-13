import React, { useEffect, useState } from 'react';
import { challengeListApi, challengeDetailApi } from '@apis/auth/challengeApi';
import useNavigation from '../../../hooks/useNavigation';
import useModalStore from '../../../store/modalStore';
import s from './styles/AllChallenge.module.scss';
import chevron from '@assets/images/chevron_right_icon.svg';
import DefaultPhoto from '@assets/images/no_photo.png';

const AllChallenge = () => {
  const { goTo } = useNavigation();
  const openModal = useModalStore((state) => state.openModal);
  const [list, setList] = useState({ items: [] });

  // 챌린지 목록 불러오기
  useEffect(() => {
    (async () => {
      try {
        const result = await challengeListApi();
        console.log('챌린지 조회 성공', result);
        setList(result);
      } catch (err) {
        console.error('챌린지 목록 로딩 실패:', err);
      }
    })();
  }, []);

  // 카드 클릭 시 처리
  const handleChallengeClick = async (id) => {
    try {
      const data = await challengeDetailApi(id);
      console.log('챌린지 상세 조회 성공', data);

      if (data.my_membership.is_joined) {
        goTo(`/challenge/${id}`);
      } else {
        openModal('ChallengeModal', { challengeData: data });
      }
    } catch (err) {
      console.error('챌린지 상세 조회 실패:', err);
    }
  };

  return (
    <section className={s.allChallengeContainer}>
      <header className={s.header}>
        <h2 className={s.title}>모든 챌린지</h2>
        <button className={s.moreButton} onClick={() => goTo('/explore')}>
          더보기
          <img src={chevron} className={s.moreIcon} alt="더보기 아이콘" />
        </button>
      </header>

      <div className={s.challengeList}>
        {list.items.length === 0 ? (
          <p className={s.emptyText}>등록된 챌린지가 없습니다.</p>
        ) : (
          list.items.map((c) => (
            <article
              key={c.id}
              className={s.challengeItem}
              onClick={() => handleChallengeClick(c.id)}
            >
              <img src={c.cover_image || DefaultPhoto} alt={c.title} className={s.coverImage} />
              <div className={s.contentBox}>
                <h3 className={s.challengeTitle}>{c.title}</h3>
                <ul className={s.metaList}>
                  <li>{c.duration_weeks}주 동안</li>
                  <li>{c.freq_n_days ? `주 ${c.freq_n_days}일` : c.freq_type}</li>
                  <li>{c.entry_fee.toLocaleString()}p</li>
                  <li>{c.member_count}명</li>
                </ul>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
};

export default AllChallenge;
