import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table } from "../../components";
import CustomModal from "../../components/common/CustomModal";
import type { CompanyTableData } from "../../types/table";
import AddCompany from "./AddCompany";

const columns = [
  {
    header: "ID",
    cell: (info: any) => info.row.index + 1,
  },
  {
    accessorKey: "symbol",
    header: "Symbol",
    cell: (info: any) => info.getValue(),
  },
  {
    accessorKey: "company_name",
    header: "Company Name",
    cell: (info: any) => info.getValue(),
  },
  {
    accessorKey: "sector",
    header: "Sector",
    cell: (info: any) => info.getValue(),
  },
];

const Companies = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [data, setData] = useState<CompanyTableData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5001/api/company");
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching company data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Companies</h1>
        <Button label="Add Company" variant="primary" onClick={openModal} />
      </div>
      <Table data={data} columns={columns} />

      {isOpen && (
        <CustomModal
          isOpen={isOpen}
          onRequestClose={closeModal}
          title="Add Company"
        >
          <AddCompany />
        </CustomModal>
      )}
    </>
  );
};

export default Companies;
