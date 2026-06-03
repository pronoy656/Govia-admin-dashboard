"use client";

import React, { useState } from "react";
import {
  Bell,
  AlertTriangle,
  CheckCircle2,
  Info,
  ShieldAlert,
  UserPlus,
  CreditCard,
  Phone,
  Trash2,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NotifType = "alert" | "info" | "success" | "warning" | "system" | "incident";
type FilterType = "all" | "unread" | "system" | "alerts";

type Notification = {
  id: string;
  type: NotifType;
  title: string;
  description: string;
  time: string;
  read: boolean;
  category: "system" | "alerts" | "activity";
};

const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "incident",
    title: "Critical Incident Escalated",
    description: "INC-2844 involving Jennifer Martinez has been escalated to Critical Risk. Immediate attention required.",
    time: "2 min ago",
    read: false,
    category: "alerts",
  },
  {
    id: "2",
    type: "warning",
    title: "New Citizen Registered",
    description: "A new citizen account for 'Marcus Allen' has been registered and is pending identity verification.",
    time: "15 min ago",
    read: false,
    category: "activity",
  },
  {
    id: "3",
    type: "success",
    title: "Subscription Upgraded",
    description: "User Sarah Chen has upgraded her subscription from Basic Plan to Premium Plan successfully.",
    time: "1h ago",
    read: false,
    category: "system",
  },
  {
    id: "4",
    type: "alert",
    title: "Live Call Monitoring Alert",
    description: "INC-2849 (David Chen) has exceeded 15 minutes. MHP has been auto-notified.",
    time: "1h 15m ago",
    read: false,
    category: "alerts",
  },
  {
    id: "5",
    type: "info",
    title: "New Attorney Onboarded",
    description: "Attorney Robert Vance has completed onboarding and is now active in the system.",
    time: "3h ago",
    read: true,
    category: "activity",
  },
  {
    id: "6",
    type: "system",
    title: "System Maintenance Scheduled",
    description: "Scheduled maintenance window is set for June 6th, 2026 from 02:00 – 04:00 AM UTC.",
    time: "5h ago",
    read: true,
    category: "system",
  },
  {
    id: "7",
    type: "success",
    title: "Gift Code Redeemed",
    description: "Gift code GIFT-E5F6-G7H8 has been successfully redeemed by County Court organization.",
    time: "8h ago",
    read: true,
    category: "system",
  },
  {
    id: "8",
    type: "incident",
    title: "New Incident Reported",
    description: "INC-2851 has been created. Officer assigned: Officer Torres. Location: West Side Market.",
    time: "12h ago",
    read: true,
    category: "alerts",
  },
  {
    id: "9",
    type: "warning",
    title: "Bail Bond Request Pending",
    description: "Bondsman Mike Ehrmantraut has 3 active requests awaiting admin review and approval.",
    time: "1d ago",
    read: true,
    category: "activity",
  },
  {
    id: "10",
    type: "info",
    title: "Monthly Report Ready",
    description: "The June 2026 admin analytics report has been generated and is ready for download.",
    time: "1d ago",
    read: true,
    category: "system",
  },
];

const typeConfig: Record<NotifType, { icon: React.ReactNode; iconBg: string; iconColor: string }> = {
  incident: {
    icon: <Phone className="w-5 h-5" />,
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
  },
  alert: {
    icon: <AlertTriangle className="w-5 h-5" />,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-500",
  },
  warning: {
    icon: <UserPlus className="w-5 h-5" />,
    iconBg: "bg-blue-100",
    iconColor: "text-[#1554ad]",
  },
  success: {
    icon: <CheckCircle2 className="w-5 h-5" />,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-500",
  },
  info: {
    icon: <Info className="w-5 h-5" />,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-500",
  },
  system: {
    icon: <ShieldAlert className="w-5 h-5" />,
    iconBg: "bg-slate-100",
    iconColor: "text-slate-500",
  },
};

const filters: { key: FilterType; label: string }[] = [
  { key: "all", label: "All" },
  { key: "unread", label: "Unread" },
  { key: "system", label: "System" },
  { key: "alerts", label: "Alerts" },
];

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filtered = notifications.filter((n) => {
    if (activeFilter === "unread") return !n.read;
    if (activeFilter === "system") return n.category === "system";
    if (activeFilter === "alerts") return n.category === "alerts";
    return true;
  });

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const markRead = (id: string) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

  const deleteNotif = (id: string) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Notifications</h1>
          <p className="text-slate-500 mt-1">Stay updated with system alerts and activity.</p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#1554ad] text-[#1554ad] text-sm font-medium hover:bg-blue-50 transition-colors"
          >
            <Check className="w-4 h-4" />
            Mark all as read
          </button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total", value: notifications.length, icon: <Bell className="w-5 h-5 text-[#1554ad]" />, bg: "bg-blue-50" },
          { label: "Unread", value: unreadCount, icon: <AlertTriangle className="w-5 h-5 text-amber-500" />, bg: "bg-amber-50" },
          { label: "Alerts", value: notifications.filter(n => n.category === "alerts").length, icon: <ShieldAlert className="w-5 h-5 text-red-500" />, bg: "bg-red-50" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-4">
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", stat.bg)}>
              {stat.icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
              <p className="text-sm text-slate-500">{stat.label} Notifications</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 bg-white rounded-xl border border-slate-100 shadow-sm p-1.5 w-fit">
        {filters.map((f) => {
          const count =
            f.key === "all" ? notifications.length :
              f.key === "unread" ? notifications.filter(n => !n.read).length :
                f.key === "system" ? notifications.filter(n => n.category === "system").length :
                  notifications.filter(n => n.category === "alerts").length;

          return (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                activeFilter === f.key
                  ? "bg-[#1554ad] text-white shadow-md shadow-[#1554ad]/20"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              )}
            >
              {f.label}
              <span
                className={cn(
                  "text-xs px-1.5 py-0.5 rounded-full font-bold",
                  activeFilter === f.key ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Notifications List */}
      <div className="flex flex-col gap-2">
        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm py-16 flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center">
              <Bell className="w-6 h-6 text-slate-400" />
            </div>
            <p className="text-slate-500 font-medium">No notifications here</p>
          </div>
        )}

        {filtered.map((notif) => {
          const config = typeConfig[notif.type];
          return (
            <div
              key={notif.id}
              className={cn(
                "group bg-white rounded-2xl border transition-all hover:shadow-md flex items-start gap-4 p-5",
                notif.read ? "border-slate-100 shadow-sm" : "border-[#1554ad]/20 shadow-sm shadow-[#1554ad]/5"
              )}
            >
              {/* Unread dot */}
              <div className="relative shrink-0 mt-0.5">
                <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center", config.iconBg, config.iconColor)}>
                  {config.icon}
                </div>
                {!notif.read && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#1554ad] rounded-full border-2 border-white" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={cn("font-semibold text-sm", notif.read ? "text-slate-700" : "text-slate-900")}>
                    {notif.title}
                  </p>
                  <span className="text-xs text-slate-400 shrink-0">{notif.time}</span>
                </div>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">{notif.description}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                {!notif.read && (
                  <button
                    onClick={() => markRead(notif.id)}
                    title="Mark as read"
                    className="p-2 rounded-lg text-slate-400 hover:text-[#1554ad] hover:bg-blue-50 transition-colors"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => deleteNotif(notif.id)}
                  title="Delete"
                  className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
