"use client";

import React, { useState, useEffect } from "react";
import { X, Gift, Building2, Users, CalendarDays, Clock, StickyNote, CreditCard, Save, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export type GiftCodeFormData = {
  codeName: string;
  subscriptionPlan: string;
  organization: string;
  numberOfUsers: string;
  expirationDate: string;
  accessDuration: string;
  notes: string;
};

type GenerateGiftCodeDialogProps = {
  open: boolean;
  onClose: () => void;
  onSave: (data: GiftCodeFormData) => void;
};

const PLAN_OPTIONS = ["Basic Plan", "Premium Plan", "Enterprise Plan", "Free Tier"];

function generateCode() {
  const seg = () => Math.random().toString(36).substring(2, 6).toUpperCase();
  return `GIFT-${seg()}-${seg()}`;
}

export default function GenerateGiftCodeDialog({ open, onClose, onSave }: GenerateGiftCodeDialogProps) {
  const emptyForm = (): GiftCodeFormData => ({
    codeName: "",
    subscriptionPlan: "",
    organization: "",
    numberOfUsers: "",
    expirationDate: "",
    accessDuration: "",
    notes: "",
  });

  const [form, setForm] = useState<GiftCodeFormData>(emptyForm());
  const [errors, setErrors] = useState<Partial<Record<keyof GiftCodeFormData, string>>>({});
  const [previewCode, setPreviewCode] = useState(generateCode());

  useEffect(() => {
    if (open) {
      setForm(emptyForm());
      setErrors({});
      setPreviewCode(generateCode());
    }
  }, [open]);

  const required: (keyof GiftCodeFormData)[] = [
    "codeName", "subscriptionPlan", "organization", "numberOfUsers", "expirationDate", "accessDuration",
  ];

  const validate = () => {
    const next: Partial<Record<keyof GiftCodeFormData, string>> = {};
    required.forEach((k) => {
      if (!form[k].trim()) next[k] = "This field is required";
    });
    if (form.numberOfUsers && isNaN(Number(form.numberOfUsers))) {
      next.numberOfUsers = "Must be a number";
    }
    if (form.accessDuration && isNaN(Number(form.accessDuration))) {
      next.accessDuration = "Must be a number";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const set = (key: keyof GiftCodeFormData, value: string) => {
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

  const inputCls = (key: keyof GiftCodeFormData) =>
    cn(
      "w-full px-4 py-2.5 rounded-xl border text-slate-800 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#1554ad]/20 focus:border-[#1554ad] transition-all placeholder:text-slate-400",
      errors[key] ? "border-red-400 bg-red-50" : "border-slate-200"
    );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="bg-gradient-to-r from-[#1554ad] to-[#1e6fd9] px-6 py-5 flex items-start justify-between shrink-0">
          <div>
            <h2 className="text-white font-bold text-xl flex items-center gap-2">
              <Gift className="w-5 h-5" /> Generate Gift Code
            </h2>
            <p className="text-blue-100 text-sm mt-1">Configure and issue a new gift code for an organization.</p>
          </div>
          <button onClick={onClose} className="text-blue-200 hover:text-white p-1 rounded-lg hover:bg-white/10 mt-0.5 shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Code Preview Banner */}
        <div className="bg-blue-50 border-b border-blue-100 px-6 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#1554ad]" />
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Generated Code</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono font-bold text-[#1554ad] text-base tracking-widest">{previewCode}</span>
            <button
              type="button"
              onClick={() => setPreviewCode(generateCode())}
              className="text-xs text-slate-500 hover:text-[#1554ad] transition-colors border border-slate-200 px-2 py-1 rounded-lg hover:border-[#1554ad]/40"
            >
              Regenerate
            </button>
          </div>
        </div>

        {/* Form Body - Scrollable */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 overflow-y-auto flex-1">

          {/* Row 1: Code Name + Plan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Gift className="w-4 h-4 text-[#1554ad]" /> Gift Code Name
              </label>
              <input
                type="text"
                value={form.codeName}
                onChange={(e) => set("codeName", e.target.value)}
                placeholder="e.g. Police Q1 Pack"
                className={inputCls("codeName")}
              />
              {errors.codeName && <p className="text-xs text-red-500">{errors.codeName}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#1554ad]" /> Select Subscription Plan
              </label>
              <select
                value={form.subscriptionPlan}
                onChange={(e) => set("subscriptionPlan", e.target.value)}
                className={cn(inputCls("subscriptionPlan"), "cursor-pointer")}
              >
                <option value="" disabled>Select a plan</option>
                {PLAN_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
              {errors.subscriptionPlan && <p className="text-xs text-red-500">{errors.subscriptionPlan}</p>}
            </div>
          </div>

          {/* Organization */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#1554ad]" /> Organization / Company Name
            </label>
            <input
              type="text"
              value={form.organization}
              onChange={(e) => set("organization", e.target.value)}
              placeholder="e.g. City Police Department"
              className={inputCls("organization")}
            />
            {errors.organization && <p className="text-xs text-red-500">{errors.organization}</p>}
          </div>

          {/* Row 3: Users + Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Users className="w-4 h-4 text-[#1554ad]" /> Number of Users
              </label>
              <input
                type="number"
                min="1"
                value={form.numberOfUsers}
                onChange={(e) => set("numberOfUsers", e.target.value)}
                placeholder="e.g. 50"
                className={inputCls("numberOfUsers")}
              />
              {errors.numberOfUsers && <p className="text-xs text-red-500">{errors.numberOfUsers}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#1554ad]" /> Access Duration (Months)
              </label>
              <input
                type="number"
                min="1"
                value={form.accessDuration}
                onChange={(e) => set("accessDuration", e.target.value)}
                placeholder="e.g. 12"
                className={inputCls("accessDuration")}
              />
              {errors.accessDuration && <p className="text-xs text-red-500">{errors.accessDuration}</p>}
            </div>
          </div>

          {/* Expiration Date */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-[#1554ad]" /> Expiration Date
            </label>
            <input
              type="date"
              value={form.expirationDate}
              onChange={(e) => set("expirationDate", e.target.value)}
              className={inputCls("expirationDate")}
            />
            {errors.expirationDate && <p className="text-xs text-red-500">{errors.expirationDate}</p>}
          </div>

          {/* Notes */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <StickyNote className="w-4 h-4 text-[#1554ad]" /> Notes / Description
              <span className="text-xs font-normal text-slate-400">(optional)</span>
            </label>
            <textarea
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="Add any relevant notes about this gift code..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#1554ad]/20 focus:border-[#1554ad] transition-all placeholder:text-slate-400 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 mt-1 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1554ad] hover:bg-[#11438a] text-white text-sm font-semibold transition-colors shadow-md shadow-[#1554ad]/20"
            >
              <Save className="w-4 h-4" />
              Generate & Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
