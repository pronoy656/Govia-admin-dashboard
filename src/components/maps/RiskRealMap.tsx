"use client";

import { MapContainer, TileLayer, Circle, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

interface RiskRealMapProps {
  layers: Record<string, boolean>;
}

// Center the map when layers or data changes
function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export default function RiskRealMap({ layers }: RiskRealMapProps) {
  const center: [number, number] = [40.7128, -74.0060]; // New York

  return (
    <div className="h-full w-full relative z-0">
      <MapContainer
        center={center}
        zoom={12}
        scrollWheelZoom={true}
        zoomControl={false}
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Incident Heatmap - represented as semi-transparent red circles */}
        {layers["Incident Heatmap"] && (
          <>
            <Circle center={[40.7128, -74.0060]} radius={1000} pathOptions={{ color: 'red', fillColor: 'red', fillOpacity: 0.4 }} />
            <Circle center={[40.7306, -73.9352]} radius={800} pathOptions={{ color: 'orange', fillColor: 'orange', fillOpacity: 0.3 }} />
            <Circle center={[40.6782, -73.9442]} radius={700} pathOptions={{ color: 'red', fillColor: 'red', fillOpacity: 0.2 }} />
          </>
        )}

        {/* Crisis Zones - blue rings */}
        {layers["Crisis Zones"] && (
          <>
            <Circle center={[40.7128, -74.0060]} radius={500} pathOptions={{ color: '#1554ad', fillColor: '#1554ad', fillOpacity: 0.1 }} />
            <Circle center={[40.7589, -73.9851]} radius={600} pathOptions={{ color: '#1554ad', fillColor: '#1554ad', fillOpacity: 0.1 }} />
          </>
        )}

        {/* Officer Deployment - small teal dots */}
        {layers["Officer Deployment"] && (
          <>
            {[
              [40.7128, -74.0060], [40.7228, -74.0160], [40.7028, -73.9960],
              [40.7589, -73.9851], [40.7489, -73.9751]
            ].map((pos, i) => (
              <Circle key={i} center={pos as [number, number]} radius={100} pathOptions={{ color: '#14b8a6', fillColor: '#14b8a6', fillOpacity: 1 }} />
            ))}
          </>
        )}
      </MapContainer>
    </div>
  );
}
