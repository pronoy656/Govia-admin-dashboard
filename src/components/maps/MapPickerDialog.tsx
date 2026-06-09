"use client";

import React, { useState } from "react";
import { X, MapPin, Save } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import MapPicker to avoid SSR issues with Leaflet
const MapPicker = dynamic(() => import("./MapPicker"), { 
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-slate-100 animate-pulse flex items-center justify-center rounded-xl">Loading Map...</div>
});

interface MapPickerDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (lat: number, lng: number) => void;
  initialLocation?: [number, number];
}

export default function MapPickerDialog({ open, onClose, onSave, initialLocation }: MapPickerDialogProps) {
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lng: number} | null>(
    initialLocation ? { lat: initialLocation[0], lng: initialLocation[1] } : null
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-[#1554ad] px-6 py-4 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2 text-white">
            <MapPin className="w-5 h-5" />
            <h2 className="font-bold text-lg">Select Risk Area</h2>
          </div>
          <button onClick={onClose} className="text-blue-200 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 relative z-0">
          <p className="text-sm text-slate-500 mb-4">
            Click on the map to select the location for the risk area.
          </p>
          
          <MapPicker 
            onLocationSelect={(lat, lng) => setSelectedLocation({ lat, lng })} 
            initialLocation={initialLocation}
          />

          {selectedLocation && (
            <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
              <div className="text-xs font-medium text-slate-600">
                Selected: <span className="text-slate-900">{selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 relative z-10">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (selectedLocation) {
                onSave(selectedLocation.lat, selectedLocation.lng);
                onClose();
              }
            }}
            disabled={!selectedLocation}
            className="flex items-center gap-2 bg-[#1554ad] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#11438a] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Save className="w-4 h-4" />
            Confirm Location
          </button>
        </div>
      </div>
    </div>
  );
}
