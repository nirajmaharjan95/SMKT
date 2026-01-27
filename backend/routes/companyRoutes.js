import { Router } from "express";
import {
  createCompany,
  deleteCompany,
  getCompanyById,
  getListedCompany,
  updateCompany,
} from "../controllers/companyController.js";

import { validateCompanyData } from "../middlewares/validationMiddleware.js";

const router = Router();

router.get("/companies", getListedCompany);
router.post("/company", validateCompanyData, createCompany);
router.get("/company/:id", getCompanyById);
router.put("/company/:id", updateCompany);
router.delete("/company/:id", deleteCompany);

export default router;
