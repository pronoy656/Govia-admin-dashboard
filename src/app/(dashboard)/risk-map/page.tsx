"use client";

import React, { useState } from "react";
import { TrendingUp, TrendingDown, Target, Plus, Minus } from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

/* ───────────── mock data ───────────── */
const barData = [
  { v: 600 }, { v: 700 }, { v: 500 }, { v: 750 }, { v: 900 },
  { v: 1050 }, { v: 1100 }, { v: 1248 },
];
const lineData = [
  { v: 3.9 }, { v: 4.1 }, { v: 3.8 }, { v: 4.3 }, { v: 4.5 }, { v: 4.7 }, { v: 4.82 },
];

/* ───────────── SVG city-map ───────────── */
function CityMapSVG({ layers }: { layers: Record<string, boolean> }) {
  return (
    <svg
      viewBox="0 0 800 480"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* background */}
      <rect width="800" height="480" fill="#3a3f4b" />

      {/* ── radial road network (white, low opacity) ── */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i * 15 * Math.PI) / 180;
        const cx = 400; const cy = 240;
        const ex = cx + Math.cos(angle) * 450;
        const ey = cy + Math.sin(angle) * 450;
        return (
          <line key={i} x1={cx} y1={cy} x2={ex} y2={ey}
            stroke="white" strokeOpacity={0.08} strokeWidth={i % 3 === 0 ? 1.5 : 0.7} />
        );
      })}
      {/* concentric ring roads */}
      {[60, 120, 190, 270, 360].map((r) => (
        <circle key={r} cx={400} cy={240} r={r}
          fill="none" stroke="white" strokeOpacity={0.07} strokeWidth={r > 200 ? 1.5 : 1} />
      ))}
      {/* grid streets */}
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={`h${i}`} x1={0} y1={i * 44} x2={800} y2={i * 44}
          stroke="white" strokeOpacity={0.04} strokeWidth={0.5} />
      ))}
      {Array.from({ length: 18 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 46} y1={0} x2={i * 46} y2={480}
          stroke="white" strokeOpacity={0.04} strokeWidth={0.5} />
      ))}

      {/* ── Incident Heatmap layer ── */}
      {layers["Incident Heatmap"] && (
        <g>
          <radialGradient id="hm1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hm2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hm3" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
          </radialGradient>
          <ellipse cx={400} cy={240} rx={90} ry={70} fill="url(#hm1)" />
          <ellipse cx={220} cy={140} rx={60} ry={50} fill="url(#hm2)" />
          <ellipse cx={580} cy={330} rx={55} ry={45} fill="url(#hm3)" />
        </g>
      )}

      {/* ── Crisis Zone rings ── */}
      {layers["Crisis Zones"] && (
        <g>
          <circle cx={400} cy={240} r={50} fill="#1554ad" fillOpacity={0.18}
            stroke="#3b82f6" strokeWidth={1.5} strokeOpacity={0.6} />
          <circle cx={400} cy={240} r={30} fill="#1554ad" fillOpacity={0.22} />
          <circle cx={580} cy={160} r={35} fill="#1554ad" fillOpacity={0.18}
            stroke="#3b82f6" strokeWidth={1} strokeOpacity={0.5} />
          <circle cx={210} cy={310} r={28} fill="#1554ad" fillOpacity={0.18}
            stroke="#3b82f6" strokeWidth={1} strokeOpacity={0.5} />
        </g>
      )}

      {/* ── Officer Deployment dots ── */}
      {layers["Officer Deployment"] && (
        <g>
          {[
            [400, 240], [320, 180], [500, 290], [250, 200],
            [540, 175], [370, 310], [445, 155],
          ].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r={8} fill="#14b8a6" fillOpacity={0.25}
                stroke="#14b8a6" strokeWidth={1} />
              <circle cx={x} cy={y} r={3.5} fill="#14b8a6" />
            </g>
          ))}
        </g>
      )}

      {/* center glow */}
      <radialGradient id="cg" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.06" />
        <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
      </radialGradient>
      <ellipse cx={400} cy={240} rx={200} ry={180} fill="url(#cg)" />
    </svg>
  );
}

