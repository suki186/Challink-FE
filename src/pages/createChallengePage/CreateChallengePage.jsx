import React, { useState, useRef, useEffect } from 'react';
import { createChallengeApi, challengeDetailApi } from '@apis/auth/challengeApi';
import s from './components/styles/CreateChallengePage.module.scss';
import Header from './components/Header';
import DropBox from './components/DropBox';
import Divider from './components/Divider';
import ChallengeField from '@components/formField/ChallengeField';
import PlusIcon from '@assets/images/plus_gradient_icon.svg';
import Category1 from '@assets/images/category_1.svg';
import Category2 from '@assets/images/category_2.svg';
import Category3 from '@assets/images/category_3.svg';
import Category4 from '@assets/images/category_4.svg';
import useNavigation from '@hooks/useNavigation';
import ChallengeModal from '@components/challengeModal/ChallengeModal.jsx';
import useFormValidation from '../../hooks/useFormValidation';

const CATEGORIES = [
  { id: 1, key: 'WORKOUT', label: '운동', src: Category1 },
  { id: 2, key: 'DIET', label: '식습관', src: Category2 },
  { id: 3, key: 'LIFE', label: '생활', src: Category3 },
  { id: 4, key: 'ETC', label: '기타', src: Category4 },
];

const PERIOD_OPTIONS = Array.from({ length: 8 }, (_, i) => ({
  value: String(i + 1),
  label: `${i + 1}주 동안`,
}));

const FREQUENCY_OPTIONS = [
  { value: 'DAILY', label: '매일' },
  { value: 'WEEKDAYS', label: '주중' },
  { value: 'WEEKENDS', label: '주말' },
  { value: '1_DAYS_PER_WEEK', label: '주 1일' },
  { value: '2_DAYS_PER_WEEK', label: '주 2일' },
  { value: '3_DAYS_PER_WEEK', label: '주 3일' },
  { value: '4_DAYS_PER_WEEK', label: '주 4일' },
  { value: '5_DAYS_PER_WEEK', label: '주 5일' },
  { value: '6_DAYS_PER_WEEK', label: '주 6일' },
];

