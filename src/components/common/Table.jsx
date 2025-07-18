
import { Checkbox, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
const demoData = [
    {
        name: "Bhavesh",
        address: "Panvel",
        contact: "9137934264",
        married: false
    },
    {
        name: "Bhavesh",
        address: "Panvel",
        contact: "9137934264",
        married: false
    },
]
export default function Component({data = demoData, title = "Table Name"}) {

    
  return (
    <>
    <h1 className="text-lg font-bold p-2">{title}</h1>
    <div className="overflow-x-auto shadow-2xl shadow-red-600/80 ">
      
      <Table className="" >
        <TableHead >
          <TableRow>
            <TableHeadCell className="p-4 bg-white/20">
              <Checkbox />
            </TableHeadCell >

    {Object.keys(data[0]).map((key, index) => (
      <TableHeadCell className="bg-white/20" key={index}>{key}</TableHeadCell>
    ))}
            <TableHeadCell className="bg-white/20">
              Edit
            </TableHeadCell >
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          
          {data.map((item, index)=>(
            <TableRow className="bg-white/20 dark:border-gray-700 dark:bg-gray-800/30">
                <TableCell className="p-4">
                <Checkbox />
                </TableCell>

                {Object.values(item).map((value, i) => (
                  <TableCell key={i}>{String(value)}</TableCell>
                ))}

                <TableCell>
                <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
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
