import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import StateSelector from './components/StateSelector';
import ResultsDisplay from './components/ResultsDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import { fetchCostOfLiving } from './services/numbeoApi';

function App() {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = async () => {
    if (!selectedCity) {
      setError('Please select a state and city');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const data = await fetchCostOfLiving(selectedCity);
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
            <p>Discover the income you need to live comfortably as a working professional in any US state. 
               Our calculator uses real-time cost of living data to provide accurate estimates.</p>
          </div>

          <StateSelector
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            onCalculate={handleCalculate}
            loading={loading}
          />

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
            <ResultsDisplay results={results} city={selectedCity} state={selectedState} />
          )}
        </div>
      </main>

      <footer className="footer">
        <p>Data provided by Numbeo API • Updated in real-time</p>
        <p className="disclaimer">Estimates are based on average costs and may vary based on lifestyle and personal circumstances.</p>
      </footer>
    </div>
  );
}

export default App;
