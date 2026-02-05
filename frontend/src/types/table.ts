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

interface CompanyTableProps {
  data: CompanyTableData[];
  columns: ColumnDef<CompanyTableData>[];
}

export type { CompanyTableData, CompanyTableProps, TableProps };
