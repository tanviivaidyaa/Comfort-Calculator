import React from 'react';
import './StateSelector.css';
import { US_STATES_CITIES } from '../data/statesData';

const StateSelector = ({ selectedState, setSelectedState, selectedCity, setSelectedCity, onCalculate, loading }) => {
  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setSelectedCity('');
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const cities = selectedState ? US_STATES_CITIES[selectedState] : [];

  return (
    <div className="state-selector-card">
      <h3>Select Your Location</h3>
      <div className="selector-grid">
        <div className="input-group">
          <label htmlFor="state-select">State</label>
          <div className="select-wrapper">
            <select
              id="state-select"
              value={selectedState}
              onChange={handleStateChange}
              disabled={loading}
            >
              <option value="">Choose a state...</option>
              {Object.keys(US_STATES_CITIES).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            <svg className="select-icon" width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="city-select">City</label>
          <div className="select-wrapper">
            <select
              id="city-select"
              value={selectedCity}
              onChange={handleCityChange}
              disabled={!selectedState || loading}
            >
              <option value="">Choose a city...</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <svg className="select-icon" width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </div>

      <button
        className="calculate-button"
        onClick={onCalculate}
        disabled={!selectedCity || loading}
      >
        {loading ? 'Calculating...' : 'Calculate Comfort Income'}
      </button>
    </div>
  );
};

export default StateSelector;
