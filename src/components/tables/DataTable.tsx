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
      <div className="w-full overflow-x-auto rounded-xl">
        <Table className="border-separate border-spacing-y-2 min-w-[600px]">
          <TableHeader>
            <TableRow className="border-none hover:bg-transparent">
              {columns.map((col, i) => (
                <TableHead
                  key={i}
                  className={`text-[#1554ad] font-semibold py-3 px-4 sm:py-4 sm:px-6 whitespace-nowrap ${col.className || ""}`}
                >
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, rowIndex) => {
              const rowBg = rowIndex % 2 === 0 ? "bg-white" : "bg-[#F1F6F5]";
              return (
                <TableRow
                  key={rowIndex}
                  className="border-none hover:opacity-90 transition-opacity group"
                >
                  {columns.map((col, colIndex) => (
                    <TableCell
                      key={colIndex}
                      className={`py-3 px-4 sm:py-4 sm:px-6 text-slate-600 font-medium whitespace-nowrap ${rowBg} ${colIndex === 0 ? "rounded-l-xl" : ""
                        } ${colIndex === columns.length - 1 ? "rounded-r-xl" : ""
                        } ${col.className || ""}`}
                    >
                      {col.cell
                        ? col.cell(row)
                        : col.accessorKey
                          ? String(row[col.accessorKey])
                          : null}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
            {data.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-slate-500 bg-white rounded-xl"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 pb-2">
          <p className="text-sm text-[#1554ad] font-medium">
            Showing page {pagination.currentPage} of {pagination.totalPages}
          </p>
          <div className="flex items-center justify-center gap-1 sm:gap-2">
            <button
              onClick={() =>
                pagination.onPageChange(Math.max(1, pagination.currentPage - 1))
              }
              className="p-2 text-slate-400 hover:text-[#1554ad] transition-colors"
              disabled={pagination.currentPage === 1}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {Array.from({ length: Math.min(3, pagination.totalPages) }).map(
              (_, i) => {
                let page: number;
                if (pagination.totalPages <= 3) {
                  page = i + 1;
                } else if (pagination.currentPage <= 2) {
                  page = i + 1;
                } else if (pagination.currentPage >= pagination.totalPages - 1) {
                  page = pagination.totalPages - 2 + i;
                } else {
                  page = pagination.currentPage - 1 + i;
                }
                
                const isActive = page === pagination.currentPage;
                return (
                  <button
                    key={page}
                    onClick={() => pagination.onPageChange(page)}
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all ${isActive
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
