"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function FormularyPage() {
    return (
        <div className="container mx-auto py-8 px-4 space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-800">Formulary Management</h1>
                <p className="text-slate-500 mt-1 font-medium text-lg">
                    Manage medications, therapeutic interchanges, and facility-specific rules
                </p>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm min-h-[400px] flex items-center justify-center">
                <p className="text-slate-400 font-medium">Formulary data and tables are being updated.</p>
            </div>
        </div>
    );
}
