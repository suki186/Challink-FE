import React, { useEffect, useState } from 'react';
import { challengeListApi, challengeDetailApi } from '@apis/auth/challengeApi';
import useNavigation from '../../../hooks/useNavigation';
import s from './styles/AllChallenge.module.scss';
import chevron from '@assets/images/chevron_right_icon.svg';
import ChallengeModal from '@components/challengeModal/ChallengeModal';
import DefaultPhoto from '@assets/images/no_photo.png';

const AllChallenge = () => {
  const { goTo } = useNavigation();
  // 목록 api 데이터
  const [list, setList] = useState({ items: [] });
  // const [loading, setLoading] = useState(false);

  // 상세 api 데이터
  const [selectedChallengeId, setSelectedChallengeId] = useState(null);
  const [detailData, setDetailData] = useState(null);
  // const [isDetailLoading, setIsDetailLoading] = useState(false);

  // 목록 api 호출
  useEffect(() => {
    (async () => {
      try {
        // setIsLoading(true);
        const result = await challengeListApi();
        console.log('챌린지 조회 성공', result);
        setList(result);
      } catch (err) {
        console.log(err);
      }
      //  finally {
      //   setIsLoading(false);
      // }
    })();
  }, []);

  // 상세 api 호출
  useEffect(() => {
    if (!selectedChallengeId) {
      setDetailData(null); // ID가 null이면(닫기) 상세 데이터 비우기
      return;
    }
    // ID 선택되면 상세 API 호출
    (async () => {
      try {
        // setIsDetailLoading(true);
        const data = await challengeDetailApi(selectedChallengeId);
        setDetailData(data);
        console.log('챌린지 상세 조회 성공', data);
      } catch (err) {
        console.error('챌린지 상세 조회 실패:', err);
      } // finally {
      // setIsDetailLoading(false);
      // }
    })();
  }, [selectedChallengeId]); // selectedChallengeId 바뀔 때마다 실행

  // 모달 닫기
  const handleCloseModal = () => setSelectedChallengeId(null);

  return (
    <section className={s.allChallengeContainer}>
      {/* 상단 타이틀 */}
      <header className={s.header}>
        <h2 className={s.title}>모든 챌린지</h2>
        <button
          className={s.moreButton}
          onClick={() => {
            goTo('/explore');
          }}
        >
          더보기
          <img src={chevron} className={s.moreIcon} alt="더보기 아이콘" />
        </button>
      </header>

      {/* 챌린지 리스트 */}
      <div className={s.challengeList}>
        {list.items.map((c) => (
          <article
            key={c.id}
            className={s.challengeItem}
            onClick={() => setSelectedChallengeId(c.id)}
          >
            {c.cover_image == null ? (
              <img src={DefaultPhoto} alt={c.title} className={s.coverImage} />
            ) : (
              <img src={c.cover_image} alt={c.title} className={s.coverImage} />
            )}
            <div className={s.contentBox}>
              <h3 className={s.challengeTitle}>{c.title}</h3>
              <ul className={s.metaList}>
                <li>{c.duration_weeks}주 동안</li>
                {c.freq_n_days == null ? <li>{c.freq_type}</li> : <li>주 {c.freq_n_days}일</li>}
                <li>{c.entry_fee.toLocaleString()}p</li>
                <li>{c.member_count}명</li>
              </ul>
            </div>
          </article>
        ))}
        {/*  모달 렌더링 조건
             - detailData가 있고 (API 응답 완료)
             - is_joined가 false인 (미참여) 경우
        */}
        {detailData && !detailData.my_membership.is_joined && (
          <ChallengeModal
            challengeData={detailData} // 데이터 객체 prop으로 전달
            onClose={handleCloseModal}
          />
        )}
        {/* 참고: 팀원이 구현할 부분 (참여 중)
          {detailData && detailData.my_membership.is_joined && ( // 조건
            // 불러올 페이지 및 컴포넌트
          )}
        */}
      </div>
    </section>
  );
};

export default AllChallenge;
