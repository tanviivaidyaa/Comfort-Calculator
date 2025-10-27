import React from 'react';
import './ResultsDisplay.css';

const ResultsDisplay = ({ results, city, state }) => {
  const {
    costOfLivingIndex,
    rentIndex,
    groceriesIndex,
    restaurantPriceIndex,
    localPurchasingPowerIndex,
    estimatedMonthlyIncome,
    estimatedAnnualIncome,
    breakdown
  } = results;

  return (
    <div className="results-container">
      <div className="results-header">
        <h2>Your Comfort Income for {city}, {state}</h2>
        <p>Based on real-time cost of living data</p>
      </div>

      <div className="income-cards">
        <div className="income-card primary">
          <div className="income-label">Recommended Annual Income</div>
          <div className="income-value">${estimatedAnnualIncome.toLocaleString()}</div>
          <div className="income-sublabel">To live comfortably</div>
        </div>

        <div className="income-card secondary">
          <div className="income-label">Monthly Income</div>
          <div className="income-value">${estimatedMonthlyIncome.toLocaleString()}</div>
          <div className="income-sublabel">After taxes</div>
        </div>
      </div>

      <div className="breakdown-section">
        <h3>Cost Breakdown</h3>
        <div className="breakdown-grid">
          {breakdown.map((item, index) => (
            <div key={index} className="breakdown-item">
              <div className="breakdown-icon">{item.icon}</div>
              <div className="breakdown-content">
                <div className="breakdown-label">{item.category}</div>
                <div className="breakdown-value">${item.amount.toLocaleString()}/mo</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="indices-section">
        <h3>Cost of Living Indices</h3>
        <p className="indices-description">Compared to New York City (baseline: 100)</p>
        <div className="indices-grid">
          <div className="index-item">
            <div className="index-bar-container">
              <div className="index-bar" style={{ width: `${Math.min(costOfLivingIndex, 100)}%` }}></div>
            </div>
            <div className="index-info">
              <span className="index-label">Overall Cost of Living</span>
              <span className="index-value">{costOfLivingIndex.toFixed(1)}</span>
            </div>
          </div>

          <div className="index-item">
            <div className="index-bar-container">
              <div className="index-bar" style={{ width: `${Math.min(rentIndex, 100)}%` }}></div>
            </div>
            <div className="index-info">
              <span className="index-label">Rent</span>
              <span className="index-value">{rentIndex.toFixed(1)}</span>
            </div>
          </div>

          <div className="index-item">
            <div className="index-bar-container">
              <div className="index-bar" style={{ width: `${Math.min(groceriesIndex, 100)}%` }}></div>
            </div>
            <div className="index-info">
              <span className="index-label">Groceries</span>
              <span className="index-value">{groceriesIndex.toFixed(1)}</span>
            </div>
          </div>

          <div className="index-item">
            <div className="index-bar-container">
              <div className="index-bar" style={{ width: `${Math.min(restaurantPriceIndex, 100)}%` }}></div>
            </div>
            <div className="index-info">
              <span className="index-label">Restaurants</span>
              <span className="index-value">{restaurantPriceIndex.toFixed(1)}</span>
            </div>
          </div>

          <div className="index-item">
            <div className="index-bar-container">
              <div className="index-bar purchasing-power" style={{ width: `${Math.min(localPurchasingPowerIndex, 100)}%` }}></div>
            </div>
            <div className="index-info">
              <span className="index-label">Local Purchasing Power</span>
              <span className="index-value">{localPurchasingPowerIndex.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="info-box">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V9H11V15ZM11 7H9V5H11V7Z" fill="currentColor"/>
        </svg>
        <p>These estimates assume a comfortable lifestyle for a single working professional, including rent for a 1-bedroom apartment in the city center, regular dining out, entertainment, and savings.</p>
      </div>
    </div>
  );
};

export default ResultsDisplay;
