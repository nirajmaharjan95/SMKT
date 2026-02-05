import axios from "axios";
import { useForm } from "react-hook-form";

interface CompanyFormData {
  symbol: string;
  company_name: string;
  sector: string;
}

const AddCompany = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      symbol: "",
      company_name: "",
      sector: "",
    },
  });

  const onSubmit = async (data: CompanyFormData) => {
    try {
      const payload = {
        symbol: data.symbol.trim().toUpperCase(),
        company_name: data.company_name.trim(),
        sector: data.sector,
      };
      const response = await axios.post(
        "http://localhost:5001/api/company",
        payload,
      );
      console.log("Company added:", response.data);
    } catch (error) {
      console.error("Error adding company:", error);
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 409
      ) {
        setError("symbol", {
          type: "manual",
          message: "Company with this symbol already exists.",
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <input
          className="input w-full"
          placeholder="Symbol"
          {...register("symbol", { required: true })}
        />
      </div>

      <div className="mb-4">
        <input
          placeholder="Company Name"
          className="input w-full"
          {...register("company_name", { required: true })}
        />
      </div>

      <div className="mb-4">
        <select
          defaultValue="Select a sector"
          className="select select-info w-full"
          {...register("sector", { required: true })}
        >
          <option disabled>Select a sector</option>
          <option>Others</option>
          <option>MP</option>
          <option>HT</option>
        </select>
      </div>

      <button className="btn btn-accent" type="submit">
        Add Company
      </button>

      {errors.symbol && (
        <p className="text-red-500 text-sm mt-1">{errors.symbol.message}</p>
      )}
    </form>
  );
};

export default AddCompany;
