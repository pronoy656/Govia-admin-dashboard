"use client";

import React, { useState, useEffect } from "react";
import { X, User, Mail, Shield, FileText, Save } from "lucide-react";
import { cn } from "@/lib/utils";

export type UserFormData = {
  name: string;
  email: string;
  status: string;
  incident: string;
};

type AddUserDialogProps = {
  open: boolean;
  onClose: () => void;
  onSave: (data: UserFormData) => void;
  title?: string;
  description?: string;
  defaultValues?: Partial<UserFormData>;
  statusOptions?: string[];
};

const defaultStatusOptions = ["Online", "Offline", "Pending", "Suspended"];

export default function AddUserDialog({
  open,
  onClose,
  onSave,
  title = "Add New User",
  description = "Fill in the details below to add a new user to the system.",
  defaultValues,
  statusOptions = defaultStatusOptions,
}: AddUserDialogProps) {
  const [form, setForm] = useState<UserFormData>({
    name: defaultValues?.name ?? "",
    email: defaultValues?.email ?? "",
    status: defaultValues?.status ?? "",
    incident: defaultValues?.incident ?? "",
  });
  const [errors, setErrors] = useState<Partial<UserFormData>>({});

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      setForm({
        name: defaultValues?.name ?? "",
        email: defaultValues?.email ?? "",
        status: defaultValues?.status ?? "",
        incident: defaultValues?.incident ?? "",
      });
      setErrors({});
    }
  }, [open]);

  const validate = (): boolean => {
    const newErrors: Partial<UserFormData> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Enter a valid email";
    if (!form.status) newErrors.status = "Status is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(form);
    onClose();
  };

  const handleChange = (field: keyof UserFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  if (!open) return null;

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Dialog Panel */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-3 sm:mx-4 overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1554ad] to-[#1e6fd9] px-4 sm:px-6 py-4 sm:py-5 flex items-start justify-between">
          <div className="flex-1 pr-3">
            <h2 className="text-white font-bold text-lg sm:text-xl">{title}</h2>
            <p className="text-blue-100 text-xs sm:text-sm mt-1">{description}</p>
          </div>
          <button
            onClick={onClose}
            className="text-blue-200 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10 mt-0.5 shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 flex flex-col gap-5">

          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <User className="w-4 h-4 text-[#1554ad]" /> Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter full name"
              className={cn(
                "w-full px-3 sm:px-4 py-2.5 rounded-xl border text-slate-800 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#1554ad]/20 focus:border-[#1554ad] transition-all placeholder:text-slate-400",
                errors.name ? "border-red-400 bg-red-50" : "border-slate-200"
              )}
            />
            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#1554ad]" /> Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Enter email address"
              className={cn(
                "w-full px-3 sm:px-4 py-2.5 rounded-xl border text-slate-800 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#1554ad]/20 focus:border-[#1554ad] transition-all placeholder:text-slate-400",
                errors.email ? "border-red-400 bg-red-50" : "border-slate-200"
              )}
            />
            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
          </div>

          {/* Status */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#1554ad]" /> Status
            </label>
            <select
              value={form.status}
              onChange={(e) => handleChange("status", e.target.value)}
              className={cn(
                "w-full px-3 sm:px-4 py-2.5 rounded-xl border text-slate-800 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#1554ad]/20 focus:border-[#1554ad] transition-all",
                errors.status ? "border-red-400 bg-red-50" : "border-slate-200"
              )}
            >
              <option value="" disabled>Select status</option>
              {statusOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {errors.status && <p className="text-xs text-red-500">{errors.status}</p>}
          </div>

          {/* Incident */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#1554ad]" /> Incident
            </label>
            <input
              type="text"
              value={form.incident}
              onChange={(e) => handleChange("incident", e.target.value)}
              placeholder="e.g. INC-2024-001 or leave blank"
              className="w-full px-3 sm:px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#1554ad]/20 focus:border-[#1554ad] transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-2 border-t border-slate-100 mt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-4 sm:px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-[#1554ad] hover:bg-[#11438a] text-white text-sm font-semibold transition-colors shadow-md shadow-[#1554ad]/20 w-full sm:w-auto"
            >
              <Save className="w-4 h-4" />
              Save User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
