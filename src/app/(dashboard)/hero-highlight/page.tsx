"use client";

import React, { useState } from "react";
import { Star, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

type FilterType = "all" | "5star" | "toprated";

type Hero = {
  id: string;
  name: string;
  unit: string;
  highlights: number;
  quote: string;
  rating: number;
  timeAgo: string;
  initials: string;
  avatarGradient: string;
};

const heroes: Hero[] = [
  {
    id: "1",
    name: "Sgt. David Chen",
    unit: "Metro Security Precinct",
    highlights: 12,
    quote: '"The officer\'s rapid response and calm de-escalation saved the situation from becoming critical. A true community hero."',
    rating: 4,
    timeAgo: "2h ago",
    initials: "DC",
    avatarGradient: "from-slate-600 to-slate-800",
  },
  {
    id: "2",
    name: "Ofc. Elena Rodriguez",
    unit: "Harbor Patrol Unit",
    highlights: 28,
    quote: '"Incredible patience shown while dealing with a confused elderly citizen. She stayed until the family arrived."',
    rating: 5,
    timeAgo: "5h ago",
    initials: "ER",
    avatarGradient: "from-blue-500 to-blue-700",
  },
  {
    id: "3",
    name: "Lt. James Okafor",
    unit: "Downtown Division",
    highlights: 19,
    quote: '"His leadership during the multi-agency response was exemplary. Kept everyone calm and coordinated perfectly."',
    rating: 5,
    timeAgo: "1d ago",
    initials: "JO",
    avatarGradient: "from-emerald-500 to-emerald-700",
  },
  {
    id: "4",
    name: "Ofc. Sarah Kim",
    unit: "West Precinct",
    highlights: 7,
    quote: '"Officer Kim went beyond her duty, personally following up with the family three days after the incident."',
    rating: 4,
    timeAgo: "2d ago",
    initials: "SK",
    avatarGradient: "from-purple-500 to-purple-700",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "w-4 h-4",
            i < rating ? "fill-[#1554ad] text-[#1554ad]" : "fill-slate-200 text-slate-200"
          )}
        />
      ))}
    </div>
  );
}

export default function HeroHighlightPage() {
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredHeroes = heroes.filter((h) => {
    if (filter === "5star") return h.rating === 5;
    if (filter === "toprated") return h.highlights >= 15;
    return true;
  });

  const filterBtns: { key: FilterType; label: string; icon?: React.ReactNode }[] = [
    { key: "all", label: "All Highlights" },
    { key: "5star", label: "5-star Only", icon: <Star className="w-3.5 h-3.5" /> },
    { key: "toprated", label: "Top Rated", icon: <TrendingUp className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Hero Highlights</h1>
        <p className="text-slate-500 mt-1">Manage and feature exceptional officer conduct reports.</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-3">
        {filterBtns.map((btn) => (
          <button
            key={btn.key}
            onClick={() => setFilter(btn.key)}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all border",
              filter === btn.key
                ? "bg-[#1554ad] text-white border-[#1554ad] shadow-md shadow-[#1554ad]/20"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
            )}
          >
            {btn.icon}
            {btn.label}
          </button>
        ))}
      </div>

      {/* Hero Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredHeroes.map((hero) => (
          <div
            key={hero.id}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col gap-4 hover:shadow-md transition-shadow"
          >
            {/* Header */}
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-md",
                  hero.avatarGradient
                )}
              >
                {hero.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-800 leading-tight">{hero.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">{hero.unit}</p>
              </div>
              <div className="flex items-center gap-1.5 bg-blue-50 text-[#1554ad] text-xs font-bold px-2.5 py-1 rounded-full shrink-0">
                <span>✦</span>
                <span>{hero.highlights}</span>
                <span>Highlights</span>
              </div>
            </div>

            {/* Quote */}
            <div className="bg-slate-50 rounded-xl p-4 relative flex-1">
              <span className="text-[#1554ad] text-2xl font-serif leading-none absolute top-2 left-3 select-none">"</span>
              <p className="text-slate-600 text-sm leading-relaxed pt-3 pl-2">{hero.quote}</p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <StarRating rating={hero.rating} />
              <span className="text-xs text-slate-400">{hero.timeAgo}</span>
            </div>
          </div>
        ))}
      </div>

      {filteredHeroes.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          No highlights match the selected filter.
        </div>
      )}
    </div>
  );
}
