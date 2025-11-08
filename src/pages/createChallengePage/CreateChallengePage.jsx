import React, { useState, useRef } from 'react';
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
import useFormValidation from '../../hooks/useFormValidation';

const CATEGORIES = [
  { id: 1, key: 'WORKOUT', label: '운동', src: Category1 },
  { id: 2, key: 'DIET', label: '식습관', src: Category2 },
  { id: 3, key: 'LIFE', label: '생활', src: Category3 },
  { id: 4, key: 'ETC', label: '기타', src: Category4 },
];

const PERIOD_OPTIONS = [
  { value: '1', label: '1주 동안' },
  { value: '2', label: '2주 동안' },
  { value: '3', label: '3주 동안' },
  { value: '4', label: '4주 동안' },
  { value: '5', label: '5주 동안' },
  { value: '6', label: '6주 동안' },
  { value: '7', label: '7주 동안' },
  { value: '8', label: '8주 동안' },
];

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

  // 카테고리
  const [categoryId, setCategoryId] = useState(''); // number

  // 기간 / 인증 빈도
  const [durationWeeks, setDurationWeeks] = useState('1');
  const [frequency, setFrequency] = useState('DAILY'); // DAILY | WEEKDAYS | WEEKENDS | n_DAYS_PER_WEEK…

  // 정산 방법
  const [settlementMethod, setSettlementMethod] = useState('');

  // 이미지
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const fileInputRef = useRef(null);
  const handleFileClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  // 버튼 활성화 조건
  const isBaseValid = useFormValidation({ title, fee, rule });
  const isActive = isBaseValid && !!categoryId && !!settlementMethod && !!imageFile;

  const handleCreateClick = () => {
    // 챌린지 생성 API 호출
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
              <img src={PlusIcon} style={{ width: '37px' }} />
              <p className={s.photoSelect}>사진(선택)</p>
            </>
          )}
        </button>
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

      {/* 참가비 */}
      <section className={s.challengeFieldContainer}>
        <label className={s.fieldLabel}>참가비</label>
        <ChallengeField
          placeholder="최대 100,000"
          value={fee}
          onChange={(e) => {
            const rawValue = e.target.value.replace(/[^0-9]/g, '');
            const limited = Math.min(Number(rawValue), 100000);
            const formatted = limited.toLocaleString(); // 천단위 콤마
            setFee(formatted);
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
                  onClick={() => setCategoryId(cat.id)} // number로 저장
                  aria-pressed={active}
                >
                  <img src={cat.src} />
                </button>
                <p className={s.categoryLabel}> {cat.label}</p>
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
              { id: 'EQUAL', label: '모인 참가비를 성공자들끼리 N:1 분배해요' },
              { id: 'PROPORTIONAL', label: '참가비를 성공률에 따라 차등 분배해요' },
              { id: 'WINNER_TAKES_ALL', label: '성공자만 참가비를 돌려받고 남은 건 N:1 분배해요' },
              { id: 'CUSTOM', label: '실패자 참가비는 Challink에게 기부해요♥' },
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
          className={`${s.createButton} ${isActive ? s.createButtonActive : ''}`} // 활성화 클래스 조건부 적용
          onClick={handleCreateClick}
          disabled={!isActive} // disabled 속성 추가
        >
          챌린지 만들기
        </button>
      </section>
    </div>
  );
};

export default CreateChallengePage;
