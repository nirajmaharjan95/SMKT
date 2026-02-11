import type { ColumnDef } from "@tanstack/react-table";

interface TableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
}

interface CompanyTableData {
  id: string;
  symbol: string;
  company_name: string;
  sector: string;
}

interface TransactionTableData {
  id: string;
  symbol: string;
  company_name: string;
  sector: string;
  transaction_type: "buy" | "sell";
  quantity: number;
  price: number;
  date: string;
}

interface LiveData {
  id: string;
  created_at: string;
  symbol: string;
  ltp: number;
  point_change: number;
  percent_change: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  prev_close: number;
}

interface CompanyTableProps {
  data: CompanyTableData[];
  columns: ColumnDef<CompanyTableData>[];
}

export type {
  CompanyTableData,
  CompanyTableProps,
  LiveData,
  TableProps,
  TransactionTableData,
};
