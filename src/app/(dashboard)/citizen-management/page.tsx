"use client";

import { MoreHorizontal } from 'lucide-react';
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
import AddUserDialog, { UserFormData } from "@/components/dialogs/AddUserDialog";

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

  { id: "9", name: "Sarah Chen", email: "M.Sterling@Anexus.lo", subscription: "Basic Plan", incidents: "05", status: "Online" },
  { id: "10", name: "Sarah Chen", email: "M.Sterling@Anexus.lo", subscription: "Basic Plan", incidents: "05", status: "Online" },
  { id: "11", name: "Sarah Chen", email: "M.Sterling@Anexus.lo", subscription: "Premium Plan", incidents: "05", status: "Online" },
  { id: "12", name: "Sarah Chen", email: "M.Sterling@Anexus.lo", subscription: "Basic Plan", incidents: "05", status: "Online" },
  { id: "13", name: "Sarah Chen", email: "M.Sterling@Anexus.lo", subscription: "Free Tier", incidents: "05", status: "Online" },
  { id: "14", name: "Sarah Chen", email: "M.Sterling@Anexus.lo", subscription: "Premium Plan", incidents: "05", status: "Online" },
  { id: "15", name: "Sarah Chen", email: "M.Sterling@Anexus.lo", subscription: "Free Tier", incidents: "05", status: "Online" },
  { id: "16", name: "Sarah Chen", email: "M.Sterling@Anexus.lo", subscription: "Basic Plan", incidents: "05", status: "Online" },

  { id: "17", name: "Sarah Chen", email: "M.Sterling@Anexus.lo", subscription: "Basic Plan", incidents: "05", status: "Online" },
  { id: "18", name: "Sarah Chen", email: "M.Sterling@Anexus.lo", subscription: "Basic Plan", incidents: "05", status: "Online" },
  { id: "19", name: "Sarah Chen", email: "M.Sterling@Anexus.lo", subscription: "Premium Plan", incidents: "05", status: "Online" },
  { id: "20", name: "Sarah Chen", email: "M.Sterling@Anexus.lo", subscription: "Basic Plan", incidents: "05", status: "Online" },
  { id: "21", name: "Sarah Chen", email: "M.Sterling@Anexus.lo", subscription: "Free Tier", incidents: "05", status: "Online" },
  { id: "22", name: "Sarah Chen", email: "M.Sterling@Anexus.lo", subscription: "Premium Plan", incidents: "05", status: "Online" },
  { id: "23", name: "Sarah Chen", email: "M.Sterling@Anexus.lo", subscription: "Free Tier", incidents: "05", status: "Online" },
  { id: "24", name: "Sarah Chen", email: "M.Sterling@Anexus.lo", subscription: "Basic Plan", incidents: "05", status: "Online" },

  { id: "25", name: "Sarah Chen", email: "M.Sterling@Anexus.lo", subscription: "Basic Plan", incidents: "05", status: "Online" },
  { id: "26", name: "Sarah Chen", email: "M.Sterling@Anexus.lo", subscription: "Basic Plan", incidents: "05", status: "Online" },
  { id: "27", name: "Sarah Chen", email: "M.Sterling@Anexus.lo", subscription: "Premium Plan", incidents: "05", status: "Online" },
  { id: "28", name: "Sarah Chen", email: "M.Sterling@Anexus.lo", subscription: "Basic Plan", incidents: "05", status: "Online" },
  { id: "29", name: "Sarah Chen", email: "M.Sterling@Anexus.lo", subscription: "Free Tier", incidents: "05", status: "Online" },
  { id: "30", name: "Sarah Chen", email: "M.Sterling@Anexus.lo", subscription: "Premium Plan", incidents: "05", status: "Online" },
  { id: "31", name: "Sarah Chen", email: "M.Sterling@Anexus.lo", subscription: "Free Tier", incidents: "05", status: "Online" },
  { id: "32", name: "Sarah Chen", email: "M.Sterling@Anexus.lo", subscription: "Basic Plan", incidents: "05", status: "Online" },
];

export default function CitizenManagementPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [citizens, setCitizens] = useState<Citizen[]>(mockData);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSaveUser = (data: UserFormData) => {
    const newCitizen: Citizen = {
      id: String(citizens.length + 1),
      name: data.name,
      email: data.email,
      subscription: "Basic Plan",
      incidents: data.incident || "00",
      status: (data.status as Citizen["status"]) || "Offline",
    };
    setCitizens((prev) => [newCitizen, ...prev]);
    setCurrentPage(1);
  };

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
        <button className="p-2 text-slate-400 hover:text-[#1554ad] rounded-full hover:bg-slate-100 transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      ),
      className: "text-right",
    },
  ];

  return (
    <div className="flex flex-col gap-8 ">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">Citizens Management</h1>
        <p className="text-slate-500 mt-1">
          Monitor account statuses and incident volumes across all jurisdictions.
        </p>
      </div>

      <div className="bg-slate-50/50 rounded-2xl p-4 sm:p-6 border border-slate-100">
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <div className="flex-1 w-full">
            <Input
              placeholder="Search institutional records..."
              className="w-full max-w-2xl bg-[#f4f7fa] border-none shadow-none h-12 rounded-xl text-slate-700"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <Select defaultValue="status">
              <SelectTrigger className="w-full sm:w-[160px] bg-[#f4f7fa] border-none shadow-none h-10 sm:h-12 rounded-xl">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="status">Status</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={() => setDialogOpen(true)}
              className="bg-[#1554ad] hover:bg-[#10438a] text-white h-10 sm:h-12 px-3 sm:px-6 rounded-xl shadow-md shadow-[#1554ad]/20 w-full sm:w-auto"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="sm:inline">Add User</span>
            </Button>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={citizens.slice((currentPage - 1) * 10, currentPage * 10)}
          pagination={{
            currentPage,
            totalPages: Math.ceil(citizens.length / 10),
            onPageChange: setCurrentPage,
          }}
        />

        <AddUserDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onSave={handleSaveUser}
          title="Add New Citizen"
          description="Fill in the citizen's details to register them in the system."
        />
      </div>
    </div>
  );
}
