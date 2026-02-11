import type { ColumnDef } from "@tanstack/table-core";
import axios from "axios";
import { CloudSync } from "lucide-react";
import { useEffect, useState } from "react";
import { Button, Table } from "../../components";
import type { LiveData } from "../../types/table";

const LiveData = () => {
  const [data, setData] = useState<LiveData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const columns: ColumnDef<LiveData>[] = [
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
      accessorKey: "ltp",
      header: "LTP",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "point_change",
      header: "Point Change",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "percent_change",
      header: "Percent Change",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "open",
      header: "Open",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "high",
      header: "High",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "low",
      header: "Low",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "volume",
      header: "Volume",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "prev_close",
      header: "Prev Close",
      cell: (info) => info.getValue(),
    },
  ];

  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:5001/api/live-data");
        const result = await response.data.data;
        setData(result);
      } catch (error) {
        console.error("Error fetching live data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLiveData();
  }, []);

  // TODO:

  // const reFetchLiveData = async () => {
  //   try {
  //     setIsLoading(true);
  //     const response = await axios.post("http://localhost:5001/api/live-data");
  //     const result = await response.data.data;
  //     setData(result);
  //   } catch (error) {
  //     console.error("Error re-fetching live data:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p>
          As of:
          {data[0]?.created_at
            ? new Date(data[0].created_at).toLocaleDateString()
            : "N/A"}
        </p>

        <Button
          variant="outlined"
          label=""
          className="btn btn-square"
          onClick={() => window.location.reload()}
        >
          <CloudSync size={20} />
        </Button>
      </div>
      <Table data={data} columns={columns} />
    </div>
  );
};

export default LiveData;
