// Comfort income calculation.
// Cost of living is driven by a real, calibrated cost-of-living index (New York City = 100)
// held in ../data/costOfLivingIndex.js. We scale a New York baseline of comfortable monthly
// costs by each city's index, then apply the user's lifestyle choices. This is illustrative /
// educational, based on published cost-of-living indices — not a live data feed or a quote.

import { getColIndex } from '../data/costOfLivingIndex';

/**
 * Public entry point kept for backward compatibility with existing imports.
 */
export const fetchCostOfLiving = async (city, country, lifestyleOptions = {}) => {
  try {
    const costData = await getCityCostData(city, country);
    return calculateComfortIncome(costData, lifestyleOptions);
  } catch (error) {
    console.error('Error calculating cost of living:', error);
    throw new Error('Unable to calculate cost of living data. Please try again.');
  }
};

/**
 * Look up the real cost-of-living index for the city (NYC = 100) and build the
 * component indices used by the breakdown. We use one overall index so results are
 * transparent and consistent; housing, groceries, dining, etc. all scale with it.
 */
const getCityCostData = async (city, country) => {
  // Small, honest delay so the loading state is visible; no network call is made.
  await new Promise((resolve) => setTimeout(resolve, 500));

  const col = getColIndex(city, country);

  return {
    costOfLivingIndex: col,
    rentIndex: col,
    groceriesIndex: col,
    restaurantPriceIndex: col,
    // Rough purchasing-power proxy relative to NYC; display only, not used in the math.
    localPurchasingPowerIndex: Math.round(Math.min(120, 40 + col * 0.6)),
    city,
    country
  };
};

/**
 * Calculate comfortable income based on cost of living data and lifestyle options.
 */
const calculateComfortIncome = (costData, lifestyleOptions = {}) => {
  const { costOfLivingIndex, rentIndex, groceriesIndex, restaurantPriceIndex } = costData;

  // Baseline monthly cost of a comfortable life in New York (NYC index = 100).
  const nycBaseCosts = {
    rent: 3500,          // 1-bedroom in/near the city center
    groceries: 600,
    utilities: 200,
    transportation: 150,
    dining: 500,
    entertainment: 300,
    healthcare: 250,
    miscellaneous: 400,
    savings: 800
  };

  // Scale each category by the relevant index (all tied to the city's overall COL index).
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

  const lifestyleAdjustments = calculateLifestyleAdjustments(lifestyleOptions, costOfLivingIndex);

  const baseMonthlyCost = Object.values(adjustedCosts).reduce((sum, cost) => sum + cost, 0);
  const totalMonthlyCost = baseMonthlyCost + lifestyleAdjustments.totalAdjustment;

  // Buffer for taxes / savings target.
  const taxBuffer = getSavingsMultiplier(lifestyleOptions.savingsRate || 'moderate');
  const monthlyIncomeNeeded = Math.round(totalMonthlyCost * taxBuffer);
  const annualIncomeNeeded = monthlyIncomeNeeded * 12;

  const breakdown = [
    { category: 'Housing', amount: adjustedCosts.rent, icon: '🏠' },
    { category: 'Groceries', amount: adjustedCosts.groceries, icon: '🥕' },
    { category: 'Dining Out', amount: adjustedCosts.dining, icon: '🍽️' },
    { category: 'Transportation', amount: adjustedCosts.transportation, icon: '🚗' },
    { category: 'Utilities', amount: adjustedCosts.utilities, icon: '💡' },
    { category: 'Entertainment', amount: adjustedCosts.entertainment, icon: '🎉' },
    { category: 'Healthcare', amount: adjustedCosts.healthcare, icon: '💊' },
    { category: 'Savings', amount: adjustedCosts.savings, icon: '💰' },
    { category: 'Other', amount: adjustedCosts.miscellaneous, icon: '📦' }
  ];

  if (lifestyleAdjustments.details.length > 0) {
    lifestyleAdjustments.details.forEach((adjustment) => {
      breakdown.push({
        category: adjustment.category,
        amount: adjustment.amount,
        icon: adjustment.icon,
        isLifestyle: true
      });
    });
  }

  return {
    ...costData,
    estimatedMonthlyIncome: monthlyIncomeNeeded,
    estimatedAnnualIncome: annualIncomeNeeded,
    breakdown,
    lifestyleAdjustments: lifestyleAdjustments.details,
    baseMonthlyCost,
    totalMonthlyCost,
    taxBuffer
  };
};

/**
 * Calculate lifestyle adjustments based on user preferences.
 */
