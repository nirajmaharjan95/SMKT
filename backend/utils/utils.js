import { CUTOFF_DATE } from "../constants/appConstants.js";

const BROKERAGE_FEE = (amount, transactionDate) => {
  const tradeDate = new Date(transactionDate);
  const isNew = tradeDate > CUTOFF_DATE;

  if (isNew) {
    if (amount > 10000000) return amount * 0.0024;
    if (amount > 1000000) return amount * 0.0027;
    if (amount > 200000) return amount * 0.0031;
    if (amount >= 50001) return amount * 0.0033;

    // DEFAULT: <= 50,000
    return amount * 0.0036;
  } else {
    if (amount > 10000000) return amount * 0.0027;
    if (amount > 1000000) return amount * 0.003;
    if (amount > 200000) return amount * 0.0034;
    if (amount >= 50001) return amount * 0.0037;

    // DEFAULT: <= 50,000
    return amount * 0.004;
  }
};

const SEBON_FEE = (amount) => {
  return amount * 0.00015;
};

export { BROKERAGE_FEE, SEBON_FEE };
