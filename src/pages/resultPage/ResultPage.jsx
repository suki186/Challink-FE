import React from 'react';
import ChallengeBody from '../challengeLayout/ChallengeBody';
import ResultChallenge from './components/ResultChallenge';
import data from './datas/resultDummy.json';

const ResultPage = () => {
  return (
    <ChallengeBody height="672px">
      <ResultChallenge data={data} />
    </ChallengeBody>
  );
};

export default ResultPage;
