"use client";

import React, { useState } from "react";
import {
  MapPin,
  Clock,
  Users,
  Shield,
  Scale,
  HeartPulse,
  Video,
  Radio,
} from "lucide-react";
import { cn } from "@/lib/utils";

type RiskLevel = "Medium Risk" | "Critical Risk" | null;

type Incident = {
  id: string;
  incNumber: string;
  citizenName: string;
  location: string;
  duration: string;
  timeAgo: string;
  riskLevel: RiskLevel;
  isRecording: boolean;
  citizenId: string;
  officerName: string;
  officerBadge: string;
  attorneyStatus: "Joined" | "Pending" | "Not Assigned";
  mhpStatus: "Joined" | "Pending" | "Not Assigned";
  zoomStatus: "Active" | "Pending" | "Ended";
  recordingTime: string;
  startedMinsAgo: number;
};

const incidents: Incident[] = [
  {
    id: "1",
    incNumber: "INC-2847",
    citizenName: "Marcus Johnson",
    location: "Downtown District",
    duration: "00:02:34",
    timeAgo: "2 min ago",
    riskLevel: null,
    isRecording: true,
    citizenId: "CIT-4892",
    officerName: "Officer Blake",
    officerBadge: "7849",
    attorneyStatus: "Joined",
    mhpStatus: "Pending",
    zoomStatus: "Active",
    recordingTime: "02:14",
    startedMinsAgo: 2,
  },
  {
    id: "2",
    incNumber: "INC-2848",
    citizenName: "Sarah Williams",
    location: "East Side Plaza",
    duration: "00:08:12",
    timeAgo: "8 min ago",
    riskLevel: null,
    isRecording: true,
    citizenId: "CIT-3321",
    officerName: "Officer Torres",
    officerBadge: "4421",
    attorneyStatus: "Pending",
    mhpStatus: "Joined",
    zoomStatus: "Active",
    recordingTime: "08:12",
    startedMinsAgo: 8,
  },
  {
    id: "3",
    incNumber: "INC-2849",
    citizenName: "David Chen",
    location: "Central Park Ave",
    duration: "00:15:47",
    timeAgo: "15 min ago",
    riskLevel: "Medium Risk",
    isRecording: true,
    citizenId: "CIT-7801",
    officerName: "Officer Hayes",
    officerBadge: "9910",
    attorneyStatus: "Joined",
    mhpStatus: "Joined",
    zoomStatus: "Active",
    recordingTime: "15:47",
    startedMinsAgo: 15,
  },
  {
    id: "4",
    incNumber: "INC-2844",
    citizenName: "Jennifer Martinez",
    location: "Harbor Street",
    duration: "00:22:19",
    timeAgo: "22 min ago",
    riskLevel: "Critical Risk",
    isRecording: true,
    citizenId: "CIT-2209",
    officerName: "Officer Reed",
    officerBadge: "1122",
    attorneyStatus: "Joined",
    mhpStatus: "Pending",
    zoomStatus: "Pending",
    recordingTime: "22:19",
    startedMinsAgo: 22,
  },
];

function statusColor(status: string) {
  if (status === "Joined" || status === "Active") return "text-emerald-600";
  if (status === "Pending") return "text-amber-500";
  return "text-slate-400";
}

function statusBg(status: string) {
  if (status === "Joined" || status === "Active") return "bg-emerald-50 border-emerald-100";
  if (status === "Pending") return "bg-amber-50 border-amber-100";
  return "bg-slate-50 border-slate-100";
}

