"use client";

import React from "react";
import { Check, X, LayoutList } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const revenueData = [
  { month: "January", revenue: 30000 },
  { month: "February", revenue: 28000 },
  { month: "March", revenue: 26000 },
  { month: "April", revenue: 27500 },
  { month: "May", revenue: 29000 },
  { month: "June", revenue: 31000 },
  { month: "July", revenue: 33000 },
  { month: "August", revenue: 32000 },
  { month: "September", revenue: 29500 },
  { month: "October", revenue: 27000 },
  { month: "November", revenue: 24000 },
  { month: "December", revenue: 20000 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#3f80ba",
  },
} satisfies ChartConfig;

type Plan = {
  id: string;
  tag: string;
  tagColor: string;
  name: string;
  price: string;
  unit: string;
  features: { text: string; included: boolean }[];
  cta: string;
  dark?: boolean;
  mostPopular?: boolean;
  custom?: boolean;
};

const plans: Plan[] = [
  {
    id: "free",
    tag: "Standard",
    tagColor: "bg-slate-100 text-slate-600",
    name: "Free",
    price: "$0",
    unit: "/month",
    features: [
      { text: "5GB Storage", included: true },
      { text: "Basic Search", included: true },
      { text: "No AI Access", included: false },
    ],
    cta: "Edit Plan",
  },
  {
    id: "citizen",
    tag: "Individual",
    tagColor: "bg-[#1554ad] text-white",
    name: "Citizen Premium",
    price: "$9",
    unit: "/month",
    features: [
      { text: "50GB Storage", included: true },
      { text: "4K Cloud Zoom", included: true },
      { text: "Basic AI Reports", included: true },
    ],
    cta: "Edit Plan",
    mostPopular: true,
  },
  {
    id: "attorney",
    tag: "Professional",
    tagColor: "bg-teal-100 text-teal-700",
    name: "Attorney Pro",
    price: "$89",
    unit: "/month",
    features: [
      { text: "Unlimited Vault", included: true },
      { text: "Case Management", included: true },
      { text: "Priority AI Analysis", included: true },
    ],
    cta: "Edit Plan",
  },
  {
    id: "police",
    tag: "Government",
    tagColor: "bg-blue-900/30 text-blue-200",
    name: "Police Enterprise",
    price: "$450",
    unit: "/mo",
    features: [
      { text: "CoIS Compliance", included: true },
      { text: "Mass Evidence Ingest", included: true },
      { text: "Full Agency AI", included: true },
    ],
    cta: "Edit Plan",
    dark: true,
  },
  {
    id: "agency",
    tag: "Agency",
    tagColor: "bg-slate-100 text-slate-500",
    name: "Agency Custom",
    price: "",
    unit: "",
    features: [],
    cta: "Build Quote",
    custom: true,
  },
];

export default function SubscriptionPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Subscription Tiers</h1>
        <p className="text-slate-500 mt-1">Global pricing configuration and feature access control</p>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-800">Revenue Growth</h2>
          <Select defaultValue="2026">
            <SelectTrigger className="w-[100px] bg-white border-slate-200 text-slate-600 rounded-xl h-9 shadow-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2026">2026</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="h-[300px] w-full">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <AreaChart data={revenueData} margin={{ top: 20, right: 0, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                tickFormatter={(v) => `${v / 1000}k`}
                dx={-10}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    formatter={(value) => [`$${Number(value).toLocaleString()}`, "Revenue"]}
                    className="bg-[#3f80ba] text-white border-none shadow-lg rounded-xl px-4 py-2"
                  />
                }
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="var(--color-revenue)"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorRevenue)"
                activeDot={{ r: 6, fill: "white", stroke: "var(--color-revenue)", strokeWidth: 3 }}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-start">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={cn(
              "relative rounded-2xl border p-5 flex flex-col gap-4 transition-shadow hover:shadow-lg",
              plan.dark
                ? "bg-[#1a2744] border-[#243460] text-white"
                : plan.mostPopular
                ? "border-[#1554ad] bg-white shadow-md shadow-[#1554ad]/10"
                : "border-slate-100 bg-white shadow-sm"
            )}
          >
            {/* Most Popular badge */}
            {plan.mostPopular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-[#1554ad] text-white text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap shadow-md">
                  MOST POPULAR
                </span>
              </div>
            )}

            {/* Tag */}
            <span className={cn("text-[10px] font-semibold px-2.5 py-1 rounded-full w-fit", plan.tagColor)}>
              {plan.tag}
            </span>

            {/* Plan name & price */}
            <div className="flex flex-col gap-1">
              <h3 className={cn("font-bold text-lg leading-tight", plan.dark ? "text-white" : "text-slate-800")}>
                {plan.name}
              </h3>
              {!plan.custom ? (
                <div className="flex items-end gap-0.5">
                  <span className={cn("text-2xl font-extrabold", plan.dark ? "text-white" : "text-slate-800")}>
                    {plan.price}
                  </span>
                  <span className={cn("text-xs mb-1", plan.dark ? "text-blue-300" : "text-slate-500")}>
                    {plan.unit}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 py-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                    <LayoutList className="w-5 h-5 text-slate-500" />
                  </div>
                  <p className="text-xs text-slate-500 text-center">Contact for volume pricing & SLA</p>
                </div>
              )}
            </div>

            {/* Features */}
            {plan.features.length > 0 && (
              <ul className="flex flex-col gap-2">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs">
                    {feat.included ? (
                      <Check className={cn("w-3.5 h-3.5 shrink-0", plan.dark ? "text-blue-300" : "text-[#1554ad]")} />
                    ) : (
                      <X className="w-3.5 h-3.5 shrink-0 text-slate-300" />
                    )}
                    <span className={cn(
                      feat.included
                        ? plan.dark ? "text-blue-100" : "text-slate-600"
                        : "text-slate-400"
                    )}>
                      {feat.text}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {/* CTA */}
            <button
              className={cn(
                "mt-auto w-full py-2.5 rounded-xl text-sm font-semibold border transition-all",
                plan.mostPopular
                  ? "bg-[#1554ad] text-white border-[#1554ad] hover:bg-[#10438a] shadow-md shadow-[#1554ad]/20"
                  : plan.dark
                  ? "bg-white/10 text-white border-white/20 hover:bg-white/20"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              )}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
