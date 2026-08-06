import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import GlobalLocationSelector from './components/GlobalLocationSelector';
import LifestyleOptions from './components/LifestyleOptions';
import ResultsDisplay from './components/ResultsDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ExcelExport from './components/ExcelExport';
import AIScenarioAnalysis from './components/AIScenarioAnalysis';
import PaymentPage from './components/PaymentPage';
import { fetchCostOfLiving } from './services/numbeoApi';

function ComfortCalculator() {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [isPremium] = useState(false); // Set to true for testing premium features
  
  // Lifestyle options state
  const [lifestyleOptions, setLifestyleOptions] = useState({
    dogs: 0,
    cats: 0,
    gymMembership: 'none',
    carOwnership: 'none',
    diningFrequency: 'moderate',
    streamingServices: 3,
    coffeeHabit: 'occasional',
    travelBudget: 'moderate',
    shopping: 'moderate',
    hobbies: 'moderate',
    children: 0,
    studentLoans: 0,
    savingsRate: 'moderate'
  });

  const handleCalculate = async () => {
    if (!selectedCity) {
      setError('Please select a location');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const data = await fetchCostOfLiving(selectedCity, selectedCountry, lifestyleOptions);
      setResults(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch cost of living data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <div className="container">
          <div className="intro-section">
            <h2>Calculate Your Comfort Income</h2>
            <p>Discover the income you need to live comfortably in cities around the world.
               This calculator uses published cost-of-living indices (New York = 100) and your
               lifestyle preferences to estimate a comfortable income.</p>
          </div>

          <GlobalLocationSelector
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            onCalculate={handleCalculate}
            loading={loading}
          />

          <LifestyleOptions
            options={lifestyleOptions}
            setOptions={setLifestyleOptions}
          />

          <div className="calculate-section">
            {selectedCity && (
              <div className="selected-location-badge">
                📍 Selected: <strong>{selectedCity}, {selectedCountry}</strong>
              </div>
            )}

            <button
              className="calculate-button"
              onClick={handleCalculate}
              disabled={!selectedCity || loading}
            >
              {loading ? (
                <>
                  <span className="button-spinner"></span>
                  Calculating...
                </>
              ) : (
                <>
                  <span className="button-icon">💰</span>
                  Calculate Comfort Income
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="error-message">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V13H11V15ZM11 11H9V5H11V11Z" fill="currentColor"/>
              </svg>
              {error}
            </div>
          )}

          {loading && <LoadingSpinner />}

          {results && !loading && (
            <>
              <ResultsDisplay results={results} city={selectedCity} state={selectedCountry} />
              
              <ExcelExport 
                results={results} 
                city={selectedCity} 
                country={selectedCountry}
                lifestyleOptions={lifestyleOptions}
                isPremium={isPremium}
              />
              
              <AIScenarioAnalysis 
                results={results} 
                city={selectedCity} 
                country={selectedCountry}
                lifestyleOptions={lifestyleOptions}
              />
            </>
          )}
        </div>
      </main>

      <footer className="footer">
        <p>🌍 Cost-of-living indices for cities worldwide • Personalized to your lifestyle</p>
        <p className="disclaimer">Illustrative and educational only. Estimates are based on published average
           cost-of-living indices (New York = 100) and general assumptions, and are not a quote, recommendation,
           or financial, tax, or legal advice. Actual costs vary by lifestyle and personal circumstances.</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ComfortCalculator />} />
        <Route path="/premium" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
