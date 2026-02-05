import { supabase } from "../config/supabase.js";
import { DP_CHARGE } from "../constants/appConstants.js";
import { TRANSACTION_TYPE } from "../enums/appEnums.js";
import { BROKERAGE_FEE, SEBON_FEE } from "../utils/utils.js";

const getTransactionsModel = async (req, res) => {
  const { data, error } = await supabase.from("transactions").select("*");

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const createTransactionModel = async (transactionData) => {
  try {
    const SYMBOL_NAME = transactionData.symbol;
    const RATE = transactionData.rate;
    const TRANSACTION_DATA_TYPE = transactionData.transaction_type;
    const DATE = transactionData.created_at;
    const QUANTITY = transactionData.quantity;

    // First, get company UUID from symbol name
    const { data: companyData, error: companyError } = await supabase
      .from("listed_companies")
      .select("id")
      .eq("symbol", SYMBOL_NAME)
      .single();

    if (companyError || !companyData) {
      throw new Error(`Company with symbol ${SYMBOL_NAME} not found`);
    }

    const COMPANY_UUID = companyData.id;

    const TOTAL_AMOUNT = transactionData.quantity * transactionData.rate;
    const BROKERAGE_COMMISSION = BROKERAGE_FEE(TOTAL_AMOUNT, DATE);
    const SEBON_COMMISSION = SEBON_FEE(TOTAL_AMOUNT);
    const TOTAL_COMMISSION =
      BROKERAGE_COMMISSION + SEBON_COMMISSION + DP_CHARGE;
    const NET_INVESTMENT = Number((TOTAL_AMOUNT + TOTAL_COMMISSION).toFixed(2));
    const PRICE_PER_SHARE = NET_INVESTMENT / transactionData.quantity;

    const PAYLOAD = {
      symbol: COMPANY_UUID,
      rate: RATE,
      transaction_type: TRANSACTION_DATA_TYPE,
      quantity: QUANTITY,
    };

    const calculateWACC = async (
      companyUuid,
      newPricePerShare,
      newQuantity,
    ) => {
      const { data, error } = await supabase
        .from("transactions")
        .select("price_per_share, quantity")
        .eq("symbol", companyUuid) // UUID use gareko
        .eq("transaction_type", TRANSACTION_TYPE.BUY);

      if (error) throw new Error(error.message);

      const oldTotalQuantity = data.reduce(
        (acc, curr) => acc + curr.quantity,
        0,
      );
      const oldTotalInvestment = data.reduce(
        (acc, curr) => acc + curr.price_per_share * curr.quantity,
        0,
      );

      const newTotalQuantity = oldTotalQuantity + newQuantity;
      const newTotalInvestment =
        oldTotalInvestment + newPricePerShare * newQuantity;
      const wacc = newTotalInvestment / newTotalQuantity;

      return Number(wacc).toFixed(2);
    };

    if (transactionData.transaction_type === TRANSACTION_TYPE.BUY) {
      const WACC = await calculateWACC(COMPANY_UUID, PRICE_PER_SHARE, QUANTITY);

      const { data, error } = await supabase
        .from("transactions")
        .insert({
          ...PAYLOAD,
          created_at: DATE,
          total_amount: TOTAL_AMOUNT,
          dp_charge: DP_CHARGE,
          broker_commission: BROKERAGE_COMMISSION,
          sebon_commission: SEBON_COMMISSION,
          total_commission: TOTAL_COMMISSION,
          net_investment: NET_INVESTMENT,
          price_per_share: PRICE_PER_SHARE,
          wacc: WACC,
        })
        .select()
        .single();

      if (error) {
        console.error("Supabase insert error:", error);
        throw new Error(error.message);
      }

      return data;
    }

    throw new Error("Only BUY transactions are currently supported");
  } catch (error) {
    console.error("Error in createTransactionModel:", error);
    throw error;
  }
};

export { createTransactionModel, getTransactionsModel };
