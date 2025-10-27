import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Calculating your comfort income...</p>
    </div>
  );
};

export default LoadingSpinner;