function calculateLifestyleAdjustments(options, colIndex) {
  const adjustments = { totalAdjustment: 0, details: [] };
  const scale = (v) => Math.round(v * (colIndex / 100));

  if (options.dogs > 0) {
    const c = scale(options.dogs * 100);
    adjustments.totalAdjustment += c;
    adjustments.details.push({ category: `Pets (${options.dogs} dog${options.dogs > 1 ? 's' : ''})`, amount: c, icon: '🐕', description: `Monthly cost for ${options.dogs} dog${options.dogs > 1 ? 's' : ''}` });
  }
  if (options.cats > 0) {
    const c = scale(options.cats * 50);
    adjustments.totalAdjustment += c;
    adjustments.details.push({ category: `Pets (${options.cats} cat${options.cats > 1 ? 's' : ''})`, amount: c, icon: '🐈', description: `Monthly cost for ${options.cats} cat${options.cats > 1 ? 's' : ''}` });
  }

  let gymCost = options.gymMembership === 'premium' ? 100 : options.gymMembership === 'standard' ? 50 : 0;
  if (gymCost > 0) {
    gymCost = scale(gymCost);
    adjustments.totalAdjustment += gymCost;
    adjustments.details.push({ category: 'Gym Membership', amount: gymCost, icon: '💪', description: `${options.gymMembership} gym membership` });
  }

  let carCost = options.carOwnership === 'luxury' ? 800 : options.carOwnership === 'standard' ? 500 : options.carOwnership === 'economy' ? 300 : 0;
  if (carCost > 0) {
    carCost = scale(carCost);
    adjustments.totalAdjustment += carCost;
    adjustments.details.push({ category: 'Car Ownership', amount: carCost, icon: '🚗', description: `${options.carOwnership} car payment and insurance` });
  }

  if (options.children > 0) {
    const c = scale(options.children * 1000);
    adjustments.totalAdjustment += c;
    adjustments.details.push({ category: `Children (${options.children})`, amount: c, icon: '👶', description: `Monthly cost for ${options.children} child${options.children > 1 ? 'ren' : ''}` });
  }

  if (options.studentLoans > 0) {
    adjustments.totalAdjustment += options.studentLoans;
    adjustments.details.push({ category: 'Student Loans', amount: options.studentLoans, icon: '🎓', description: 'Monthly student loan payment' });
  }

  let diningMultiplier = options.diningFrequency === 'frequent' ? 1.5 : options.diningFrequency === 'rare' ? 0.5 : 1.0;
  const diningAdjustment = Math.round((diningMultiplier - 1) * 300 * (colIndex / 100));
  if (diningAdjustment !== 0) {
    adjustments.totalAdjustment += diningAdjustment;
    adjustments.details.push({ category: 'Dining Adjustment', amount: diningAdjustment, icon: '🍽️', description: `${options.diningFrequency} dining out frequency` });
  }

  if (options.streamingServices > 0) {
    const c = scale(options.streamingServices * 15);
    adjustments.totalAdjustment += c;
    adjustments.details.push({ category: 'Streaming Services', amount: c, icon: '📺', description: `${options.streamingServices} streaming service${options.streamingServices > 1 ? 's' : ''}` });
  }

  let coffeeCost = options.coffeeHabit === 'daily' ? 100 : options.coffeeHabit === 'occasional' ? 30 : 0;
  if (coffeeCost > 0) {
    coffeeCost = scale(coffeeCost);
    adjustments.totalAdjustment += coffeeCost;
    adjustments.details.push({ category: 'Coffee Habit', amount: coffeeCost, icon: '☕', description: `${options.coffeeHabit} coffee consumption` });
  }

  let travelCost = options.travelBudget === 'luxury' ? 500 : options.travelBudget === 'moderate' ? 250 : options.travelBudget === 'budget' ? 100 : 0;
  if (travelCost > 0) {
    travelCost = scale(travelCost);
    adjustments.totalAdjustment += travelCost;
    adjustments.details.push({ category: 'Travel Budget', amount: travelCost, icon: '✈️', description: `${options.travelBudget} travel budget` });
  }

  let shoppingCost = options.shopping === 'frequent' ? 400 : options.shopping === 'moderate' ? 200 : options.shopping === 'minimal' ? 50 : 0;
  if (shoppingCost > 0) {
    shoppingCost = scale(shoppingCost);
    adjustments.totalAdjustment += shoppingCost;
    adjustments.details.push({ category: 'Shopping', amount: shoppingCost, icon: '🛍️', description: `${options.shopping} shopping habits` });
  }

  let hobbyCost = options.hobbies === 'expensive' ? 300 : options.hobbies === 'active' ? 200 : options.hobbies === 'moderate' ? 100 : 0;
  if (hobbyCost > 0) {
    hobbyCost = scale(hobbyCost);
    adjustments.totalAdjustment += hobbyCost;
    adjustments.details.push({ category: 'Hobbies', amount: hobbyCost, icon: '🎨', description: `${options.hobbies} hobby expenses` });
  }

  return adjustments;
}

/**
 * Buffer applied on top of raw living costs to account for taxes and a savings target.
 */
function getSavingsMultiplier(savingsRate) {
  switch (savingsRate) {
    case 'aggressive': return 1.5;
    case 'moderate': return 1.3;
    case 'minimal': return 1.15;
    case 'none':
    default: return 1.0;
  }
}
