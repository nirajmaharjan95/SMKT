import {
  createTransactionModel,
  getTransactionsModel,
} from "../models/transactionModel.js";

const handleResponse = (res, status, data = null, message = null) => {
  res.status(status).json({ data, message, status });
};

const getTransactions = async (req, res, next) => {
  const transactionData = await getTransactionsModel();

  try {
    handleResponse(
      res,
      200,
      transactionData,
      "Transactions fetched successfully",
    );
  } catch (error) {
    next(error);
  }
};

const createTransaction = async (req, res, next) => {
  try {
    const transactionData = req.body;
    const newTransaction = await createTransactionModel(transactionData);

    if (!newTransaction) {
      throw new Error("Transaction creation failed");
    }
    handleResponse(
      res,
      201,
      newTransaction,
      "Transaction created successfully",
    );
  } catch (error) {
    next(error);
  }
};

export { createTransaction, getTransactions };
