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

const createCompanyModel = async (companyData) => {
  const { data: existingCompany, error: checkError } = await supabase
    .from("listed_companies")
    .select("id")
    .eq("symbol", companyData.symbol);

  if (checkError) throw new Error(checkError.message);

  if (existingCompany.length > 0) {
    throw new Error("Company already exists");
  }

  const { data, error: insertError } = await supabase
    .from("listed_companies")
    .insert({
      symbol: companyData.symbol.toUpperCase(),
      company_name: companyData.company_name,
      sector: companyData.sector,
    })
    .select()
    .single();
  console.log("🚀 ~ createCompanyModel ~ data:", data);

  if (insertError) throw new Error(insertError.message);
  return data;
};

const updateCompanyModel = async (id, companyData) => {
  const { data, error } = await supabase
    .from("listed_companies")
    .update({
      symbol: companyData.symbol.toUpperCase(),
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
