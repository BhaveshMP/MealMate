import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { getData } from "@/components/backend/Backend";
import { useEffect, useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";

const demoData = [
  {
    name: "Bhavesh",
    address: "Panvel",
    contact: "9137934264",
    married: false,
  },
  {
    name: "Om",
    address: "Pen",
    contact: "9145934264",
    married: true,
  },
];

export default function Component({ tableName, title = "Table Name" }) {
  const [tableData, setTableData] = useState(demoData);
  const [columns, setColumns] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (tableName) {
        const fetched = await getData(tableName);
        if (Array.isArray(fetched) && fetched.length > 0) {
          setTableData(fetched);
        }
      }
    }

    fetchData();
  }, [tableName]);

  useEffect(() => {
    // Set column list from data
    if (tableData.length > 0) {
      const keys = Object.keys(tableData[0]);
      setColumns(keys);
      setVisibleColumns(keys); // Initially all visible
    }
  }, [tableData]);

  const toggleColumn = (col) => {
    setVisibleColumns((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  };

  return (
    <>
<div className="relative inline-block group">
  <h1 className="text-lg font-bold p-2 cursor-pointer">{title}</h1>

  <div className="absolute top-full left-0 z-10 hidden group-hover:flex flex-col bg-gray-300 dark:bg-gray-800 p-2 shadow-lg  rounded gap-1 text-sm">
    {columns.map((col) => (
      <label key={col} className="flex items-center gap-1 px-2">
        <input
          type="checkbox"
          checked={visibleColumns.includes(col)}
          onChange={() => toggleColumn(col)}
        />
        {col}
      </label>
    ))}
  </div>
</div>


      <div className="overflow-x-auto overflow-y-auto max-h-[70vh] shadow-2xl shadow-black/30">
        <Table>
          {tableData.length > 0 && (
            <TableHead>
              <TableRow>
                <TableHeadCell className="p-4 bg-white/20">
                  <Checkbox />
                </TableHeadCell>

                {visibleColumns.map((key, index) => (
                  <TableHeadCell className="bg-white/20" key={index}>
                    {key}
                  </TableHeadCell>
                ))}

                <TableHeadCell className="bg-white/20">Edit</TableHeadCell>
              </TableRow>
            </TableHead>
          )}

          <TableBody className="divide-y">
            {tableData.map((item, index) => (
              <TableRow
                key={index}
                className="bg-white/20 dark:border-gray-700 dark:bg-gray-800/30"
              >
                <TableCell className="p-4">
                  <Checkbox />
                </TableCell>

                {visibleColumns.map((col, i) => (
                  <TableCell key={i}>{String(item[col])}</TableCell>
                ))}

                <TableCell>
                  <a
                    href="#"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Edit
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
