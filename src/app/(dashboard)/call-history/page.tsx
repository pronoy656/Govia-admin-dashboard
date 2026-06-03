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

type CallHistory = {
  id: string;
  incidentId: string;
  citizen: string;
  officer: string;
  attorney: string;
  mhp: string;
  time: string;
};

const mockData: CallHistory[] = [
  { id: "1", incidentId: "INC-20260601-A1", citizen: "Sarah Chen", officer: "John Doe", attorney: "Robert Vance", mhp: "Dr. Sarah Jenkins", time: "10:23 AM" },
  { id: "2", incidentId: "INC-20260601-B4", citizen: "Michael Smith", officer: "Jane Smith", attorney: "Lisa Ray", mhp: "-", time: "11:45 AM" },
  { id: "3", incidentId: "INC-20260602-C2", citizen: "Emma Watson", officer: "Mike Ross", attorney: "-", mhp: "Dr. Alan Grant", time: "01:15 PM" },
  { id: "4", incidentId: "INC-20260602-D9", citizen: "Liam Neeson", officer: "Sarah Connor", attorney: "James Bond", mhp: "Dr. Ellie Sattler", time: "03:30 PM" },
  { id: "5", incidentId: "INC-20260603-E5", citizen: "Olivia Pope", officer: "David Clark", attorney: "Emily Blunt", mhp: "-", time: "09:00 AM" },

  { id: "6", incidentId: "INC-20260601-A1", citizen: "Sarah Chen", officer: "John Doe", attorney: "Robert Vance", mhp: "Dr. Sarah Jenkins", time: "10:23 AM" },
  { id: "7", incidentId: "INC-20260601-B4", citizen: "Michael Smith", officer: "Jane Smith", attorney: "Lisa Ray", mhp: "-", time: "11:45 AM" },
  { id: "8", incidentId: "INC-20260602-C2", citizen: "Emma Watson", officer: "Mike Ross", attorney: "-", mhp: "Dr. Alan Grant", time: "01:15 PM" },
  { id: "9", incidentId: "INC-20260602-D9", citizen: "Liam Neeson", officer: "Sarah Connor", attorney: "James Bond", mhp: "Dr. Ellie Sattler", time: "03:30 PM" },
  { id: "10", incidentId: "INC-20260603-E5", citizen: "Olivia Pope", officer: "David Clark", attorney: "Emily Blunt", mhp: "-", time: "09:00 AM" },

  { id: "11", incidentId: "INC-20260601-A1", citizen: "Sarah Chen", officer: "John Doe", attorney: "Robert Vance", mhp: "Dr. Sarah Jenkins", time: "10:23 AM" },
  { id: "12", incidentId: "INC-20260601-B4", citizen: "Michael Smith", officer: "Jane Smith", attorney: "Lisa Ray", mhp: "-", time: "11:45 AM" },
  { id: "13", incidentId: "INC-20260602-C2", citizen: "Emma Watson", officer: "Mike Ross", attorney: "-", mhp: "Dr. Alan Grant", time: "01:15 PM" },
  { id: "14", incidentId: "INC-20260602-D9", citizen: "Liam Neeson", officer: "Sarah Connor", attorney: "James Bond", mhp: "Dr. Ellie Sattler", time: "03:30 PM" },
  { id: "15", incidentId: "INC-20260603-E5", citizen: "Olivia Pope", officer: "David Clark", attorney: "Emily Blunt", mhp: "-", time: "09:00 AM" },

  { id: "16", incidentId: "INC-20260601-A1", citizen: "Sarah Chen", officer: "John Doe", attorney: "Robert Vance", mhp: "Dr. Sarah Jenkins", time: "10:23 AM" },
  { id: "17", incidentId: "INC-20260601-B4", citizen: "Michael Smith", officer: "Jane Smith", attorney: "Lisa Ray", mhp: "-", time: "11:45 AM" },
  { id: "18", incidentId: "INC-20260602-C2", citizen: "Emma Watson", officer: "Mike Ross", attorney: "-", mhp: "Dr. Alan Grant", time: "01:15 PM" },
  { id: "19", incidentId: "INC-20260602-D9", citizen: "Liam Neeson", officer: "Sarah Connor", attorney: "James Bond", mhp: "Dr. Ellie Sattler", time: "03:30 PM" },
  { id: "20", incidentId: "INC-20260603-E5", citizen: "Olivia Pope", officer: "David Clark", attorney: "Emily Blunt", mhp: "-", time: "09:00 AM" },
];

export default function CallHistoryPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const columns: ColumnDef<CallHistory>[] = [
    {
      header: "Incident ID",
      accessorKey: "incidentId",
      className: "text-[#1554ad] font-mono",
    },
    {
      header: "Citizen",
      accessorKey: "citizen",
    },
    {
      header: "Officer",
      accessorKey: "officer",
    },
    {
      header: "Attorney",
      accessorKey: "attorney",
      cell: (item) => <span className={item.attorney === "-" ? "text-slate-300" : ""}>{item.attorney}</span>
    },
    {
      header: "MHP",
      accessorKey: "mhp",
      cell: (item) => <span className={item.mhp === "-" ? "text-slate-300" : ""}>{item.mhp}</span>
    },
    {
      header: "Time",
      accessorKey: "time",
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
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Call History</h1>
        <p className="text-slate-500 mt-1">
          Review past call incidents and connected parties.
        </p>
      </div>

      <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100">
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <div className="flex-1 w-full">
            <Input
              placeholder="Search by incident ID, citizen, or officer..."
              className="max-w-2xl bg-[#f4f7fa] border-none shadow-none h-12 rounded-xl text-slate-700"
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Select defaultValue="all">
              <SelectTrigger className="w-[160px] bg-[#f4f7fa] border-none shadow-none h-12 rounded-xl">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
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
