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
import GenerateGiftCodeDialog, { GiftCodeFormData } from "@/components/dialogs/GenerateGiftCodeDialog";

type GiftCode = {
  id: string;
  codeId: string;
  organization: string;
  status: "Active" | "Expired" | "Redeemed";
  expDate: string;
};

const mockData: GiftCode[] = [
  { id: "1", codeId: "GIFT-A1B2-C3D4", organization: "City Police Dept", status: "Active", expDate: "2026-12-31" },
  { id: "2", codeId: "GIFT-E5F6-G7H8", organization: "County Court", status: "Redeemed", expDate: "2026-05-15" },
  { id: "3", codeId: "GIFT-I9J0-K1L2", organization: "Mental Health Assoc", status: "Active", expDate: "2027-01-30" },
  { id: "4", codeId: "GIFT-M3N4-O5P6", organization: "State Troopers", status: "Expired", expDate: "2025-12-31" },
  { id: "5", codeId: "GIFT-Q7R8-S9T0", organization: "City Police Dept", status: "Active", expDate: "2026-12-31" },

  { id: "6", codeId: "GIFT-A1B2-C3D4", organization: "City Police Dept", status: "Active", expDate: "2026-12-31" },
  { id: "7", codeId: "GIFT-E5F6-G7H8", organization: "County Court", status: "Redeemed", expDate: "2026-05-15" },
  { id: "8", codeId: "GIFT-I9J0-K1L2", organization: "Mental Health Assoc", status: "Active", expDate: "2027-01-30" },
  { id: "9", codeId: "GIFT-M3N4-O5P6", organization: "State Troopers", status: "Expired", expDate: "2025-12-31" },
  { id: "10", codeId: "GIFT-Q7R8-S9T0", organization: "City Police Dept", status: "Active", expDate: "2026-12-31" },

  { id: "11", codeId: "GIFT-A1B2-C3D4", organization: "City Police Dept", status: "Active", expDate: "2026-12-31" },
  { id: "12", codeId: "GIFT-E5F6-G7H8", organization: "County Court", status: "Redeemed", expDate: "2026-05-15" },
  { id: "13", codeId: "GIFT-I9J0-K1L2", organization: "Mental Health Assoc", status: "Active", expDate: "2027-01-30" },
  { id: "14", codeId: "GIFT-M3N4-O5P6", organization: "State Troopers", status: "Expired", expDate: "2025-12-31" },
  { id: "15", codeId: "GIFT-Q7R8-S9T0", organization: "City Police Dept", status: "Active", expDate: "2026-12-31" },

  { id: "16", codeId: "GIFT-A1B2-C3D4", organization: "City Police Dept", status: "Active", expDate: "2026-12-31" },
  { id: "17", codeId: "GIFT-E5F6-G7H8", organization: "County Court", status: "Redeemed", expDate: "2026-05-15" },
  { id: "18", codeId: "GIFT-I9J0-K1L2", organization: "Mental Health Assoc", status: "Active", expDate: "2027-01-30" },
  { id: "19", codeId: "GIFT-M3N4-O5P6", organization: "State Troopers", status: "Expired", expDate: "2025-12-31" },
  { id: "20", codeId: "GIFT-Q7R8-S9T0", organization: "City Police Dept", status: "Active", expDate: "2026-12-31" },
];

export default function GiftCodeManagementPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleGenerateCode = (data: GiftCodeFormData) => {
    console.log("Generating gift code with data:", data);
    // In a real app, you would send this to your API
  };

  const columns: ColumnDef<GiftCode>[] = [
    {
      header: "Gift Code ID",
      accessorKey: "codeId",
      className: "text-[#1554ad] font-mono",
    },
    {
      header: "Organization",
      accessorKey: "organization",
    },
    {
      header: "Status",
      cell: (item) => (
        <Badge
          variant="secondary"
          className={`font-normal shadow-none border-none ${item.status === "Active" ? "bg-emerald-100 text-emerald-700" :
              item.status === "Redeemed" ? "bg-blue-100 text-[#1554ad]" :
                "bg-slate-100 text-slate-600"
            }`}
        >
          {item.status}
        </Badge>
      ),
    },
    {
      header: "EXP. Date",
      accessorKey: "expDate",
      className: "text-slate-500",
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
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Gift Code Management</h1>
        <p className="text-slate-500 mt-1">
          Manage organizational gift codes and their statuses.
        </p>
      </div>

      <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100">
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <div className="flex-1 w-full">
            <Input
              placeholder="Search by code or organization..."
              className="max-w-2xl bg-[#f4f7fa] border-none shadow-none h-12 rounded-xl text-slate-700"
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Select defaultValue="status">
              <SelectTrigger className="w-[160px] bg-[#f4f7fa] border-none shadow-none h-12 rounded-xl">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="status">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="redeemed">Redeemed</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              onClick={() => setIsDialogOpen(true)}
              className="bg-[#1554ad] hover:bg-[#10438a] text-white h-12 px-6 rounded-xl shadow-md shadow-[#1554ad]/20"
            >
              <Plus className="w-5 h-5 mr-2" />
              Generate Code
            </Button>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={mockData.slice((currentPage - 1) * 10, currentPage * 10)}
          pagination={{
            currentPage,
            totalPages: Math.ceil(mockData.length / 10),
            onPageChange: setCurrentPage,
          }}
        />
      </div>

      <GenerateGiftCodeDialog 
        open={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
        onSave={handleGenerateCode} 
      />
    </div>
  );
}