const CreateChallengePage = () => {
  const { goBack } = useNavigation();

  // 챌린지 생성 데이터 state
  const [title, setTitle] = useState('');
  const [intro, setIntro] = useState('');
  const [fee, setFee] = useState('');
  const [rule, setRule] = useState('');
  // 선택
  const [categoryId, setCategoryId] = useState();
  const [durationWeeks, setDurationWeeks] = useState('');
  const [frequency, setFrequency] = useState('');
  const [settlementMethod, setSettlementMethod] = useState('');
  // 이미지 업로드
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);

  // 챌린지 모달, api state
  // 생성된 챌린지 ID
  const [newChallengeId, setNewChallengeId] = useState(null);

  // 상세 API 응답 데이터
  const [detailData, setDetailData] = useState(null);
  // const [isDetailLoading, setIsDetailLoading] = useState(false);

  // 핸들러 및 유틸 함수
  // 이미지 핸들러
  const handleFileClick = () => fileInputRef.current?.click();
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (image) URL.revokeObjectURL(image);
    setImage(URL.createObjectURL(file));
    setImageFile(file);
  };

  // URL 정리
  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setNewChallengeId(null); // ID를 null로 -> useEffect 트리거 -> detailData도 null이 됨
  };

  // 버튼 활성화
  const isBaseValid = useFormValidation({ title, fee, rule });
  const isActive =
    isBaseValid && !!categoryId && !!settlementMethod && !!durationWeeks && !!frequency;

  // 날짜/파싱 유틸
  const ymdKST = (date) =>
    new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Seoul' }).format(date); // YYYY-MM-DD
  const addDays = (date, days) => new Date(date.getTime() + days * 86400000);

  // 상세 API 호출
  // newChallengeId 변경 시 상세 API 호출
  useEffect(() => {
    if (!newChallengeId) {
      setDetailData(null); // ID가 null이면(닫기) 상세 데이터 비우기
      return;
    }

    // ID가 생기면 상세 API 호출
    (async () => {
      try {
        // setIsDetailLoading(true);

        const data = await challengeDetailApi(newChallengeId);
        setDetailData(data); // API 응답 state에 저장
      } catch (err) {
        console.error('챌린지 상세 조회 실패:', err);
      } // finally {
      // setIsDetailLoading(false);
      // }
    })();
  }, [newChallengeId]); // newChallengeId가 바뀔 때마다 실행

  // 챌린지 생성 핸들러
  const handleCreateClick = async (e) => {
    e.preventDefault();

    const entryFeeNum = Number(String(fee).replace(/,/g, '').trim() || 0);
    // const { isNDays, n } = parseWeeklyFreq(frequency);
    const start = new Date();
    const end = addDays(start, Number(durationWeeks) * 7);

    // freq_type, freq_n_days
    let freqTypeToSend = null;
    let freqNDaysToSend = null;

    if (frequency.includes('_DAYS_PER_WEEK')) {
      freqTypeToSend = 'N_DAYS_PER_WEEK';
      freqNDaysToSend = Number(frequency.split('_')[0]);
    } else {
      freqTypeToSend = frequency;
      freqNDaysToSend = null;
    }

    const basePayload = {
      title: title.trim(),
      description: intro.trim(),
      category_id: Number(categoryId),
      entry_fee: entryFeeNum,
      duration_weeks: Number(durationWeeks),
      freq_type: freqTypeToSend,
      freq_n_days: freqNDaysToSend,

      ai_condition_text: rule.trim(),
      settlement_method: settlementMethod,
      start_date: ymdKST(start),
      end_date: ymdKST(end),
      status: 'active',
    };

    try {
      const fd = new FormData();
      Object.entries(basePayload).forEach(([k, v]) => {
        if (v !== undefined && v !== null) {
          fd.append(k, String(v));
        }
      });
      if (imageFile) {
        // 이미지가 있으면 파일 첨부
        fd.append('cover_image', imageFile);
      } else {
        // 이미지가 없으면 빈 문자열('')
        fd.append('cover_image', '');
      }
      // createChallengeApi 호출, ID 저장
      const payload = fd;
      const options = { multipart: true };

      const result = await createChallengeApi(payload, options);
      setNewChallengeId(result.challenge_id);
    } catch (err) {
      console.log(err);
    }
  };

  // JSX 렌더링
  return (
    <div className={s.CreateChallengeContainer} style={{ marginBottom: '122px' }}>
      <Header />

      {/* 챌린지 정보 */}
      <section className={s.challengeInfo}>
        <button className={s.infoLeft} onClick={handleFileClick}>
          {image ? (
            <img src={image} alt="업로드된 이미지" className={s.previewImg} />
          ) : (
            <>
              <img src={PlusIcon} style={{ width: '37px' }} alt="이미지 추가 아이콘" />
              <p className={s.photoSelect}>사진(선택)</p>
            </>
          )}
        </button>

        {/* 실제 파일 input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        <div className={s.infoRight}>
          <ChallengeField
            placeholder="챌린지 제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <ChallengeField
            placeholder="간단한 챌린지 소개글을 작성하세요(선택)"
            value={intro}
            height="121px"
            onChange={(e) => setIntro(e.target.value)}
            multiline
            rows={5}
          />
        </div>
      </section>

      <section className={s.challengeFieldContainer}>
        <label className={s.fieldLabel}>참가비</label>
        <ChallengeField
          placeholder="최대 100,000"
          value={fee}
          onChange={(e) => {
            const raw = e.target.value.replace(/[^0-9]/g, '');
            const limited = Math.min(Number(raw), 100000);
            setFee(limited.toLocaleString());
          }}
          type="text"
          rightAddon="포인트"
          width="100%"
          comment="최소 1,000p | 50,000원 이상은 수수료 1%가 부과됩니다."
        />
      </section>

      <Divider />

      {/* 기간 / 인증빈도 */}
      <section className={s.challengeFieldContainer}>
        <div className={s.flexBox}>
          <div className={s.fieldLeft}>
            <label className={s.fieldLabel}>기간</label>
            <DropBox options={PERIOD_OPTIONS} value={durationWeeks} onChange={setDurationWeeks} />
          </div>
          <div className={s.fieldRight}>
            <label className={s.fieldLabel}>인증 빈도</label>
            <DropBox options={FREQUENCY_OPTIONS} value={frequency} onChange={setFrequency} />
          </div>
        </div>
      </section>

      {/* 카테고리 */}
      <section className={s.challengeFieldContainer}>
        <label className={s.fieldLabel}>카테고리</label>
        <div className={s.categoryGroup} role="radiogroup" aria-label="카테고리 선택">
          {CATEGORIES.map((cat) => {
            const active = Number(categoryId) === cat.id;
            return (
              <div
                key={cat.id}
                className={`${s.categoryBtnContainer} ${active ? s.categoryButtonActive : ''}`}
              >
                <button
                  type="button"
                  className={s.categoryButton}
                  onClick={() => setCategoryId(String(cat.id))}
                  aria-pressed={active}
                >
                  <img src={cat.src} alt={cat.label} />
                </button>
                <p className={s.categoryLabel}>{cat.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      <Divider />

      {/* 인증 조건 */}
      <section className={s.challengeFieldContainer}>
        <label className={s.fieldLabel}>인증 조건</label>
        <ChallengeField
          placeholder={'ex1. 신체의 일부를 포함한 헬스 기구\nex2. 책 페이지 번호가 나오도록'}
          value={rule}
          height="69px"
          onChange={(e) => setRule(e.target.value)}
          multiline
          rows={4}
          comment="방장은 매일 자유롭게 수정할 수 있습니다."
        />
      </section>

      {/* 정산 방법 */}
      <section className={s.challengeFieldContainer}>
        <div className={s.fieldGroup}>
          <span className={s.fieldLabel}>정산 방법</span>
          <div className={s.settlementGroup}>
            {[
              { id: 'N_TO_ONE_WINNER', label: '모인 참가비를 성공자들끼리 N:1 분배해요' },
              { id: 'PROPORTIONAL', label: '참가비를 성공률에 따라 차등 분배해요' },
              { id: 'REFUND_PLUS_ALL', label: '성공자만 참가비를 돌려받고 남은 건 N:1 분배해요' },
              { id: 'DONATE_FAIL_FEE', label: '실패자 참가비는 Challink에게 기부해요♥' },
            ].map((method) => {
              const active = settlementMethod === method.id;
              return (
                <button
                  type="button"
                  key={method.id}
                  className={`${s.settlementButton} ${active ? s.settlementButtonActive : ''}`}
                  onClick={() => settlementMethod !== method.id && setSettlementMethod(method.id)}
                  aria-pressed={active}
                >
                  {method.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 버튼 */}
      <section className={s.buttonGroup}>
        <button className={s.cancelButton} onClick={() => goBack()}>
          취소
        </button>
        <button
          className={`${s.createButton} ${isActive ? s.createButtonActive : ''}`}
          onClick={handleCreateClick}
          disabled={!isActive}
        >
          챌린지 만들기
        </button>
      </section>

      {/* 모달 렌더링 조건 detailData가 있고 (API 응답 완료), is_joined가 false인 (미참여) 경우 */}
      {detailData && !detailData.my_membership.is_joined && (
        <ChallengeModal challengeData={detailData} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default CreateChallengePage;
