import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { Button } from "./button";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

export default function DataTable({ title, columns, data, onAdd, onEdit, onDelete }) {
  const showActions = typeof onEdit === "function" || typeof onDelete === "function";

  return (
    <div className="bg-white shadow rounded-md p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        {onAdd && (
          <Button onClick={onAdd} variant="default" size="sm" className="flex items-center gap-2">
            <FiPlus /> Add
          </Button>
        )}
      </div>

      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.accessor} className="text-sm text-gray-600">
                {col.header}
              </TableHead>
            ))}
            {showActions && <TableHead className="text-sm text-gray-600">Actions</TableHead>}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((row, i) => (
            <TableRow key={row.id ?? i}>
              {columns.map((col) => (
                <TableCell key={col.accessor} className="text-sm text-gray-700">
                  {String(row[col.accessor] ?? "-")}
                </TableCell>
              ))}
              {showActions && (
                <TableCell>
                  <div className="flex gap-2">
                    {onEdit && (
                      <button className="text-blue-600 p-1 rounded hover:bg-gray-100" onClick={() => onEdit(row)}>
                        <FiEdit />
                      </button>
                    )}
                    {onDelete && (
                      <button className="text-red-600 p-1 rounded hover:bg-gray-100" onClick={() => onDelete(row)}>
                        <FiTrash2 />
                      </button>
                    )}
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}