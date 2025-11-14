import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import '@styles/global.scss';
import SplashPage from './pages/splashPage/SplashPage';
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
    SplashPage: 스플래시 페이지
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
  { path: '/splash', element: <SplashPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignupPage /> },

  // 스플래시 화면으로 리다이렉트
  {
    path: '/',
    element: <Navigate to="/splash" replace />,
  },

  // Layout 안 페이지 -> 디자인에 따라 변경될수도
  {
    element: <Layout />,
    children: [
      { path: 'main', element: <MainPage /> },
      { path: 'explore', element: <ExploreChallengePage /> },
      { path: 'challenge/create', element: <CreateChallengePage /> },
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
      { path: '*', element: <NotFoundPage /> }, // 404
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
