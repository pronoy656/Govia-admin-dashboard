"use client";
import React, { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-black">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      <div className="lg:ml-64 flex flex-col min-h-screen">
        <TopBar 
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)} 
        />
        <main className="p-4 md:p-6 flex-1 bg-white">{children}</main>
      </div>
    </div>
  );
}
