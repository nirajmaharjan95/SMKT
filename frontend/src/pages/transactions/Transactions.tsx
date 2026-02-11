import type { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "../../components";
import type { TransactionTableData } from "../../types/table";

const Transactions = () => {
  const [data, setData] = useState<TransactionTableData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const columns: ColumnDef<TransactionTableData>[] = [
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
      accessorKey: "quantity",
      header: "Quantity",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "rate",
      header: "Rate",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "wacc",
      header: "WACC",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "transaction_type",
      header: "Transaction Type",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "source",
      header: "Source",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "created_at",
      header: "Transaction Date",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "total_amount",
      header: "Total Amount",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "total_investment",
      header: "Total Investment",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "broker_commission",
      header: "Broker Commission",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "sebon_commission",
      header: "SEBON Commission",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "dp_charge",
      header: "DP Charge + IPS",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "total_commission",
      header: "Total Commission",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "cgt",
      header: "CGT",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "net_investment",
      header: "Net Investment",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "price_per_share",
      header: "Price Per Share",
      cell: (info) => info.getValue(),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "http://localhost:5001/api/transaction",
        );
        const result = response.data.data;
        setData(result);
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Table data={data} columns={columns} />
    </div>
  );
};

export default Transactions;
