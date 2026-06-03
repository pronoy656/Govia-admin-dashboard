"use client";

import React, { useState } from "react";
import { DataTable, ColumnDef } from "@/components/tables/DataTable";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type Bondsman = {
  id: string;
  name: string;
  agencyName: string;
  licenseId: string;
  activeRequest: string;
  totalReleases: string;
};

const mockData: Bondsman[] = [
  { id: "1", name: "Mike Ehrmantraut", agencyName: "Quick Bail Bonds", licenseId: "L-99821", activeRequest: "3", totalReleases: "145" },
  { id: "2", name: "Saul Goodman", agencyName: "Better Call Saul Bonds", licenseId: "L-44211", activeRequest: "12", totalReleases: "890" },
  { id: "3", name: "Kim Wexler", agencyName: "Wexler Bonds", licenseId: "L-33290", activeRequest: "1", totalReleases: "45" },
  { id: "4", name: "Howard Hamlin", agencyName: "Hamlin Bail Co", licenseId: "L-11002", activeRequest: "0", totalReleases: "230" },
  { id: "5", name: "Chuck McGill", agencyName: "McGill Surety", licenseId: "L-88221", activeRequest: "5", totalReleases: "120" },
];

export default function BailBondsmanManagementPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const columns: ColumnDef<Bondsman>[] = [
    {
      header: "Bondsman Name",
      accessorKey: "name",
      className: "text-[#1554ad]",
    },
    {
      header: "Agency Name",
      accessorKey: "agencyName",
    },
    {
      header: "License ID",
      accessorKey: "licenseId",
    },
    {
      header: "Active Request",
      accessorKey: "activeRequest",
    },
    {
      header: "Total Releases",
      accessorKey: "totalReleases",
    },
    {
      header: "Action",
      cell: () => (
        <Button
          variant="secondary"
          size="sm"
          className="bg-blue-100/50 text-[#1554ad] hover:bg-blue-100 border border-blue-200 font-medium"
        >
          View Agency
        </Button>
      ),
      className: "text-right",
    },
  ];

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Bail Bondsman Management</h1>
        <p className="text-slate-500 mt-1">
          Monitor bail bondsmen and agency release statistics.
        </p>
      </div>

      <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100">
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <div className="flex-1 w-full">
            <Input
              placeholder="Search bondsman or agency..."
              className="max-w-2xl bg-[#f4f7fa] border-none shadow-none h-12 rounded-xl text-slate-700"
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Select defaultValue="status">
              <SelectTrigger className="w-[160px] bg-[#f4f7fa] border-none shadow-none h-12 rounded-xl">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="status">Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-[#1554ad] hover:bg-[#10438a] text-white h-12 px-6 rounded-xl shadow-md shadow-[#1554ad]/20">
              <Plus className="w-5 h-5 mr-2" />
              Add Bondsman
            </Button>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={mockData.slice((currentPage - 1) * 5, currentPage * 5)}
          pagination={{
            currentPage,
            totalPages: Math.ceil(mockData.length / 5),
            onPageChange: setCurrentPage,
          }}
        />
      </div>
    </div>
  );
}
