"use client";

import React, { useState } from "react";
import { CheckCircle2, FileSignature, ShieldCheck, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type SubpoenaRequest = {
  id: string;
  attorneyName: string;
  barId: string;
  timeAgo: string;
  court: string;
  targetAgency: string;
  incidentId: string;
  requestedEvidence: string[];
};

const initialRequests: SubpoenaRequest[] = [
  {
    id: "1",
    attorneyName: "Atty. Jane Ross",
    barId: "CA-789234",
    timeAgo: "2 hours ago",
    court: "Central District Superior Court",
    targetAgency: "Metropolitan Police Department",
    incidentId: "2024-CR-5501",
    requestedEvidence: ["Bodycam", "Dashcam", "Radio Logs", "Audio"],
  },
  {
    id: "2",
    attorneyName: "Atty. Michael Chen",
    barId: "CA-456891",
    timeAgo: "5 hours ago",
    court: "Northern District Circuit Court",
    targetAgency: "State Highway Patrol",
    incidentId: "2024-CR-5498",
    requestedEvidence: ["Dashcam", "Radio Logs"],
  },
  {
    id: "3",
    attorneyName: "Atty. Sarah Williams",
    barId: "CA-123567",
    timeAgo: "8 hours ago",
    court: "Central District Superior Court",
    targetAgency: "County Sheriff's Office",
    incidentId: "2024-CR-5492",
    requestedEvidence: ["Bodycam", "Audio"],
  },
];

export default function SubpoenaPage() {
  const [requests, setRequests] = useState<SubpoenaRequest[]>(initialRequests);

  const handleApprove = (id: string) => {
    // Handle approval logic here
    console.log(`Approved request ${id}`);
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Subpoena Management</h1>
        <p className="text-slate-500 mt-2 text-base">
          Monitor legally signed subpoena requests, verify SHA-256 evidence integrity, and audit court release packages.
        </p>
      </div>

      {/* Main Container */}
      <div className="bg-[#f8f9fa] rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col gap-6 mt-4">
        <h2 className="text-xl font-bold text-[#1e293b]">Incoming Subpoena Queue</h2>

        <div className="flex flex-col gap-4">
          {requests.map((req) => (
            <div key={req.id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col gap-4">
              {/* Header: Name, Bar ID, Time */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-[#1e293b] font-bold text-lg">{req.attorneyName}</h3>
                  <div className="flex items-center gap-1.5 bg-[#eafbf0] text-[#16a34a] px-2.5 py-1 rounded-full text-xs font-semibold">
                    <span>Bar ID: {req.barId}</span>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
                </div>
                <span className="text-slate-400 text-sm whitespace-nowrap">{req.timeAgo}</span>
              </div>

              {/* Details Grid */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="font-medium min-w-[100px]">Court:</span>
                  <span className="text-slate-800">{req.court}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="font-medium min-w-[100px]">Target Agency:</span>
                  <span className="text-slate-800">{req.targetAgency}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="font-medium min-w-[100px]">Incident ID:</span>
                  <span className="text-slate-800">{req.incidentId}</span>
                </div>
              </div>

              {/* Requested Evidence */}
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                <span className="text-sm font-medium text-slate-600">Requested Evidence:</span>
                <div className="flex items-center gap-2 flex-wrap">
                  {req.requestedEvidence.map((evidence, idx) => (
                    <span
                      key={idx}
                      className="bg-[#f0f4fa] text-[#1e293b] text-xs font-medium px-3 py-1.5 rounded-full"
                    >
                      {evidence}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-2">
                <button
                  onClick={() => handleApprove(req.id)}
                  className="flex items-center gap-2 bg-[#1554ad] hover:bg-[#11438a] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors w-fit"
                >
                  <FileSignature className="w-4 h-4" />
                  Approve & Digitally Sign Request
                </button>
              </div>
            </div>
          ))}

          {requests.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
              <ShieldCheck className="w-12 h-12 mb-3 text-slate-300" />
              <p>No pending subpoena requests</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
