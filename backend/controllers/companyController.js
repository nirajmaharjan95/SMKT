//Standardized response Function

import {
  createCompanyModel,
  deleteCompanyModel,
  getAllCompaniesModel,
  getCompanyByIdModel,
  updateCompanyModel,
} from "../models/companyModel.js";

const handleResponse = (res, status, data = null, message = null) => {
  res.status(status).json({ data, message, status });
};

const getListedCompany = async (req, res, next) => {
  const companyData = await getAllCompaniesModel();
  try {
    handleResponse(res, 200, companyData, "Companies fetched successfully");
  } catch (error) {
    next(error);
  }
};

const createCompany = async (req, res, next) => {
  // Implementation for creating a company
  const companyData = req.body;
  try {
    const newCompany = await createCompanyModel(companyData);
    handleResponse(res, 201, newCompany, "Company created successfully");
  } catch (error) {
    next(error);
  }
};

const getCompanyById = async (req, res, next) => {
  // Implementation for getting a company by ID
  try {
    const company = await getCompanyByIdModel(req.params.id);
    handleResponse(res, 200, company, "Company fetched successfully");
  } catch (error) {
    next(error);
  }
};

const updateCompany = async (req, res, next) => {
  // Implementation for updating a company by ID
  try {
    const updatedCompany = await updateCompanyModel(req.params.id, req.body);
    handleResponse(res, 200, updatedCompany, "Company updated successfully");
  } catch (error) {
    next(error);
  }
};

const deleteCompany = async (req, res, next) => {
  // Implementation for deleting a company by ID
  try {
    await deleteCompanyModel(req.params.id);
    handleResponse(res, 200, null, "Company deleted successfully");
  } catch (error) {
    next(error);
  }
};

export {
  createCompany,
  deleteCompany,
  getCompanyById,
  getListedCompany,
  updateCompany,
};
