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
import { Plus, User, Mail, Hash, Swords } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import FormDialog from "@/components/dialogs/FormDialog";

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

  { id: "6", name: "Officer John Doe", email: "j.doe@police.dept", badgeNumber: "B-1045", encounters: "124", rating: "4.8/5.0" },
  { id: "7", name: "Officer Jane Smith", email: "j.smith@police.dept", badgeNumber: "B-2033", encounters: "98", rating: "4.9/5.0" },
  { id: "8", name: "Officer Mike Ross", email: "m.ross@police.dept", badgeNumber: "B-1102", encounters: "45", rating: "4.5/5.0" },
  { id: "9", name: "Officer Sarah Connor", email: "s.connor@police.dept", badgeNumber: "B-9980", encounters: "210", rating: "4.7/5.0" },
  { id: "10", name: "Officer David Clark", email: "d.clark@police.dept", badgeNumber: "B-3341", encounters: "15", rating: "4.2/5.0" },

  { id: "11", name: "Officer John Doe", email: "j.doe@police.dept", badgeNumber: "B-1045", encounters: "124", rating: "4.8/5.0" },
  { id: "12", name: "Officer Jane Smith", email: "j.smith@police.dept", badgeNumber: "B-2033", encounters: "98", rating: "4.9/5.0" },
  { id: "13", name: "Officer Mike Ross", email: "m.ross@police.dept", badgeNumber: "B-1102", encounters: "45", rating: "4.5/5.0" },
  { id: "14", name: "Officer Sarah Connor", email: "s.connor@police.dept", badgeNumber: "B-9980", encounters: "210", rating: "4.7/5.0" },
  { id: "15", name: "Officer David Clark", email: "d.clark@police.dept", badgeNumber: "B-3341", encounters: "15", rating: "4.2/5.0" },

  { id: "16", name: "Officer John Doe", email: "j.doe@police.dept", badgeNumber: "B-1045", encounters: "124", rating: "4.8/5.0" },
  { id: "17", name: "Officer Jane Smith", email: "j.smith@police.dept", badgeNumber: "B-2033", encounters: "98", rating: "4.9/5.0" },
  { id: "18", name: "Officer Mike Ross", email: "m.ross@police.dept", badgeNumber: "B-1102", encounters: "45", rating: "4.5/5.0" },
  { id: "19", name: "Officer Sarah Connor", email: "s.connor@police.dept", badgeNumber: "B-9980", encounters: "210", rating: "4.7/5.0" },
  { id: "20", name: "Officer David Clark", email: "d.clark@police.dept", badgeNumber: "B-3341", encounters: "15", rating: "4.2/5.0" },
];

const OFFICER_FIELDS = [
  { key: "name",        label: "Officer Name",  type: "text"  as const, icon: <User className="w-4 h-4" /> },
  { key: "email",       label: "Email",         type: "email" as const, icon: <Mail className="w-4 h-4" /> },
  { key: "badgeNumber", label: "Badge Number",  type: "text"  as const, icon: <Hash className="w-4 h-4" />, placeholder: "e.g. B-1045" },
  { key: "encounters",  label: "Encounters",    type: "text"  as const, icon: <Swords className="w-4 h-4" />, placeholder: "e.g. 42", required: false },
];

export default function PoliceManagementPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [officers, setOfficers] = useState<PoliceOfficer[]>(mockData);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSave = (data: Record<string, string>) => {
    const entry: PoliceOfficer = {
      id: String(officers.length + 1),
      name: data.name,
      email: data.email,
      badgeNumber: data.badgeNumber,
      encounters: data.encounters || "0",
      rating: "N/A",
    };
    setOfficers((p) => [entry, ...p]);
    setCurrentPage(1);
  };

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
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">Police Management</h1>
        <p className="text-slate-500 mt-1">
          Monitor police officer encounters and ratings.
        </p>
      </div>

      <div className="bg-slate-50/50 rounded-2xl p-4 sm:p-6 border border-slate-100">
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <div className="flex-1 w-full">
            <Input
              placeholder="Search officer records..."
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => setDialogOpen(true)} className="bg-[#1554ad] hover:bg-[#10438a] text-white h-10 sm:h-12 px-3 sm:px-6 rounded-xl shadow-md shadow-[#1554ad]/20 w-full sm:w-auto">
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="sm:inline">Add Officer</span>
            </Button>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={officers.slice((currentPage - 1) * 10, currentPage * 10)}
          pagination={{
            currentPage,
            totalPages: Math.ceil(officers.length / 10),
            onPageChange: setCurrentPage,
          }}
        />

        <FormDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onSave={handleSave}
          title="Add New Officer"
          description="Register a new officer into the police management system."
          fields={OFFICER_FIELDS}
          saveLabel="Save Officer"
        />
      </div>
    </div>
  );
}
