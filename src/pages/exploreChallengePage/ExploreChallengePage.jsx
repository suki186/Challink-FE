import React, { useState } from 'react';
import Header from './components/Header.jsx';
import CategoryFilter from './components/CategoryFilter.jsx';

const ExploreChallengePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  return (
    <div>
      <Header />
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />
    </div>
  );
};

export default ExploreChallengePage;
