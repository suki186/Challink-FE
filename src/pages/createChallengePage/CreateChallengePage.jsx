import React, { useState, useRef, useEffect } from 'react';
import { createChallengeApi } from '@apis/auth/challengeApi';
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
  { value: 'WEEKDAYS', label: '평일만' },
  { value: 'WEEKENDS', label: '주말만' },
  { value: '1_DAYS_PER_WEEK', label: '주 1일' },
  { value: '2_DAYS_PER_WEEK', label: '주 2일' },
  { value: '3_DAYS_PER_WEEK', label: '주 3일' },
  { value: '4_DAYS_PER_WEEK', label: '주 4일' },
  { value: '5_DAYS_PER_WEEK', label: '주 5일' },
  { value: '6_DAYS_PER_WEEK', label: '주 6일' },
];

const CreateChallengePage = () => {
  const { goBack } = useNavigation();

  // 텍스트 입력
  const [title, setTitle] = useState('');
  const [intro, setIntro] = useState('');
  const [fee, setFee] = useState('');
  const [rule, setRule] = useState('');

  // 선택
  const [categoryId, setCategoryId] = useState();
  const [durationWeeks, setDurationWeeks] = useState('');
  const [frequency, setFrequency] = useState('');
  const [settlementMethod, setSettlementMethod] = useState('');

  // 이미지 URL
  const [image, setImage] = useState(null); // 미리보기용 blob URL
  const [imageFile, setImageFile] = useState(null); // 서버로 보낼 File 객체
  const fileInputRef = useRef(null);

  const handleFileClick = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (image) URL.revokeObjectURL(image); // 기존 URL revoke
    setImage(URL.createObjectURL(file)); // 미리보기용
    setImageFile(file); // 전송용
  };

  useEffect(() => {
    // image 상태(blob URL)가 존재할 때만 cleanup 함수 반환
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  // 모달
  const [createdChallenge, setCreatedChallenge] = useState(null);
  const handleCloseModal = () => setCreatedChallenge(null);

  // 버튼 활성화
  const isBaseValid = useFormValidation({ title, fee, rule });
  const isActive =
    isBaseValid && !!categoryId && !!settlementMethod && !!durationWeeks && !!frequency;

  // 날짜 유틸 (KST)
  const ymdKST = (date) =>
    new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Seoul' }).format(date); // YYYY-MM-DD
  const addDays = (date, days) => new Date(date.getTime() + days * 86400000);

  // 주 N일 파싱
  const parseWeeklyFreq = (value) => {
    if (/_DAYS_PER_WEEK$/.test(value)) {
      const n = Number(value.split('_')[0]);
      return { isNDays: true, n };
    }
    return { isNDays: false, n: null };
  };

  // 연동
  const handleCreateClick = async (e) => {
    e.preventDefault();

    const entryFeeNum = Number(String(fee).replace(/,/g, '').trim() || 0);
    const { isNDays, n } = parseWeeklyFreq(frequency);
    const start = new Date();
    const end = addDays(start, Number(durationWeeks) * 7);

    // 1. 모든 텍스트 데이터를 basePayload에 준비합니다.
    const basePayload = {
      title: title.trim(),
      description: intro.trim(),
      category_id: Number(categoryId),
      entry_fee: entryFeeNum,
      duration_weeks: Number(durationWeeks),
      ...(isNDays
        ? { freq_type: null, freq_n_days: n }
        : { freq_type: frequency, freq_n_days: null }),
      ai_condition_text: rule.trim(),
      settlement_method: settlementMethod,
      start_date: ymdKST(start),
      end_date: ymdKST(end),
      status: 'active',
    };

    try {
      let payload;
      let options = {}; // createChallengeApi에 전달할 옵션

      // 2. (핵심) imageFile (전송용 File 객체)의 존재 여부로 분기
      if (imageFile) {
        // ✅ 이미지가 있을 때: FormData로 전송 (MenuUploadPage와 동일)
        const fd = new FormData();

        // basePayload의 모든 키-값 쌍을 FormData에 추가
        Object.entries(basePayload).forEach(([k, v]) => {
          if (v !== undefined && v !== null) {
            fd.append(k, String(v));
          }
        });

        // 이미지 파일 추가
        fd.append('cover_image', imageFile);

        payload = fd;
        options = { multipart: true }; // API 함수가 multipart임을 알도록 옵션 추가
      } else {
        // ✅ 이미지가 없을 때: JSON으로 전송 (요청하신대로 null 포함)
        payload = { ...basePayload, cover_image: null };
        // options는 {} 그대로 둡니다 (JSON이 기본)
      }

      // 3. createChallengeApi 호출
      // (createChallengeApi 함수가 payload와 options를 받아
      // options.multipart 여부에 따라 Content-Type을 분기 처리해야 함)
      const result = await createChallengeApi(payload, options);
      setCreatedChallenge(result);
    } catch (err) {
      console.log(err);
    }
  };

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

        {/* 실제 파일 input (숨김 처리) */}
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

      {/* 생성 완료 모달 */}
      {createdChallenge && (
        <ChallengeModal challenge={createdChallenge} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default CreateChallengePage;
