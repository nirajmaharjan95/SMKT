import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface AddCompanyProps {
  editingCompany?: any;
  onSuccess: (updatedCompany: CompanyFormData) => void;
}
interface CompanyFormData {
  id: string;
  symbol: string;
  company_name: string;
  sector: string;
}

const AddCompany = ({ editingCompany, onSuccess }: AddCompanyProps) => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<CompanyFormData>({
    defaultValues: {
      symbol: "",
      company_name: "",
      sector: "",
    },
  });

  useEffect(() => {
    if (editingCompany) {
      reset({
        symbol: editingCompany.symbol,
        company_name: editingCompany.company_name,
        sector: editingCompany.sector,
      });
    }
  }, [editingCompany, reset]);

  const onSubmit = async (data: CompanyFormData) => {
    try {
      const payload = {
        symbol: data.symbol.trim().toUpperCase(),
        company_name: data.company_name.trim(),
        sector: data.sector,
      };

      let updatedCompany;

      if (editingCompany) {
        const response = await axios.put(
          `http://localhost:5001/api/company/${editingCompany.id}`,
          payload,
        );
        updatedCompany = response.data.data;
      } else {
        const response = await axios.post(
          "http://localhost:5001/api/company",
          payload,
        );
        updatedCompany = response.data.data;
      }

      if (onSuccess && updatedCompany) {
        onSuccess(updatedCompany);
      }
    } catch (error) {
      console.error("Error adding company:", error);
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 409
      ) {
        setError("symbol", {
          type: "manual",
          message: error.response.data.message,
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
        {editingCompany ? "Update Company" : "Add Company"}
      </button>

      {errors.symbol && (
        <p className="text-red-500 text-sm mt-1">{errors.symbol.message}</p>
      )}
    </form>
  );
};

export default AddCompany;
