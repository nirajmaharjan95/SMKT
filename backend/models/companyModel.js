import { supabase } from "../config/supabase.js";

const getAllCompaniesModel = async () => {
  const { data, error } = await supabase.from("listed_companies").select("*");

  if (error) throw new Error(error.message);
  return data;
};

const getCompanyByIdModel = async (id) => {
  const { data, error } = await supabase
    .from("listed_companies")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

const checkDuplicateSymbol = async (symbol, excludeId) => {
  let query = supabase
    .from("listed_companies")
    .select("id")
    .eq("symbol", symbol);

  if (excludeId) {
    query = query.neq("id", excludeId);
  }

  const { data: existing, error } = await query;

  if (error) throw new Error(error.message);
  if (existing.length > 0) throw new Error("Company already exists");
};

/**
 * Creates a new company
 */
const createCompanyModel = async (companyData) => {
  await checkDuplicateSymbol(companyData.symbol);

  const { data, error } = await supabase
    .from("listed_companies")
    .insert({
      symbol: companyData.symbol.toUpperCase(),
      company_name: companyData.company_name,
      sector: companyData.sector,
    })
    .select()
    .single();
  console.log("🚀 ~ createCompanyModel ~ data:", data);

  if (error) throw new Error(error.message);
  return data;
};

/**
 * Updates an existing company
 */
const updateCompanyModel = async (id, companyData) => {
  await checkDuplicateSymbol(companyData.symbol, id); // exclude current company

  const { data, error } = await supabase
    .from("listed_companies")
    .update({
      symbol: companyData.symbol,
      company_name: companyData.company_name,
      sector: companyData.sector,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

const deleteCompanyModel = async (id) => {
  const { data, error } = await supabase
    .from("listed_companies")
    .delete()
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
};

export {
  createCompanyModel,
  deleteCompanyModel,
  getAllCompaniesModel,
  getCompanyByIdModel,
  updateCompanyModel,
};
