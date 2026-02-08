import type { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table } from "../../components";
import CustomModal from "../../components/common/CustomModal";
import type { CompanyTableData } from "../../types/table";
import AddCompany from "./AddCompany";

const Companies = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [editingCompany, setEditingCompany] = useState<CompanyTableData | null>(
    null,
  );
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

  const columns: ColumnDef<CompanyTableData>[] = [
    {
      header: "ID",
      cell: (info) => info.row.index + 1,
    },
    {
      accessorKey: "symbol",
      header: "Symbol",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "company_name",
      header: "Company Name",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "sector",
      header: "Sector",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "",
      header: "Actions",
      cell: (row) => {
        return (
          <div className="flex space-x-2">
            <button
              className="btn btn-sm btn-outline btn-primary"
              onClick={() => handleOnEdit(row.row.original)}
            >
              Edit
            </button>
            <button
              className="btn btn-sm btn-outline btn-error"
              onClick={() => handleOnDelete()}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  function handleOnEdit(company: CompanyTableData) {
    setEditingCompany(company);
    setIsOpen(true);
  }

  function handleOnDelete() {
    console.log("Delete company");
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleOnSuccess(updatedCompany: CompanyTableData) {
    setData((prev) => {
      return prev.map((company) => {
        if (company.id === updatedCompany.id) {
          return updatedCompany;
        }
        return company;
      });
    });
    setIsOpen(false);
    setEditingCompany(null);
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
          <AddCompany
            editingCompany={editingCompany}
            onSuccess={handleOnSuccess}
          />
        </CustomModal>
      )}
    </>
  );
};

export default Companies;
