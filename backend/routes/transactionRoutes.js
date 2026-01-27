import { Router } from "express";

const router = Router();

import {
  createTransaction,
  getTransactions,
} from "../controllers/transactionController.js";

router.get("/transactions", getTransactions);
router.post("/transactions", createTransaction);

export default router;
