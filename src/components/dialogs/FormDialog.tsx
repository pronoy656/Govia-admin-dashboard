"use client";

import React, { useState, useEffect } from "react";
import { X, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ─── Field Config ────────────────────────────────────────────────────────────

export type FieldType = "text" | "email" | "select" | "tel";

export type FieldConfig = {
  key: string;
  label: string;
  placeholder?: string;
  type?: FieldType;
  icon?: React.ReactNode;
  required?: boolean;
  options?: string[]; // only for type="select"
};

// ─── Props ───────────────────────────────────────────────────────────────────

type FormDialogProps = {
  open: boolean;
  onClose: () => void;
  onSave: (data: Record<string, string>) => void;
  title?: string;
  description?: string;
  fields: FieldConfig[];
  saveLabel?: string;
  defaultValues?: Record<string, string>;
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function FormDialog({
  open,
  onClose,
  onSave,
  title = "Add Entry",
  description = "Fill in the details below and click Save.",
  fields,
  saveLabel = "Save",
  defaultValues = {},
}: FormDialogProps) {
  const blank = () =>
    Object.fromEntries(fields.map((f) => [f.key, defaultValues[f.key] ?? ""]));

  const [form, setForm] = useState<Record<string, string>>(blank());
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open) {
      setForm(blank());
      setErrors({});
    }
  }, [open]);

  const validate = () => {
    const next: Record<string, string> = {};
    fields.forEach((f) => {
      if (f.required === false) return;
      const val = form[f.key]?.trim() ?? "";
      if (!val) {
        next[f.key] = `${f.label} is required`;
      } else if (f.type === "email" && !/\S+@\S+\.\S+/.test(val)) {
        next[f.key] = "Enter a valid email address";
      }
    });
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (key: string, value: string) => {
    setForm((p) => ({ ...p, [key]: value }));
    if (errors[key]) setErrors((p) => ({ ...p, [key]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(form);
    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-3 sm:mx-4 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* ── Header ── */}
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

        {/* ── Body ── */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 flex flex-col gap-4">
          {fields.map((field) => (
            <div key={field.key} className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                {field.icon && <span className="text-[#1554ad]">{field.icon}</span>}
                {field.label}
              </label>

              {field.type === "select" ? (
                <Select
                  value={form[field.key]}
                  onValueChange={(value) => handleChange(field.key, value)}
                >
                  <SelectTrigger className={cn(
                    "w-full px-3 sm:px-4 py-2.5 rounded-xl border text-slate-800 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#1554ad]/20 focus:border-[#1554ad] transition-all",
                    errors[field.key] ? "border-red-400 bg-red-50" : "border-slate-200"
                  )}>
                    <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((opt) => (
                      <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <input
                  type={field.type ?? "text"}
                  value={form[field.key]}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  placeholder={field.placeholder ?? `Enter ${field.label.toLowerCase()}`}
                  className={cn(
                    "w-full px-3 sm:px-4 py-2.5 rounded-xl border text-slate-800 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#1554ad]/20 focus:border-[#1554ad] transition-all placeholder:text-slate-400",
                    errors[field.key] ? "border-red-400 bg-red-50" : "border-slate-200"
                  )}
                />
              )}

              {errors[field.key] && (
                <p className="text-xs text-red-500">{errors[field.key]}</p>
              )}
            </div>
          ))}

          {/* ── Actions ── */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-3 border-t border-slate-100 mt-1">
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
              {saveLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
