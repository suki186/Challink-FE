import React from 'react';
import { Outlet } from 'react-router-dom';

const ChallengePage = () => {
  return (
    <div>
      ChallengePage
      <Outlet />
    </div>
  );
};

export default ChallengePage;
