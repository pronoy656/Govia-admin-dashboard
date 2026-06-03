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

type Citizen = {
  id: string;
  name: string;
  email: string;
  subscription: "Basic Plan" | "Premium Plan" | "Free Tier";
  incidents: string;
  status: "Online" | "Offline";
};

const mockData: Citizen[] = [
  { id: "1", name: "Sarah Chen", email: "M.Sterling@Anexus.lo", subscription: "Basic Plan", incidents: "05", status: "Online" },
  { id: "2", name: "Sarah Chen", email: "M.Sterling@Anexus.lo", subscription: "Basic Plan", incidents: "05", status: "Online" },
  { id: "3", name: "Sarah Chen", email: "M.Sterling@Anexus.lo", subscription: "Premium Plan", incidents: "05", status: "Online" },
  { id: "4", name: "Sarah Chen", email: "M.Sterling@Anexus.lo", subscription: "Basic Plan", incidents: "05", status: "Online" },
  { id: "5", name: "Sarah Chen", email: "M.Sterling@Anexus.lo", subscription: "Free Tier", incidents: "05", status: "Online" },
  { id: "6", name: "Sarah Chen", email: "M.Sterling@Anexus.lo", subscription: "Premium Plan", incidents: "05", status: "Online" },
  { id: "7", name: "Sarah Chen", email: "M.Sterling@Anexus.lo", subscription: "Free Tier", incidents: "05", status: "Online" },
  { id: "8", name: "Sarah Chen", email: "M.Sterling@Anexus.lo", subscription: "Basic Plan", incidents: "05", status: "Online" },
];

export default function CitizenManagementPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const columns: ColumnDef<Citizen>[] = [
    {
      header: "Citizen Name",
      accessorKey: "name",
      className: "text-[#1554ad]",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Subscription",
      cell: (item) => (
        <Badge
          variant="outline"
          className="font-normal border-slate-200 text-slate-600 bg-white shadow-sm"
        >
          {item.subscription}
        </Badge>
      ),
    },
    {
      header: "Incidents",
      accessorKey: "incidents",
      className: "text-[#1554ad]",
    },
    {
      header: "Status",
      cell: (item) => (
        <Badge
          variant="secondary"
          className="bg-blue-100 text-[#1554ad] hover:bg-blue-200 font-normal shadow-none border-none"
        >
          {item.status}
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
          View Incident History
        </Button>
      ),
      className: "text-right",
    },
  ];

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Citizens Management</h1>
        <p className="text-slate-500 mt-1">
          Monitor account statuses and incident volumes across all jurisdictions.
        </p>
      </div>

      <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100">
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <div className="flex-1 w-full">
            <Input
              placeholder="Search institutional records..."
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
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-[#1554ad] hover:bg-[#10438a] text-white h-12 px-6 rounded-xl shadow-md shadow-[#1554ad]/20">
              <Plus className="w-5 h-5 mr-2" />
              Add User
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
