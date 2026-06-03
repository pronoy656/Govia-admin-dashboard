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

type MHP = {
  id: string;
  name: string;
  email: string;
  hipaaId: string;
  liveStatus: "Active" | "Inactive";
};

const mockData: MHP[] = [
  { id: "1", name: "Dr. Sarah Jenkins", email: "s.jenkins@mhp.org", hipaaId: "H-88219", liveStatus: "Active" },
  { id: "2", name: "Dr. Alan Grant", email: "a.grant@mhp.org", hipaaId: "H-12490", liveStatus: "Inactive" },
  { id: "3", name: "Dr. Ellie Sattler", email: "e.sattler@mhp.org", hipaaId: "H-44912", liveStatus: "Active" },
  { id: "4", name: "Dr. Ian Malcolm", email: "i.malcolm@mhp.org", hipaaId: "H-33211", liveStatus: "Active" },
  { id: "5", name: "Dr. John Hammond", email: "j.hammond@mhp.org", hipaaId: "H-99100", liveStatus: "Inactive" },

  { id: "6", name: "Dr. Sarah Jenkins", email: "s.jenkins@mhp.org", hipaaId: "H-88219", liveStatus: "Active" },
  { id: "7", name: "Dr. Alan Grant", email: "a.grant@mhp.org", hipaaId: "H-12490", liveStatus: "Inactive" },
  { id: "8", name: "Dr. Ellie Sattler", email: "e.sattler@mhp.org", hipaaId: "H-44912", liveStatus: "Active" },
  { id: "9", name: "Dr. Ian Malcolm", email: "i.malcolm@mhp.org", hipaaId: "H-33211", liveStatus: "Active" },
  { id: "10", name: "Dr. John Hammond", email: "j.hammond@mhp.org", hipaaId: "H-99100", liveStatus: "Inactive" },

  { id: "11", name: "Dr. Sarah Jenkins", email: "s.jenkins@mhp.org", hipaaId: "H-88219", liveStatus: "Active" },
  { id: "12", name: "Dr. Alan Grant", email: "a.grant@mhp.org", hipaaId: "H-12490", liveStatus: "Inactive" },
  { id: "13", name: "Dr. Ellie Sattler", email: "e.sattler@mhp.org", hipaaId: "H-44912", liveStatus: "Active" },
  { id: "14", name: "Dr. Ian Malcolm", email: "i.malcolm@mhp.org", hipaaId: "H-33211", liveStatus: "Active" },
  { id: "15", name: "Dr. John Hammond", email: "j.hammond@mhp.org", hipaaId: "H-99100", liveStatus: "Inactive" },

  { id: "16", name: "Dr. Sarah Jenkins", email: "s.jenkins@mhp.org", hipaaId: "H-88219", liveStatus: "Active" },
  { id: "17", name: "Dr. Alan Grant", email: "a.grant@mhp.org", hipaaId: "H-12490", liveStatus: "Inactive" },
  { id: "18", name: "Dr. Ellie Sattler", email: "e.sattler@mhp.org", hipaaId: "H-44912", liveStatus: "Active" },
  { id: "19", name: "Dr. Ian Malcolm", email: "i.malcolm@mhp.org", hipaaId: "H-33211", liveStatus: "Active" },
  { id: "20", name: "Dr. John Hammond", email: "j.hammond@mhp.org", hipaaId: "H-99100", liveStatus: "Inactive" },
];

export default function MHPManagementPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const columns: ColumnDef<MHP>[] = [
    {
      header: "MHP Name",
      accessorKey: "name",
      className: "text-[#1554ad]",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "HIPAA ID",
      accessorKey: "hipaaId",
    },
    {
      header: "Live Status",
      cell: (item) => (
        <Badge
          variant="secondary"
          className={`font-normal shadow-none border-none ${item.liveStatus === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
            }`}
        >
          {item.liveStatus}
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
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">MHP Management</h1>
        <p className="text-slate-500 mt-1">
          Monitor Mental Health Professionals and their statuses.
        </p>
      </div>

      <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100">
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <div className="flex-1 w-full">
            <Input
              placeholder="Search MHP records..."
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
              Add MHP
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
    </div>
  );
}
