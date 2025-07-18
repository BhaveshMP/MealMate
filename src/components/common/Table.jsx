
import { Checkbox, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
const data = {
    
}
export function Component() {

    
  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <TableHead>
          <TableRow>
            <TableHeadCell className="p-4">
              <Checkbox />
            </TableHeadCell>
            <TableHeadCell>Product name</TableHeadCell>
            <TableHeadCell>Color</TableHeadCell>
            <TableHeadCell>Category</TableHeadCell>
            <TableHeadCell>Price</TableHeadCell>
            <TableHeadCell>
              <span className="sr-only">Edit</span>
            </TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          
          <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="p-4">
              <Checkbox />
            </TableCell>
            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Apple MacBook Pro 17"
            </TableCell>
            <TableCell>Sliver</TableCell>
            <TableCell>Laptop</TableCell>
            <TableCell>$2999</TableCell>
            <TableCell>
              <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                Edit
              </a>
            </TableCell>
          </TableRow>
          
        </TableBody>
      </Table>
    </div>
  );
}
