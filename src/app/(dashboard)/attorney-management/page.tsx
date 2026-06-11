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
import { Plus, User, Mail, MapPin, BadgeCheck, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import FormDialog from "@/components/dialogs/FormDialog";

type Attorney = {
  id: string;
  name: string;
  email: string;
  location: string;
  barId: string;
  zoomSession: string;
};

const mockData: Attorney[] = [
  { id: "1", name: "Attorney Robert Vance", email: "rvance@lawfirm.com", location: "New York, NY", barId: "NY-44021", zoomSession: "Scheduled" },
  { id: "2", name: "Attorney Lisa Ray", email: "lray@lawfirm.com", location: "Los Angeles, CA", barId: "CA-99382", zoomSession: "Completed" },
  { id: "3", name: "Attorney James Bond", email: "jbond@lawfirm.com", location: "London, UK", barId: "UK-007", zoomSession: "Pending" },
  { id: "4", name: "Attorney Emily Blunt", email: "eblunt@lawfirm.com", location: "Chicago, IL", barId: "IL-2234", zoomSession: "Scheduled" },
  { id: "5", name: "Attorney Tom Hardy", email: "thardy@lawfirm.com", location: "Miami, FL", barId: "FL-1122", zoomSession: "Scheduled" },

  { id: "6", name: "Attorney Robert Vance", email: "rvance@lawfirm.com", location: "New York, NY", barId: "NY-44021", zoomSession: "Scheduled" },
  { id: "7", name: "Attorney Lisa Ray", email: "lray@lawfirm.com", location: "Los Angeles, CA", barId: "CA-99382", zoomSession: "Completed" },
  { id: "8", name: "Attorney James Bond", email: "jbond@lawfirm.com", location: "London, UK", barId: "UK-007", zoomSession: "Pending" },
  { id: "9", name: "Attorney Emily Blunt", email: "eblunt@lawfirm.com", location: "Chicago, IL", barId: "IL-2234", zoomSession: "Scheduled" },
  { id: "10", name: "Attorney Tom Hardy", email: "thardy@lawfirm.com", location: "Miami, FL", barId: "FL-1122", zoomSession: "Scheduled" },

  { id: "11", name: "Attorney Robert Vance", email: "rvance@lawfirm.com", location: "New York, NY", barId: "NY-44021", zoomSession: "Scheduled" },
  { id: "12", name: "Attorney Lisa Ray", email: "lray@lawfirm.com", location: "Los Angeles, CA", barId: "CA-99382", zoomSession: "Completed" },
  { id: "13", name: "Attorney James Bond", email: "jbond@lawfirm.com", location: "London, UK", barId: "UK-007", zoomSession: "Pending" },
  { id: "14", name: "Attorney Emily Blunt", email: "eblunt@lawfirm.com", location: "Chicago, IL", barId: "IL-2234", zoomSession: "Scheduled" },
  { id: "15", name: "Attorney Tom Hardy", email: "thardy@lawfirm.com", location: "Miami, FL", barId: "FL-1122", zoomSession: "Scheduled" },

  { id: "16", name: "Attorney Robert Vance", email: "rvance@lawfirm.com", location: "New York, NY", barId: "NY-44021", zoomSession: "Scheduled" },
  { id: "17", name: "Attorney Lisa Ray", email: "lray@lawfirm.com", location: "Los Angeles, CA", barId: "CA-99382", zoomSession: "Completed" },
  { id: "18", name: "Attorney James Bond", email: "jbond@lawfirm.com", location: "London, UK", barId: "UK-007", zoomSession: "Pending" },
  { id: "19", name: "Attorney Emily Blunt", email: "eblunt@lawfirm.com", location: "Chicago, IL", barId: "IL-2234", zoomSession: "Scheduled" },
  { id: "20", name: "Attorney Tom Hardy", email: "thardy@lawfirm.com", location: "Miami, FL", barId: "FL-1122", zoomSession: "Scheduled" },
];

const ATTORNEY_FIELDS = [
  { key: "name",        label: "Name",         type: "text"   as const, icon: <User className="w-4 h-4" /> },
  { key: "email",       label: "Email",        type: "email"  as const, icon: <Mail className="w-4 h-4" /> },
  { key: "location",    label: "Location",     type: "text"   as const, icon: <MapPin className="w-4 h-4" />, placeholder: "e.g. New York, NY" },
  { key: "barId",       label: "Bar ID",       type: "text"   as const, icon: <BadgeCheck className="w-4 h-4" />, placeholder: "e.g. NY-44021" },
  { key: "zoomSession", label: "Zoom Session", type: "text" as const, icon: <Video className="w-4 h-4" />, placeholder: "Type here" },
];

export default function AttorneyManagementPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [attorneys, setAttorneys] = useState<Attorney[]>(mockData);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSave = (data: Record<string, string>) => {
    const entry: Attorney = {
      id: String(attorneys.length + 1),
      name: data.name,
      email: data.email,
      location: data.location,
      barId: data.barId,
      zoomSession: (data.zoomSession as Attorney["zoomSession"]) || "Pending",
    };
    setAttorneys((p) => [entry, ...p]);
    setCurrentPage(1);
  };

  const columns: ColumnDef<Attorney>[] = [
    {
      header: "Attorney Name",
      accessorKey: "name",
      className: "text-[#1554ad]",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Location",
      accessorKey: "location",
    },
    {
      header: "Bar ID",
      accessorKey: "barId",
    },
    {
      header: "Zoom Session",
      cell: (item) => (
        <Badge
          variant="secondary"
          className={`font-normal shadow-none border-none ${item.zoomSession === "Scheduled" ? "bg-blue-100 text-[#1554ad]" :
              item.zoomSession === "Completed" ? "bg-emerald-100 text-emerald-700" :
                "bg-amber-100 text-amber-700"
            }`}
        >
          {item.zoomSession}
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
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">Attorney Management</h1>
        <p className="text-slate-500 mt-1">
          Monitor attorney records and zoom sessions.
        </p>
      </div>

      <div className="bg-slate-50/50 rounded-2xl p-4 sm:p-6 border border-slate-100">
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <div className="flex-1 w-full">
            <Input
              placeholder="Search attorney records..."
              className="w-full max-w-2xl bg-[#f4f7fa] border-none shadow-none h-12 rounded-xl text-slate-700"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <Select defaultValue="status">
              <SelectTrigger className="w-full sm:w-[160px] bg-[#f4f7fa] border-none shadow-none h-10 sm:h-12 rounded-xl">
                <SelectValue placeholder="Session Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="status">Session Status</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => setDialogOpen(true)} className="bg-[#1554ad] hover:bg-[#10438a] text-white h-10 sm:h-12 px-3 sm:px-6 rounded-xl shadow-md shadow-[#1554ad]/20 w-full sm:w-auto">
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="sm:inline">Add Attorney</span>
            </Button>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={attorneys.slice((currentPage - 1) * 10, currentPage * 10)}
          pagination={{
            currentPage,
            totalPages: Math.ceil(attorneys.length / 10),
            onPageChange: setCurrentPage,
          }}
        />

        <FormDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onSave={handleSave}
          title="Add New Attorney"
          description="Register a new attorney in the system."
          fields={ATTORNEY_FIELDS}
          saveLabel="Save Attorney"
        />
      </div>
    </div>
  );
}
