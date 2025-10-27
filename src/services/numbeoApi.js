// import axios from 'axios';

// Numbeo API endpoint (for future use with API key)
// const NUMBEO_API_BASE = 'https://www.numbeo.com/api';

/**
 * Fetch cost of living data from Numbeo API
 * Note: Numbeo's free API has limitations. This implementation uses their public data structure.
 * For production use, you may need to sign up for an API key at https://www.numbeo.com/common/api.jsp
 */
export const fetchCostOfLiving = async (city) => {
  try {
    // Since Numbeo's free API is limited, we'll use a combination of their public data
    // and calculations based on typical cost of living patterns
    
    // For a real implementation with API key, uncomment axios import and use:
    // const response = await axios.get(`${NUMBEO_API_BASE}/city_prices`, {
    //   params: {
    //     api_key: 'YOUR_API_KEY',
    //     query: city
    //   }
    // });

    // Simulated API call with realistic data based on Numbeo's structure
    const costData = await simulateNumbeoData(city);
    
    // Calculate recommended income based on cost of living
    const results = calculateComfortIncome(costData);
    
    return results;
  } catch (error) {
    console.error('Error fetching cost of living data:', error);
    throw new Error('Unable to fetch cost of living data. Please try again later.');
  }
};

/**
 * Simulate Numbeo API response with realistic data
 * In production, replace this with actual API calls
 */
const simulateNumbeoData = async (city) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Cost of living indices for major US cities (relative to NYC = 100)
  const cityData = {
    // California
    'San Francisco': { col: 95.2, rent: 89.5, groceries: 78.3, restaurant: 82.1, purchasing: 112.3 },
    'Los Angeles': { col: 77.8, rent: 68.2, groceries: 71.4, restaurant: 73.5, purchasing: 98.7 },
    'San Diego': { col: 75.3, rent: 64.8, groceries: 69.2, restaurant: 71.8, purchasing: 95.4 },
    'San Jose': { col: 92.1, rent: 85.3, groceries: 76.5, restaurant: 79.8, purchasing: 115.2 },
    
    // New York
    'New York': { col: 100.0, rent: 100.0, groceries: 100.0, restaurant: 100.0, purchasing: 100.0 },
    'Buffalo': { col: 58.3, rent: 35.2, groceries: 62.1, restaurant: 58.9, purchasing: 78.5 },
    
    // Texas
    'Austin': { col: 68.5, rent: 55.8, groceries: 65.3, restaurant: 67.2, purchasing: 102.3 },
    'Houston': { col: 63.2, rent: 48.5, groceries: 61.8, restaurant: 62.5, purchasing: 98.9 },
    'Dallas': { col: 65.8, rent: 52.3, groceries: 63.2, restaurant: 64.8, purchasing: 101.2 },
    'San Antonio': { col: 59.7, rent: 44.2, groceries: 60.5, restaurant: 61.3, purchasing: 95.7 },
    
    // Florida
    'Miami': { col: 72.5, rent: 62.8, groceries: 68.9, restaurant: 70.2, purchasing: 87.3 },
    'Orlando': { col: 66.8, rent: 54.2, groceries: 64.5, restaurant: 65.8, purchasing: 89.5 },
    'Tampa': { col: 64.3, rent: 51.8, groceries: 62.7, restaurant: 63.9, purchasing: 91.2 },
    
    // Illinois
    'Chicago': { col: 73.9, rent: 61.5, groceries: 70.2, restaurant: 72.8, purchasing: 96.8 },
    
    // Washington
    'Seattle': { col: 82.6, rent: 72.3, groceries: 74.8, restaurant: 78.5, purchasing: 108.9 },
    
    // Massachusetts
    'Boston': { col: 84.2, rent: 75.8, groceries: 76.3, restaurant: 79.8, purchasing: 105.7 },
    
    // Colorado
    'Denver': { col: 71.8, rent: 58.9, groceries: 68.5, restaurant: 70.3, purchasing: 103.5 },
    
    // Georgia
    'Atlanta': { col: 66.5, rent: 53.8, groceries: 64.2, restaurant: 65.9, purchasing: 99.8 },
    
    // Arizona
    'Phoenix': { col: 64.8, rent: 52.5, groceries: 62.8, restaurant: 64.2, purchasing: 96.5 },
    
    // Pennsylvania
    'Philadelphia': { col: 70.2, rent: 56.8, groceries: 67.5, restaurant: 69.3, purchasing: 94.2 },
    
    // Nevada
    'Las Vegas': { col: 66.3, rent: 54.8, groceries: 63.5, restaurant: 65.2, purchasing: 93.8 },
    
    // Oregon
    'Portland': { col: 74.5, rent: 63.2, groceries: 71.8, restaurant: 73.5, purchasing: 101.5 },
    
    // North Carolina
    'Charlotte': { col: 64.2, rent: 51.5, groceries: 62.3, restaurant: 63.8, purchasing: 98.3 },
    'Raleigh': { col: 63.8, rent: 50.8, groceries: 61.9, restaurant: 63.5, purchasing: 99.5 },
    
    // Tennessee
    'Nashville': { col: 65.9, rent: 53.2, groceries: 63.8, restaurant: 65.1, purchasing: 97.8 },
  };

  const data = cityData[city] || { col: 65.0, rent: 52.0, groceries: 63.0, restaurant: 64.0, purchasing: 95.0 };
  
  return {
    city,
    costOfLivingIndex: data.col,
    rentIndex: data.rent,
    groceriesIndex: data.groceries,
    restaurantPriceIndex: data.restaurant,
    localPurchasingPowerIndex: data.purchasing
  };
};

