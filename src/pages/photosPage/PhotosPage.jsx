import React from 'react';
import ChallengeBody from '../challengeLayout/ChallengeBody';
import PhotosChallenge from './components/PhotosChallenge';

const PhotosPage = () => {
  return (
    <>
      <div>필터링</div>
      <ChallengeBody height="624px">
        <PhotosChallenge />
      </ChallengeBody>
    </>
  );
};

export default PhotosPage;
