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
