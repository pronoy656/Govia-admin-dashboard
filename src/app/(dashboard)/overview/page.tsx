"use client";

import React, { useState, useEffect } from "react";
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
  { month: "January", monthShort: "Jan", users: 850 },
  { month: "February", monthShort: "Feb", users: 800 },
  { month: "March", monthShort: "Mar", users: 750 },
  { month: "April", monthShort: "Apr", users: 820 },
  { month: "May", monthShort: "May", users: 890 },
  { month: "June", monthShort: "Jun", users: 850 },
  { month: "July", monthShort: "Jul", users: 1000 },
  { month: "August", monthShort: "Aug", users: 1200 },
  { month: "September", monthShort: "Sep", users: 820 },
  { month: "October", monthShort: "Oct", users: 950 },
  { month: "November", monthShort: "Nov", users: 850 },
  { month: "December", monthShort: "Dec", users: 600 },
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
    title: "Total Attorneys",
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="flex flex-col gap-6 p-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

      <Card className="border-none shadow-sm bg-white rounded-2xl p-4 md:p-6 overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-xl font-bold text-slate-800">User Growth Analytics</h2>
          <Select defaultValue="2026">
            <SelectTrigger className="w-[160px] bg-white border-slate-200 text-slate-600 rounded-xl h-10 shadow-sm focus:ring-0">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2026">2026</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full overflow-x-auto rounded-xl">
          <div className="min-w-[600px] h-[300px] sm:h-[400px]">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <AreaChart
                data={mockChartData}
                margin={{ top: 20, right: 10, left: 0, bottom: 10 }}
              >
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-users)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-users)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey={isMobile ? "monthShort" : "month"}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: isMobile ? 10 : 12 }}
                  interval={isMobile ? 1 : 0}
                  className="text-slate-400"
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: isMobile ? 10 : 12 }}
                  tickFormatter={(value) => `${(value / 1200 * 100).toFixed(0)}%`}
                  dx={-5}
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
        </div>
      </Card>
    </div>
  );
}
