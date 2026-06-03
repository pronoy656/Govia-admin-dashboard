"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface ColumnDef<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
}

export function DataTable<T>({ columns, data, pagination }: DataTableProps<T>) {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full overflow-hidden rounded-xl border border-slate-100 bg-white">
        <Table>
          <TableHeader className="bg-[#f4f9f9]">
            <TableRow className="border-b-0 hover:bg-transparent">
              {columns.map((col, i) => (
                <TableHead
                  key={i}
                  className={`text-[#1554ad] font-semibold py-4 px-6 ${col.className || ""}`}
                >
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                className={`border-b-0 hover:bg-slate-50 transition-colors ${
                  rowIndex % 2 === 0 ? "bg-white" : "bg-slate-50/40"
                }`}
              >
                {columns.map((col, colIndex) => (
                  <TableCell
                    key={colIndex}
                    className={`py-4 px-6 text-slate-600 font-medium ${
                      col.className || ""
                    }`}
                  >
                    {col.cell
                      ? col.cell(row)
                      : col.accessorKey
                      ? String(row[col.accessorKey])
                      : null}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {data.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-slate-500"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-sm text-[#1554ad] font-medium">
            Showing 1 To 5 Page
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                pagination.onPageChange(Math.max(1, pagination.currentPage - 1))
              }
              className="p-2 text-slate-400 hover:text-[#1554ad] transition-colors"
              disabled={pagination.currentPage === 1}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {Array.from({ length: Math.min(5, pagination.totalPages) }).map(
              (_, i) => {
                const page = i + 1;
                const isActive = page === pagination.currentPage;
                return (
                  <button
                    key={page}
                    onClick={() => pagination.onPageChange(page)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                      isActive
                        ? "bg-[#1554ad] text-white shadow-md shadow-[#1554ad]/20"
                        : "text-slate-600 bg-slate-100 hover:bg-slate-200"
                    }`}
                  >
                    {page}
                  </button>
                );
              }
            )}
            <button
              onClick={() =>
                pagination.onPageChange(
                  Math.min(pagination.totalPages, pagination.currentPage + 1)
                )
              }
              className="p-2 text-slate-400 hover:text-[#1554ad] transition-colors"
              disabled={pagination.currentPage === pagination.totalPages}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
