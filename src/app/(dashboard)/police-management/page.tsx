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
import { Badge } from "@/components/ui/badge";

type PoliceOfficer = {
  id: string;
  name: string;
  email: string;
  badgeNumber: string;
  encounters: string;
  rating: string;
};

const mockData: PoliceOfficer[] = [
  { id: "1", name: "Officer John Doe", email: "j.doe@police.dept", badgeNumber: "B-1045", encounters: "124", rating: "4.8/5.0" },
  { id: "2", name: "Officer Jane Smith", email: "j.smith@police.dept", badgeNumber: "B-2033", encounters: "98", rating: "4.9/5.0" },
  { id: "3", name: "Officer Mike Ross", email: "m.ross@police.dept", badgeNumber: "B-1102", encounters: "45", rating: "4.5/5.0" },
  { id: "4", name: "Officer Sarah Connor", email: "s.connor@police.dept", badgeNumber: "B-9980", encounters: "210", rating: "4.7/5.0" },
  { id: "5", name: "Officer David Clark", email: "d.clark@police.dept", badgeNumber: "B-3341", encounters: "15", rating: "4.2/5.0" },
];

export default function PoliceManagementPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const columns: ColumnDef<PoliceOfficer>[] = [
    {
      header: "Officer Name",
      accessorKey: "name",
      className: "text-[#1554ad]",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Badge Number",
      accessorKey: "badgeNumber",
    },
    {
      header: "Encounters",
      accessorKey: "encounters",
    },
    {
      header: "De-escalation Rating",
      cell: (item) => (
        <Badge
          variant="outline"
          className="font-normal border-slate-200 text-emerald-600 bg-emerald-50 shadow-sm"
        >
          {item.rating}
        </Badge>
      ),
    },
    {
      header: "Action",
      cell: () => (
        <Button
          variant="secondary"
          size="sm"
          className="bg-blue-100/50 text-[#1554ad] hover:bg-blue-100 border border-blue-200 font-medium"
        >
          View Details
        </Button>
      ),
      className: "text-right",
    },
  ];

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Police Management</h1>
        <p className="text-slate-500 mt-1">
          Monitor police officer encounters and ratings.
        </p>
      </div>

      <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100">
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <div className="flex-1 w-full">
            <Input
              placeholder="Search officer records..."
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
              Add Officer
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
