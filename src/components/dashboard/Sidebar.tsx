"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  Users,
  Building2,
  UserRound,
  FileSpreadsheet,
  BarChart3,
  LogOut,
  ChevronLeft,
  LucideIcon,
  Shield,
  Scale,
  HeartPulse,
  FileText,
  Activity,
  History,
  Star,
  Map,
  Gift,
  CreditCard,
  FileSignature,
  User,
  Bell
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";

type IconType = LucideIcon;

const items: Array<{
  href: string;
  label: string;
  Icon: IconType;
}> = [
    { href: "/overview", label: "Overview", Icon: LayoutDashboard },
    { href: "/citizen-management", label: "Citizen Management", Icon: Users },
    { href: "/police-management", label: "Police Management", Icon: Shield },
    { href: "/attorney-management", label: "Attorney Management", Icon: Scale },
    { href: "/mhp-management", label: "MHP Management", Icon: HeartPulse },
    { href: "/bonds-management", label: "Bonds Management", Icon: FileText },
    { href: "/live-call-monitoring", label: "Live Call Monitoring", Icon: Activity },
    { href: "/call-history", label: "Call History", Icon: History },
    { href: "/hero-highlight", label: "Hero highlight", Icon: Star },
    { href: "/risk-map", label: "Risk Map", Icon: Map },
    { href: "/gift-code", label: "Gift Code", Icon: Gift },
    { href: "/subscription", label: "Subscription", Icon: CreditCard },
    { href: "/subpoena", label: "Subpoena", Icon: FileSignature },
    { href: "/profile", label: "Profile", Icon: User },
    { href: "/notification", label: "Notification", Icon: Bell },
  ];

interface SidebarProps {
  active?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ active, isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const current = active ?? pathname ?? "";

  const SidebarContent = () => (
    <div className="h-full bg-white text-slate-600 flex flex-col">
      <div className="p-6 pb-2">
        <div className="flex items-center justify-center w-full min-h-[60px]">
          <Image
            src="/image 1 (1).png"
            alt="Logo"
            width={80}
            height={80}
            className="w-auto h-28 object-contain"
            priority
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-thin scrollbar-thumb-slate-200">
        <nav className="space-y-1">
          {items.map((item) => {
            const isActive = current === item.href || current.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-sm transition-colors rounded-lg",
                  isActive
                    ? "bg-[#1554ad] text-white font-medium"
                    : "text-slate-800 font-semibold hover:bg-slate-50 hover:text-slate-700"
                )}
              >
                <item.Icon className={cn("h-5 w-5", isActive ? "text-white" : "text-slate-800")} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:flex h-screen w-64 bg-white text-slate-600 border-r border-slate-200 fixed left-0 top-0 flex flex-col">
        <SidebarContent />
      </aside>

      <Sheet open={isOpen} onOpenChange={(open) => !open && onClose?.()}>
        <SheetContent side="left" className="p-0 w-64" showCloseButton={false}>
          <div className="absolute top-4 right-4">
            <SheetClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </SheetClose>
          </div>
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
}
