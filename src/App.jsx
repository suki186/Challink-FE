import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import '@styles/global.scss';
import LoginPage from './pages/loginPage/LoginPage';
import SignupPage from './pages/signupPage/SignupPage';
import Layout from './components/layout/Layout';
import MainPage from './pages/mainPage/MainPage';
import ExploreChallengePage from './pages/exploreChallengePage/ExploreChallengePage';
import CreateChallengePage from './pages/createChallengePage/CreateChallengePage';
import MyPage from './pages/myPage/MyPage';
import NotFoundPage from './pages/notFoundPage/NotFoundPage';
import ChallengeLayout from './pages/challengeLayout/ChallengeLayout';
import OngoingPage from './pages/ongoingPage/OngoingPage';
import VerifyPage from './pages/verifyPage/VerifyPage';
import PhotosPage from './pages/photosPage/PhotosPage';
import ResultPage from './pages/resultPage/ResultPage';

/*
    LoginPage: 로그인 페이지
    SignupPage: 회원가입 페이지
    MainPage: 메인 페이지
    ExploreChallengePage: 모든 챌린지 조회 페이지
    CreateChallengePage: 챌린지 생성 페이지
    ChallengePage: 챌린지 참여전, 진행중, 완료 페이지를 조건부 처리
    MyPage: 마이 페이지
    NotFoundPage: 404 페이지
*/
const router = createBrowserRouter([
  // Layout 밖 페이지
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignupPage /> },
  { path: '*', element: <NotFoundPage /> }, // 404

  // Layout 안 페이지 -> 디자인에 따라 변경될수도
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Navigate to="main" replace /> },
      { path: 'main', element: <MainPage /> },
      { path: 'explore', element: <ExploreChallengePage /> },
      { path: 'challenge/create', element: <CreateChallengePage /> },

      // 챌린지 단일 라우트
      {
        path: 'challenge/:id',
        element: <ChallengeLayout />,
        children: [
          { index: true, element: <OngoingPage /> },
          { path: 'verify', element: <VerifyPage /> },
          { path: 'photos', element: <PhotosPage /> },
          { path: 'result', element: <ResultPage /> },
        ],
      },

      { path: 'profile', element: <MyPage /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
