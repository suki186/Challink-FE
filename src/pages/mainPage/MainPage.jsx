import React from 'react';
import Header from './components/Header';
import MyChallenge from './components/MyChallenge';
import ChallengeCard from './components/ChallengeCard';
import AllChallenge from './components/AllChallenge';

const MainPage = () => {
  return (
    <div>
      <Header />
      <MyChallenge />
      <AllChallenge />
    </div>
  );
};

export default MainPage;