/**
 * Calculate comfortable income based on cost of living data
 */
const calculateComfortIncome = (costData) => {
  const { costOfLivingIndex, rentIndex, groceriesIndex, restaurantPriceIndex } = costData;
  
  // Base monthly costs in NYC (used as reference point)
  const nycBaseCosts = {
    rent: 3500,           // 1-bedroom apartment in city center
    groceries: 600,       // Monthly groceries
    utilities: 200,       // Electricity, heating, water, garbage
    transportation: 150,  // Public transport pass
    dining: 500,          // Restaurants and takeout
    entertainment: 300,   // Movies, gym, activities
    healthcare: 250,      // Insurance and medical
    miscellaneous: 400,   // Clothing, personal care, etc.
    savings: 800          // Emergency fund and retirement
  };

  // Adjust costs based on city's indices
  const adjustedCosts = {
    rent: Math.round((nycBaseCosts.rent * rentIndex) / 100),
    groceries: Math.round((nycBaseCosts.groceries * groceriesIndex) / 100),
    utilities: Math.round((nycBaseCosts.utilities * costOfLivingIndex) / 100),
    transportation: Math.round((nycBaseCosts.transportation * costOfLivingIndex) / 100),
    dining: Math.round((nycBaseCosts.dining * restaurantPriceIndex) / 100),
    entertainment: Math.round((nycBaseCosts.entertainment * costOfLivingIndex) / 100),
    healthcare: Math.round((nycBaseCosts.healthcare * costOfLivingIndex) / 100),
    miscellaneous: Math.round((nycBaseCosts.miscellaneous * costOfLivingIndex) / 100),
    savings: Math.round((nycBaseCosts.savings * costOfLivingIndex) / 100)
  };

  // Calculate total monthly cost
  const totalMonthlyCost = Object.values(adjustedCosts).reduce((sum, cost) => sum + cost, 0);
  
  // Add 30% buffer for taxes and unexpected expenses
  const monthlyIncomeNeeded = Math.round(totalMonthlyCost * 1.3);
  const annualIncomeNeeded = monthlyIncomeNeeded * 12;

  // Prepare breakdown for display
  const breakdown = [
    { category: 'Housing', amount: adjustedCosts.rent, icon: '🏠' },
    { category: 'Groceries', amount: adjustedCosts.groceries, icon: '🛒' },
    { category: 'Dining Out', amount: adjustedCosts.dining, icon: '🍽️' },
    { category: 'Transportation', amount: adjustedCosts.transportation, icon: '🚗' },
    { category: 'Utilities', amount: adjustedCosts.utilities, icon: '💡' },
    { category: 'Entertainment', amount: adjustedCosts.entertainment, icon: '🎬' },
    { category: 'Healthcare', amount: adjustedCosts.healthcare, icon: '⚕️' },
    { category: 'Savings', amount: adjustedCosts.savings, icon: '💰' },
    { category: 'Other', amount: adjustedCosts.miscellaneous, icon: '📦' }
  ];

  return {
    ...costData,
    estimatedMonthlyIncome: monthlyIncomeNeeded,
    estimatedAnnualIncome: annualIncomeNeeded,
    breakdown
  };
};
