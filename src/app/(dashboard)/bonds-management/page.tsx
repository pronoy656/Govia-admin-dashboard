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
import { Plus, User, Mail, FileKey } from "lucide-react";
import FormDialog from "@/components/dialogs/FormDialog";

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

  { id: "6", name: "Mike Ehrmantraut", agencyName: "Quick Bail Bonds", licenseId: "L-99821", activeRequest: "3", totalReleases: "145" },
  { id: "7", name: "Saul Goodman", agencyName: "Better Call Saul Bonds", licenseId: "L-44211", activeRequest: "12", totalReleases: "890" },
  { id: "8", name: "Kim Wexler", agencyName: "Wexler Bonds", licenseId: "L-33290", activeRequest: "1", totalReleases: "45" },
  { id: "9", name: "Howard Hamlin", agencyName: "Hamlin Bail Co", licenseId: "L-11002", activeRequest: "0", totalReleases: "230" },
  { id: "10", name: "Chuck McGill", agencyName: "McGill Surety", licenseId: "L-88221", activeRequest: "5", totalReleases: "120" },

  { id: "11", name: "Mike Ehrmantraut", agencyName: "Quick Bail Bonds", licenseId: "L-99821", activeRequest: "3", totalReleases: "145" },
  { id: "12", name: "Saul Goodman", agencyName: "Better Call Saul Bonds", licenseId: "L-44211", activeRequest: "12", totalReleases: "890" },
  { id: "13", name: "Kim Wexler", agencyName: "Wexler Bonds", licenseId: "L-33290", activeRequest: "1", totalReleases: "45" },
  { id: "14", name: "Howard Hamlin", agencyName: "Hamlin Bail Co", licenseId: "L-11002", activeRequest: "0", totalReleases: "230" },
  { id: "15", name: "Chuck McGill", agencyName: "McGill Surety", licenseId: "L-88221", activeRequest: "5", totalReleases: "120" },

  { id: "16", name: "Mike Ehrmantraut", agencyName: "Quick Bail Bonds", licenseId: "L-99821", activeRequest: "3", totalReleases: "145" },
  { id: "17", name: "Saul Goodman", agencyName: "Better Call Saul Bonds", licenseId: "L-44211", activeRequest: "12", totalReleases: "890" },
  { id: "18", name: "Kim Wexler", agencyName: "Wexler Bonds", licenseId: "L-33290", activeRequest: "1", totalReleases: "45" },
  { id: "19", name: "Howard Hamlin", agencyName: "Hamlin Bail Co", licenseId: "L-11002", activeRequest: "0", totalReleases: "230" },
  { id: "20", name: "Chuck McGill", agencyName: "McGill Surety", licenseId: "L-88221", activeRequest: "5", totalReleases: "120" },
];

const BONDSMAN_FIELDS = [
  { key: "name",      label: "Name",       type: "text"  as const, icon: <User className="w-4 h-4" /> },
  { key: "email",     label: "Email",      type: "email" as const, icon: <Mail className="w-4 h-4" /> },
  { key: "licenseId", label: "License ID", type: "text"  as const, icon: <FileKey className="w-4 h-4" />, placeholder: "e.g. L-99821" },
];

export default function BailBondsmanManagementPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [bondsmen, setBondsmen] = useState<Bondsman[]>(mockData);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSave = (data: Record<string, string>) => {
    const entry: Bondsman = {
      id: String(bondsmen.length + 1),
      name: data.name,
      agencyName: "",
      licenseId: data.licenseId,
      activeRequest: "0",
      totalReleases: "0",
    };
    setBondsmen((p) => [entry, ...p]);
    setCurrentPage(1);
  };

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
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">Bail Bondsman Management</h1>
        <p className="text-slate-500 mt-1">
          Monitor bail bondsmen and agency release statistics.
        </p>
      </div>

      <div className="bg-slate-50/50 rounded-2xl p-4 sm:p-6 border border-slate-100">
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <div className="flex-1 w-full">
            <Input
              placeholder="Search bondsman or agency..."
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
              <span className="sm:inline">Add Bondsman</span>
            </Button>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={bondsmen.slice((currentPage - 1) * 10, currentPage * 10)}
          pagination={{
            currentPage,
            totalPages: Math.ceil(bondsmen.length / 10),
            onPageChange: setCurrentPage,
          }}
        />

        <FormDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onSave={handleSave}
          title="Add New Bondsman"
          description="Register a new bail bondsman in the system."
          fields={BONDSMAN_FIELDS}
          saveLabel="Save Bondsman"
        />
      </div>
    </div>
  );
}
