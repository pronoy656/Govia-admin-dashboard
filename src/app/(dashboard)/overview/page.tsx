"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, AlertTriangle } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const mockChartData = [
  { month: "January", users: 850 },
  { month: "February", users: 800 },
  { month: "March", users: 750 },
  { month: "April", users: 820 },
  { month: "May", users: 890 },
  { month: "June", users: 850 },
  { month: "July", users: 1000 },
  { month: "August", users: 1200 },
  { month: "September", users: 820 },
  { month: "October", users: 950 },
  { month: "November", users: 850 },
  { month: "December", users: 600 },
];

const chartConfig = {
  users: {
    label: "Users",
    color: "#3f80ba", 
  },
} satisfies ChartConfig;

const statCards = [
  {
    title: "Total Users",
    value: "2456",
    change: "+12%",
    isPositive: true,
    icon: <Users className="w-5 h-5 text-[#1554ad]" />,
    iconBg: "bg-blue-100/50",
    changeBg: "bg-emerald-100/50 text-emerald-600",
  },
  {
    title: "Total Attorney",
    value: "12",
    change: "+8%",
    isPositive: true,
    icon: <Users className="w-5 h-5 text-emerald-600" />,
    iconBg: "bg-emerald-100/50",
    changeBg: "bg-emerald-100/50 text-emerald-600",
  },
  {
    title: "Total Mental Health Agents",
    value: "14",
    change: "+15%",
    isPositive: true,
    icon: <Users className="w-5 h-5 text-[#1554ad]" />,
    iconBg: "bg-blue-100/50",
    changeBg: "bg-emerald-100/50 text-emerald-600",
  },
  {
    title: "Active Case",
    value: "23",
    change: "+3",
    isPositive: false,
    icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
    iconBg: "bg-red-100/50",
    changeBg: "bg-red-100/50 text-red-600",
  },
];

export default function OverviewPage() {
  return (
    <div className="flex flex-col gap-6 max-w-[1400px] mx-auto p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => (
          <Card key={idx} className="border-none shadow-sm bg-white rounded-2xl p-6">
            <CardContent className="p-0 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.iconBg}`}>
                  {card.icon}
                </div>
                <div className={`px-2.5 py-1 rounded-full text-xs font-semibold ${card.changeBg}`}>
                  {card.change}
                </div>
              </div>
              <div>
                <p className="text-slate-500 text-sm font-medium mb-1">{card.title}</p>
                <h3 className="text-3xl font-bold text-slate-800">{card.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-sm bg-white rounded-2xl p-6 overflow-hidden">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-slate-800">User Growth Analytics</h2>
          <Select defaultValue="2026">
            <SelectTrigger className="w-[100px] bg-white border-slate-200 text-slate-600 rounded-xl h-10 shadow-sm focus:ring-0">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2026">2026</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="h-[400px] w-full">
          <ChartContainer config={chartConfig} className="h-[100%] w-full">
            <AreaChart
              data={mockChartData}
              margin={{ top: 20, right: 0, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-users)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-users)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tickFormatter={(val) => val}
                className="text-xs text-slate-400"
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                tickFormatter={(value) => `${(value / 1200 * 100).toFixed(0)}%`}
                dx={-10}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent className="bg-[#3f80ba] text-white border-none shadow-lg text-lg px-4 py-2 rounded-xl" />}
              />
              <Area
                type="monotone"
                dataKey="users"
                stroke="var(--color-users)"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorUsers)"
                activeDot={{ r: 6, fill: "white", stroke: "var(--color-users)", strokeWidth: 3 }}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </Card>
    </div>
  );
}
