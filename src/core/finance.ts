// ─── Task A: Monthly payment & amortization ───────────────────────────────────

export interface AmortRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

/**
 * Standard amortized monthly P&I payment.
 * If annualRatePct === 0, returns principal / (years * 12).
 */
export function monthlyPI(
  principal: number,
  annualRatePct: number,
  years: number
): number {
  const n = years * 12;
  if (annualRatePct === 0) return principal / n;
  const r = annualRatePct / 100 / 12;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

/**
 * Full amortization schedule. The final row is adjusted so that the ending
 * balance is exactly 0 (clears any floating-point rounding drift).
 */
export function amortization(
  principal: number,
  annualRatePct: number,
  years: number
): AmortRow[] {
  const n = years * 12;
  const r = annualRatePct / 100 / 12;
  const payment = monthlyPI(principal, annualRatePct, years);
  const rows: AmortRow[] = [];
  let balance = principal;

  for (let month = 1; month <= n; month++) {
    const interest = balance * r;
    let principalPaid = payment - interest;
    // On the final month, clear any rounding drift so balance hits exactly 0
    if (month === n) {
      principalPaid = balance;
    }
    balance = balance - principalPaid;
    // Clamp tiny floating-point negatives to 0
    if (Math.abs(balance) < 1e-6) balance = 0;
    rows.push({
      month,
      payment: principalPaid + interest,
      principal: principalPaid,
      interest,
      balance,
    });
  }

  return rows;
}

/**
 * Total interest paid over the life of the loan.
 */
export function totalInterest(
  principal: number,
  annualRatePct: number,
  years: number
): number {
  const rows = amortization(principal, annualRatePct, years);
  return rows.reduce((acc, r) => acc + r.interest, 0);
}

// ─── Task B: Full housing payment, affordability, refi break-even, DTI ────────

export function monthlyPITI(a: {
  principal: number;
  ratePct: number;
  years: number;
  annualTaxPct: number;
  annualInsurance: number;
  monthlyHOA: number;
  pmiAnnualPct: number;
  homeValue: number;
}): number {
  const pi = monthlyPI(a.principal, a.ratePct, a.years);
  const tax = (a.annualTaxPct / 100) * a.homeValue / 12;
  const insurance = a.annualInsurance / 12;
  const hoa = a.monthlyHOA;
  const ltv = a.principal / a.homeValue;
  const pmi = ltv > 0.8 ? (a.pmiAnnualPct / 100) * a.homeValue / 12 : 0;
  return pi + tax + insurance + hoa + pmi;
}

/**
 * Maximum home PRICE affordable given income and constraints.
 * Uses binary search to find the price where:
 *   (monthlyDebts + monthlyHousing) / grossMonthlyIncome <= dtiMax
 * where monthlyHousing = monthlyPI(price - downPayment, ratePct, years)
 *                        + price * taxInsRate / 12
 */
export function affordability(a: {
  grossMonthlyIncome: number;
  monthlyDebts: number;
  ratePct: number;
  years: number;
  dtiMax?: number;
  downPayment: number;
  taxInsRate?: number;
}): number {
  const dtiMax = a.dtiMax ?? 0.43;
  const taxInsRate = a.taxInsRate ?? 0.015;
  const maxMonthlyHousing =
    dtiMax * a.grossMonthlyIncome - a.monthlyDebts;

  if (maxMonthlyHousing <= 0) return 0;

  // Binary search for price
  let lo = a.downPayment; // minimum viable price
  let hi = a.grossMonthlyIncome * 12 * 100; // generous upper bound

  for (let i = 0; i < 100; i++) {
    const mid = (lo + hi) / 2;
    const loan = Math.max(0, mid - a.downPayment);
    const pi = loan > 0 ? monthlyPI(loan, a.ratePct, a.years) : 0;
    const housing = pi + (mid * taxInsRate) / 12;
    if (housing <= maxMonthlyHousing) {
      lo = mid;
    } else {
      hi = mid;
    }
  }

  return lo;
}

/**
 * Number of months to recoup closing costs via monthly payment savings.
 * Returns Infinity if there are no monthly savings.
 */
export function refiBreakevenMonths(a: {
  currentPayment: number;
  newPayment: number;
  closingCosts: number;
}): number {
  const savings = a.currentPayment - a.newPayment;
  if (savings <= 0) return Infinity;
  return a.closingCosts / savings;
}

/**
 * Debt-to-income ratio. Returns Infinity when income is 0.
 */
export function dti(monthlyDebt: number, grossMonthlyIncome: number): number {
  if (grossMonthlyIncome === 0) return Infinity;
  return monthlyDebt / grossMonthlyIncome;
}

// ─── Task C: Extra payment payoff & rent-vs-buy ───────────────────────────────

/**
 * Simulate amortization with an extra monthly principal payment.
 */
export function extraPayment(a: {
  principal: number;
  ratePct: number;
  years: number;
  extraMonthly: number;
}): { monthsSaved: number; interestSaved: number; payoffMonths: number } {
  const baseMonths = a.years * 12;
  const r = a.ratePct / 100 / 12;
  const payment = monthlyPI(a.principal, a.ratePct, a.years);
  const baseTotalInterest = totalInterest(a.principal, a.ratePct, a.years);

  let balance = a.principal;
  let months = 0;
  let interestPaid = 0;

  while (balance > 1e-6 && months < baseMonths) {
    months++;
    const interest = balance * r;
    interestPaid += interest;
    // Standard principal + extra, capped at remaining balance
    let principalPaid = payment - interest + a.extraMonthly;
    if (principalPaid > balance) principalPaid = balance;
    balance -= principalPaid;
    if (balance < 1e-6) balance = 0;
  }

  const payoffMonths = months;
  const monthsSaved = baseMonths - payoffMonths;
  const interestSaved = baseTotalInterest - interestPaid;

  return { payoffMonths, monthsSaved, interestSaved };
}

/**
 * Compare total cost of buying vs renting over a given horizon.
 *
 * buyCost = mortgage payments made + downPayment + taxes/ins (1.5%/yr)
 *           − home equity accumulated − home appreciation gain
 *
 * rentCost = sum of monthly rent growing at rentInflationPct per year
 *
 * advantage = rentCost − buyCost  (positive → buying cheaper)
 */
export function rentVsBuy(a: {
  homePrice: number;
  downPayment: number;
  ratePct: number;
  years: number;
  monthlyRent: number;
  appreciationPct?: number;
  rentInflationPct?: number;
  horizonYears: number;
}): { buyCost: number; rentCost: number; advantage: number } {
  const appreciationPct = a.appreciationPct ?? 3;
  const rentInflationPct = a.rentInflationPct ?? 3;
  const horizonMonths = a.horizonYears * 12;
  const principal = a.homePrice - a.downPayment;

  // Full amortization schedule (up to full term)
  const schedule = amortization(principal, a.ratePct, a.years);

  // Sum mortgage payments + taxes/ins over horizon
  let mortgageTotal = 0;
  let principalPaidInHorizon = 0;

  for (let m = 0; m < horizonMonths && m < schedule.length; m++) {
    mortgageTotal += schedule[m].payment;
    principalPaidInHorizon += schedule[m].principal;
  }

  // Taxes + insurance: 1.5%/yr of home price
  const taxInsTotal = a.homePrice * 0.015 * a.horizonYears;

  // Home value at end of horizon
  const futureHomeValue =
    a.homePrice * Math.pow(1 + appreciationPct / 100, a.horizonYears);
  const appreciationGain = futureHomeValue - a.homePrice;

  // Total equity gained = down payment + principal paid in horizon
  const equityBuilt = a.downPayment + principalPaidInHorizon;

  // buyCost = cash out - gain
  const buyCost =
    mortgageTotal + a.downPayment + taxInsTotal - equityBuilt - appreciationGain;

  // Rent cost: monthly rent grows rentInflationPct per year, sum over horizon
  let rentCost = 0;
  for (let m = 0; m < horizonMonths; m++) {
    const yearIndex = Math.floor(m / 12);
    const monthlyRentNow =
      a.monthlyRent * Math.pow(1 + rentInflationPct / 100, yearIndex);
    rentCost += monthlyRentNow;
  }

  const advantage = rentCost - buyCost;

  return { buyCost, rentCost, advantage };
}

// ─── Task D: Reverse mortgage (HECM-style estimate) ───────────────────────────

function round(value: number, decimals: number): number {
  const f = Math.pow(10, decimals);
  return Math.round(value * f) / f;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Reverse mortgage (HECM-style) marketing ESTIMATOR.
 *
 * This is a rough approximation for illustration only — it is NOT an official
 * HUD principal limit factor (PLF) lookup. Real HECM PLFs come from published
 * HUD tables keyed on age and expected rate.
 *
 * maxClaimAmount = min(homeValue, lendingLimit)
 * PLF = clamp(0.40 + (age-62)*0.007 - max(0, expectedRatePct-5)*0.02, 0.15, 0.75)
 * availableProceeds = maxClaimAmount * PLF
 */
export function reverseMortgage(a: {
  age: number; // youngest borrower age, >= 62
  homeValue: number;
  expectedRatePct: number; // expected interest rate
  lendingLimit?: number; // default 1149825 (FHA HECM max claim 2024)
}): {
  principalLimitFactor: number;
  maxClaimAmount: number;
  availableProceeds: number;
} {
  const lendingLimit = a.lendingLimit ?? 1149825;
  const maxClaimAmount = Math.min(a.homeValue, lendingLimit);
  const principalLimitFactor = round(
    clamp(
      0.4 +
        (a.age - 62) * 0.007 -
        Math.max(0, a.expectedRatePct - 5) * 0.02,
      0.15,
      0.75
    ),
    4
  );
  const availableProceeds = round(maxClaimAmount * principalLimitFactor, 2);
  return { principalLimitFactor, maxClaimAmount, availableProceeds };
}

// ─── Task E: Commercial mortgage (amortize with balloon) ──────────────────────

/**
 * Commercial mortgage marketing ESTIMATOR.
 *
 * Payments are based on a long amortization schedule (e.g. 25 years) but the
 * remaining balance comes due as a balloon at the (shorter) term. Numbers are
 * approximations for illustration only.
 */
export function commercialMortgage(a: {
  loanAmount: number;
  ratePct: number;
  amortYears: number; // amortization schedule length (e.g. 25)
  termYears: number; // balloon due at this term (e.g. 7); may be < amortYears
}): {
  monthlyPayment: number;
  balloonBalance: number;
  totalInterestToTerm: number;
  totalPaidToTerm: number;
} {
  const monthlyPayment = monthlyPI(a.loanAmount, a.ratePct, a.amortYears);
  const schedule = amortization(a.loanAmount, a.ratePct, a.amortYears);
  const k = Math.min(a.termYears, a.amortYears) * 12;

  const balloonBalance =
    k >= schedule.length ? 0 : schedule[k - 1].balance;

  let totalInterestToTerm = 0;
  for (let i = 0; i < k && i < schedule.length; i++) {
    totalInterestToTerm += schedule[i].interest;
  }
  const totalPaidToTerm = monthlyPayment * k;

  return {
    monthlyPayment: round(monthlyPayment, 2),
    balloonBalance: round(balloonBalance, 2),
    totalInterestToTerm: round(totalInterestToTerm, 2),
    totalPaidToTerm: round(totalPaidToTerm, 2),
  };
}