export default function LiveCallMonitoringPage() {
  const [selectedId, setSelectedId] = useState<string>("1");
  const selected = incidents.find((i) => i.id === selectedId) ?? incidents[0];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
        Live Call Monitoring
      </h1>

      <div className="flex gap-5 items-start">
        {/* Left: Active Incidents list */}
        <div className="w-[340px] shrink-0 bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-slate-800 text-base">Active Incidents</h2>
            <span className="bg-blue-100 text-[#1554ad] text-xs font-semibold px-3 py-1 rounded-full">
              {incidents.length} Live
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {incidents.map((inc) => {
              const isSelected = selectedId === inc.id;
              return (
                <button
                  key={inc.id}
                  onClick={() => setSelectedId(inc.id)}
                  className={cn(
                    "w-full text-left rounded-xl border p-4 flex flex-col gap-2 transition-all cursor-pointer",
                    isSelected
                      ? "border-[#1554ad] bg-blue-50/50 shadow-md shadow-[#1554ad]/10"
                      : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "text-xs font-bold px-2 py-0.5 rounded-md",
                          inc.riskLevel === "Critical Risk"
                            ? "bg-red-100 text-red-600"
                            : "bg-blue-100 text-[#1554ad]"
                        )}
                      >
                        {inc.incNumber}
                      </span>
                      <span
                        className={cn(
                          "w-2 h-2 rounded-full animate-pulse",
                          inc.riskLevel === "Critical Risk"
                            ? "bg-red-500"
                            : inc.riskLevel === "Medium Risk"
                            ? "bg-amber-500"
                            : "bg-[#1554ad]"
                        )}
                      />
                    </div>
                    <span className="text-xs text-slate-400">{inc.timeAgo}</span>
                  </div>

                  <p className="font-bold text-slate-800 text-base">{inc.citizenName}</p>

                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {inc.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {inc.duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {inc.riskLevel && (
                      <span
                        className={cn(
                          "text-xs font-semibold px-2 py-0.5 rounded-md",
                          inc.riskLevel === "Critical Risk"
                            ? "bg-red-100 text-red-600"
                            : "bg-amber-100 text-amber-600"
                        )}
                      >
                        {inc.riskLevel}
                      </span>
                    )}
                    {inc.isRecording && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-600">
                        Recording
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Case Detail */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-[#1554ad] px-6 py-4 flex items-center justify-between">
            <h2 className="text-white font-bold text-lg">Case Number-{selected.incNumber.split("-")[1]}</h2>
            <div className="flex items-center gap-2 text-blue-200 text-sm">
              <Clock className="w-4 h-4" />
              <span>Started {selected.startedMinsAgo} minutes ago</span>
            </div>
          </div>

          <div className="p-6 flex flex-col gap-5">
            {/* Citizen & Officer Info */}
            <div className="grid grid-cols-2 gap-4">
              {/* Citizen */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-wide mb-3">
                  <Users className="w-4 h-4" />
                  Citizen Information
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {selected.citizenName.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{selected.citizenName}</p>
                    <p className="text-xs text-slate-500">ID: {selected.citizenId}</p>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" />
                      {selected.location}, Block 5
                    </p>
                  </div>
                </div>
              </div>

              {/* Officer */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-wide mb-3">
                  <Shield className="w-4 h-4" />
                  Officer Information
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {selected.officerName.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{selected.officerName}</p>
                    <p className="text-xs text-slate-500">Badge: {selected.officerBadge}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Cards */}
            <div className="grid grid-cols-4 gap-3">
              {/* Attorney */}
              <div className={cn("rounded-xl border p-4 flex flex-col items-center gap-2", statusBg(selected.attorneyStatus))}>
                <Scale className={cn("w-7 h-7", statusColor(selected.attorneyStatus))} />
                <p className="text-xs font-semibold text-slate-600">Attorney</p>
                <p className={cn("text-xs font-bold", statusColor(selected.attorneyStatus))}>
                  {selected.attorneyStatus}
                </p>
              </div>

              {/* MHP */}
              <div className={cn("rounded-xl border p-4 flex flex-col items-center gap-2", statusBg(selected.mhpStatus))}>
                <HeartPulse className={cn("w-7 h-7", statusColor(selected.mhpStatus))} />
                <p className="text-xs font-semibold text-slate-600">MHP</p>
                <p className={cn("text-xs font-bold", statusColor(selected.mhpStatus))}>
                  {selected.mhpStatus}
                </p>
              </div>

              {/* Zoom Session */}
              <div className={cn("rounded-xl border p-4 flex flex-col items-center gap-2", statusBg(selected.zoomStatus))}>
                <Video className={cn("w-7 h-7", statusColor(selected.zoomStatus))} />
                <p className="text-xs font-semibold text-slate-600">Zoom Session</p>
                <p className={cn("text-xs font-bold", statusColor(selected.zoomStatus))}>
                  {selected.zoomStatus}
                </p>
              </div>

              {/* Recording */}
              <div className="rounded-xl border border-red-100 bg-red-50 p-4 flex flex-col items-center gap-2">
                <Radio className="w-7 h-7 text-red-500 animate-pulse" />
                <p className="text-xs font-semibold text-slate-600">Recording</p>
                <p className="text-xs font-bold text-red-500">{selected.recordingTime}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
