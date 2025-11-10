import React from 'react';
import Header from './components/Header';
import MyChallenge from './components/MyChallenge';
import ChallengeCard from './components/ChallengeCard';
import AllChallenge from './components/AllChallenge';
import Footer from '../../components/footer/Footer';

const MainPage = () => {
  return (
    <div>
      <Header />
      <MyChallenge />
      {/* <ChallengeCard /> */}
      <AllChallenge />
      <Footer />
    </div>
  );
};

export default MainPage;