/* ───────────── donut gauge ───────────── */
function ResponseGauge({ value }: { value: number }) {
  const r = 40; const circ = 2 * Math.PI * r;
  const pct = 0.72;
  return (
    <svg width={100} height={100} viewBox="0 0 100 100">
      <circle cx={50} cy={50} r={r} fill="none" stroke="#e2e8f0" strokeWidth={10} />
      <circle cx={50} cy={50} r={r} fill="none"
        stroke="#1554ad" strokeWidth={10}
        strokeDasharray={`${pct * circ} ${circ}`}
        strokeLinecap="round"
        transform="rotate(-90 50 50)" />
      <text x={50} y={46} textAnchor="middle"
        className="font-bold" fontSize={16} fontWeight={700} fill="#1e293b">{value}</text>
      <text x={50} y={60} textAnchor="middle" fontSize={9} fill="#94a3b8">MIN</text>
    </svg>
  );
}

/* ───────────── main page ───────────── */
export default function RiskMapPage() {
  const [layers, setLayers] = useState<Record<string, boolean>>({
    "Incident Heatmap": true,
    "Crisis Zones": true,
    "Officer Deployment": false,
  });

  const toggleLayer = (key: string) =>
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));

  const engagementChannels = [
    { label: "Mobile App", pct: 64, color: "bg-[#1554ad]" },
    { label: "Town Halls", pct: 21, color: "bg-teal-500" },
    { label: "Social Link", pct: 15, color: "bg-slate-300" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Risk Map & Analytics</h1>
        <p className="text-slate-500 mt-1">Real-time tactical oversight and predictive modeling.</p>
      </div>

      {/* Map */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-[#3a3f4b]" style={{ height: 440 }}>
        <CityMapSVG layers={layers} />

        {/* Layers Panel */}
        <div className="absolute top-4 left-4 bg-white rounded-xl shadow-lg p-4 flex flex-col gap-2 min-w-[180px]">
          <p className="text-xs font-bold text-slate-700 mb-1">Layers</p>
          {Object.entries(layers).map(([key, checked]) => (
            <label key={key} className="flex items-center gap-2.5 cursor-pointer select-none">
              <div
                onClick={() => toggleLayer(key)}
                className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                  checked ? "bg-[#1554ad] border-[#1554ad]" : "bg-white border-slate-300"
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

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Incident Volume */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500 font-medium">Incident Volume</p>
            <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-red-400" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-800">1,248</p>
          <div className="h-14">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} barSize={7}>
                <Bar dataKey="v" radius={[3, 3, 0, 0]}
                  fill="#1554ad"
                  opacity={0.7}
                />
                <Tooltip
                  contentStyle={{ display: "none" }}
                  cursor={{ fill: "transparent" }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs font-semibold text-red-500">+12.4% vs last month</p>
        </div>

        {/* Sentiment Score */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500 font-medium">Sentiment Score</p>
            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
              <span className="text-[#1554ad] text-base">★</span>
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-800">4.82</p>
          <div className="h-14">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={lineData}>
                <defs>
                  <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1554ad" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="#1554ad" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#1554ad" strokeWidth={2.5}
                  fill="url(#sg)" dot={false}
                  activeDot={{ r: 4, fill: "white", stroke: "#1554ad", strokeWidth: 2 }} />
                <Tooltip contentStyle={{ display: "none" }} cursor={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs font-semibold text-[#1554ad]">Community trust at peak</p>
        </div>

        {/* Engagement Channels */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col gap-4">
          <p className="text-sm text-slate-500 font-medium">Engagement Channels</p>
          <div className="flex flex-col gap-3">
            {engagementChannels.map(({ label, pct, color }) => (
              <div key={label} className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">{label}</span>
                  <span className="text-xs font-bold text-slate-700">{pct}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${color} transition-all`}
                    style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Avg Response */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col gap-3">
          <p className="text-sm text-slate-500 font-medium">Avg Response</p>
          <div className="flex items-center justify-center py-2">
            <ResponseGauge value={4.2} />
          </div>
          <div className="flex items-center justify-center gap-1 text-xs font-semibold text-teal-500">
            <TrendingDown className="w-3.5 h-3.5" />
            18s improvement
          </div>
        </div>

      </div>
    </div>
  );
}
