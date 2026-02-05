import { Router } from "express";
import {
  createCompany,
  deleteCompany,
  getCompanyById,
  getListedCompany,
  updateCompany,
} from "../controllers/companyController.js";

const router = Router();

router.get("/company", getListedCompany);
// router.post("/company", validateCompanyData, createCompany);
router.post("/company", createCompany);
router.get("/company/:id", getCompanyById);
router.put("/company/:id", updateCompany);
router.delete("/company/:id", deleteCompany);

export default router;
