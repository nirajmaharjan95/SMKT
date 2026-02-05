// Enum values for sector - update these to match your Supabase enum definition
// const VALID_SECTORS = [
//   "Commercial Banks",
//   "Manufacturing And Processing",
//   "Hotels And Tourism",
//   "Others",
//   "Hydro Power",
//   "Tradings",
//   "Non Life Insurance",
//   "Development Banks",
//   "Finance",
//   "Microfinance",
//   "Life Insurance",
//   "Investment",
// ];

const validateCompanyData = (req, res, next) => {
  const { symbol, company_name, sector } = req.body;

  // Validate required fields
  if (!symbol || !company_name || !sector) {
    return res.status(400).json({
      data: null,
      message: "Missing required fields: symbol, company_name, sector",
      status: 400,
    });
  }

  // Validate sector enum
  // if (!VALID_SECTORS.includes(sector)) {
  //   return res.status(400).json({
  //     data: null,
  //     message: `Invalid sector. Allowed values: ${VALID_SECTORS.join(", ")}`,
  //     status: 400,
  //   });
  // }

  next();
};

export { validateCompanyData };
