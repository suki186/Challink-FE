import { useState, useEffect } from 'react';
import s from './PhotosPage.module.scss';
import ChallengeBody from '../challengeLayout/ChallengeBody';
import PhotosChallenge from './components/PhotosChallenge';
import PhotoDetail from './components/PhotoDetail';
import useBodyScrollLock from '../../hooks/useBodyScrollLock';
import CategoryFilter from '../../components/CategoryFilter';
import { useLocation, useParams } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { getAllPhotosApi } from '../../apis/challenge/albums';
import LoadingSpinner from '../../components/LoadingSpinner';

const PhotosPage = () => {
  const location = useLocation();
  const { id: challengeId } = useParams();
  const { userName: currentUserName } = useAuthStore();

  const [photos, setPhotos] = useState([]); // 전체 사진
  const [isLoading, setIsLoading] = useState(false);

  const [selectedPhoto, setSelectedPhoto] = useState(null); // 선택된 사진
  const [selectedCategory, setSelectedCategory] = useState('MY');
  const [pageCategories, setPageCategories] = useState(['MY', '전체']);

  useBodyScrollLock(selectedPhoto);

  // 카테고리 이름 설정
  useEffect(() => {
    if (location.state?.participants) {
      const names = location.state.participants.map((p) => p.name);
      const uniqueNames = ['MY', '전체', ...new Set(names)];
      setPageCategories(uniqueNames);
    } else {
      const fetchPhotoNames = async () => {
        try {
          const data = await getAllPhotosApi(challengeId);
          const names = data.map((p) => p.user_name);
          const uniqueNames = ['MY', '전체', ...new Set(names)];
          setPageCategories(uniqueNames);
        } catch (err) {
          console.error('참여자 이름 불러오기 실패:', err);
        }
      };
      fetchPhotoNames();
    }
  }, [challengeId, location.state]);

  // 전체 사진 데이터 로딩
  useEffect(() => {
    if (!challengeId) return;

    const fetchPhotos = async () => {
      setIsLoading(true);
      let nameParam = '';

      if (selectedCategory === 'MY') {
        nameParam = currentUserName || '';
      } else if (selectedCategory !== '전체') {
        nameParam = selectedCategory;
      }

      try {
        const data = await getAllPhotosApi(challengeId, nameParam);
        setPhotos(data);
      } catch (err) {
        console.error('사진 목록 조회 오류:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, [challengeId, selectedCategory, currentUserName]);

  // 클릭된 사진 정보를 받아 state에 저장
  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
  };

  // 사진 상세 닫기
  const handleCloseOverlay = () => {
    setSelectedPhoto(null);
  };

  if (isLoading) {
    return (
      <div className={s.PhotosPageContainer}>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <div className={s.PhotosPageContainer}>
        <CategoryFilter
          categories={pageCategories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />
        <ChallengeBody>
          {isLoading && <p>사진을 불러오는 중...</p>}
          {!isLoading && <PhotosChallenge photoData={photos} onPhotoClick={handlePhotoClick} />}
        </ChallengeBody>
      </div>
      {selectedPhoto && <PhotoDetail photo={selectedPhoto} onClose={handleCloseOverlay} />}
    </>
  );
};

export default PhotosPage;
