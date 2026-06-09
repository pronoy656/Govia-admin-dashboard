"use client";

import React, { useState } from "react";
import { TrendingUp, TrendingDown, Target, Plus, Minus, MapPin, Search } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import maps to avoid SSR issues
const RiskRealMap = dynamic(() => import("@/components/maps/RiskRealMap"), { 
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-100 animate-pulse flex items-center justify-center">Loading Real Map...</div>
});

const MapPickerDialog = dynamic(() => import("@/components/maps/MapPickerDialog"), { ssr: false });

/* ───────────── main page ───────────── */
export default function RiskMapPage() {
  const [layers, setLayers] = useState<Record<string, boolean>>({
    "Incident Heatmap": true,
    "Crisis Zones": true,
    "Officer Deployment": false,
  });

  const [riskArea, setRiskArea] = useState("");
  const [coords, setCoords] = useState<{lat: number, lng: number} | null>(null);
  const [isMapDialogOpen, setIsMapDialogOpen] = useState(false);

  const toggleLayer = (key: string) =>
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleLocationSave = (lat: number, lng: number) => {
    setCoords({ lat, lng });
    setRiskArea(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Risk Map & Analytics</h1>
          <p className="text-slate-500 mt-1">Real-time tactical oversight and predictive modeling.</p>
        </div>

        {/* Risk Area Input */}
        <div className="flex flex-col gap-1.5 w-full sm:w-72">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Risk Area Selection</label>
          <div className="relative">
            <input
              type="text"
              readOnly
              value={riskArea}
              onClick={() => setIsMapDialogOpen(true)}
              placeholder="Click to select area..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1554ad]/20 focus:border-[#1554ad] cursor-pointer transition-all"
            />
            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100" style={{ height: 500 }}>
        <RiskRealMap layers={layers} />

        {/* Layers Panel */}
        <div className="absolute top-4 left-4 bg-white rounded-xl shadow-lg p-4 flex flex-col gap-2 min-w-[180px]">
          <p className="text-xs font-bold text-slate-700 mb-1">Layers</p>
          {Object.entries(layers).map(([key, checked]) => (
            <label key={key} className="flex items-center gap-2.5 cursor-pointer select-none">
              <div
                onClick={() => toggleLayer(key)}
                className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${checked ? "bg-[#1554ad] border-[#1554ad]" : "bg-white border-slate-300"
                  }`}
              >
                {checked && (
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 10">
                    <path d="M1.5 5L4 7.5L8.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="text-xs text-slate-700 font-medium">{key}</span>
            </label>
          ))}
        </div>

        {/* Zoom controls */}
        <div className="absolute bottom-14 right-4 flex flex-col gap-1">
          {[<Plus key="p" className="w-4 h-4" />, <Minus key="m" className="w-4 h-4" />].map((icon, i) => (
            <button key={i}
              className="w-9 h-9 bg-white rounded-lg shadow-md flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors border border-slate-100">
              {icon}
            </button>
          ))}
        </div>
        <button className="absolute bottom-4 right-4 w-9 h-9 bg-white rounded-lg shadow-md flex items-center justify-center text-slate-600 hover:bg-slate-50 border border-slate-100">
          <Target className="w-4 h-4" />
        </button>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 flex items-center gap-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow border border-slate-100">
          {[
            { color: "bg-red-500", label: "HIGH RISK" },
            { color: "bg-[#1554ad]", label: "CRISIS ZONE" },
            { color: "bg-teal-400", label: "ENGAGEMENT AREA" },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
              <span className="text-[10px] font-bold text-slate-600 tracking-wide">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <MapPickerDialog 
        open={isMapDialogOpen} 
        onClose={() => setIsMapDialogOpen(false)} 
        onSave={handleLocationSave}
        initialLocation={coords ? [coords.lat, coords.lng] : undefined}
      />
    </div>
  );
}
