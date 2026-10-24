import assert from 'node:assert';

// Test budget calculations
function calculateBudget(budget) {
  const travelers = Math.max(1, budget.travelers || 1);
  const days = Math.max(1, budget.days || 1);
  const nights = Math.max(0, days - 1);

  const accommodationRate = Math.max(0, budget.nightlyAccommodation || 0);
  const dailyFoodRate = Math.max(0, budget.dailyFoodPerPerson || 0);
  const transportation = Math.max(0, budget.transportation || 0);
  const activities = Math.max(0, budget.activities || 0);
  const miscellaneous = Math.max(0, budget.miscellaneous || 0);

  const accommodationCost = accommodationRate * (nights === 0 ? 1 : nights);
  const foodCost = dailyFoodRate * travelers * days;
  const transportCost = transportation;
  const activitiesCost = activities;
  const miscCost = miscellaneous;

  const totalCost = accommodationCost + foodCost + transportCost + activitiesCost + miscCost;
  const perPersonCost = travelers > 0 ? Math.round(totalCost / travelers) : totalCost;

  return {
    travelers,
    days,
    nights: nights === 0 ? 1 : nights,
    accommodationCost,
    foodCost,
    transportCost,
    activitiesCost,
    miscCost,
    totalCost,
    perPersonCost,
  };
}

function formatINR(amount) {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '₹0';
  }
  const rounded = Math.round(amount);
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(rounded);
}

// 1. Standard calculation test
const std = calculateBudget({
  travelers: 2,
  days: 5,
  nightlyAccommodation: 3000,
  dailyFoodPerPerson: 1000,
  transportation: 4000,
  activities: 2000,
  miscellaneous: 1000,
});

assert.strictEqual(std.nights, 4, 'Nights should be 4 for 5 days');
assert.strictEqual(std.accommodationCost, 12000, 'Stay should be 3000 * 4 = 12000');
assert.strictEqual(std.foodCost, 10000, 'Food should be 1000 * 2 * 5 = 10000');
assert.strictEqual(std.totalCost, 12000 + 10000 + 4000 + 2000 + 1000, 'Total should equal 29000');
assert.strictEqual(std.perPersonCost, 14500, 'Per person should equal 14500');

// 2. Edge case: 1 day trip
const oneDay = calculateBudget({
  travelers: 1,
  days: 1,
  nightlyAccommodation: 2500,
  dailyFoodPerPerson: 800,
  transportation: 1500,
  activities: 500,
  miscellaneous: 200,
});
assert.strictEqual(oneDay.nights, 1, '1 day trip should count minimum 1 stay unit');
assert.strictEqual(oneDay.totalCost, 2500 + 800 + 1500 + 500 + 200, 'Total is 5500');

// 3. Edge case: 0 travelers or negative numbers safely clamped
const edgeZero = calculateBudget({
  travelers: 0,
  days: -3,
  nightlyAccommodation: -100,
  dailyFoodPerPerson: -50,
  transportation: -200,
  activities: 0,
  miscellaneous: 0,
});
assert.strictEqual(edgeZero.travelers, 1, '0 travelers clamped to 1');
assert.strictEqual(edgeZero.days, 1, 'negative days clamped to 1');
assert.strictEqual(edgeZero.totalCost, 0, 'negative costs clamped to 0');
assert.strictEqual(edgeZero.perPersonCost, 0, 'per person clamped to 0');

// 4. INR formatting check
const formatted = formatINR(14500);
assert(formatted.includes('14,500'), `Expected formatted INR to contain 14,500, got ${formatted}`);

console.log('✅ ALL TEST ASSERTIONS PASSED SUCCESSFULLY!');
