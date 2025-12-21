"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// --- DATA ---
const CAMPS = [
  { id: "kakuma", name: "Kakuma", lat: 3.71, lng: 34.85, type: 'major', country: "Kenya", pop: "200k+" },
  { id: "dadaab", name: "Dadaab", lat: 0.05, lng: 40.32, type: 'major', country: "Kenya", pop: "300k+" },
  { id: "kalobeyei", name: "Kalobeyei", lat: 3.75, lng: 34.80, type: 'large', country: "Kenya", pop: "40k+" },
  { id: "nakivale", name: "Nakivale", lat: -0.79, lng: 30.90, type: 'major', country: "Uganda", pop: "150k+" },
  { id: "nyarugusu", name: "Nyarugusu", lat: -4.23, lng: 30.38, type: 'major', country: "Tanzania", pop: "150k+" },
  { id: "mahama", name: "Mahama", lat: -2.31, lng: 30.85, type: 'large', country: "Rwanda", pop: "60k+" },
  { id: "goma", name: "Goma Transit", lat: -1.65, lng: 29.22, type: 'urban', country: "DRC", pop: "Varies" },
  { id: "bujumbura", name: "Bujumbura", lat: -3.36, lng: 29.36, type: 'urban', country: "Burundi", pop: "15k+" }
];

// --- CONTROLLER COMPONENT ---
// This handles the programmatic zooming/panning
function MapController({ view }: { view: 'regional' | 'kenya' }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    // Hardcoded, safe coordinates to prevent NaN errors
    try {
      if (view === 'kenya') {
        // Kenya Focus: Latitude 1.0, Longitude 37.0
        map.flyTo([1.0, 37.0], 6, { 
          duration: 1.5,
          animate: true
        });
      } else {
        // Regional Focus: Latitude -1.5, Longitude 34.0
        map.flyTo([-1.5, 34.0], 5, { 
          duration: 1.5,
          animate: true
        });
      }
    } catch (error) {
      console.error("Map movement error:", error);
    }
  }, [view, map]);

  return null;
}

// --- MAIN COMPONENT ---
interface LeafletMapProps {
  view?: 'regional' | 'kenya'; // Made optional to be safe
}

export default function LeafletMap({ view = 'regional' }: LeafletMapProps) {
  
  const getRefColor = (type: string) => {
    switch(type) {
      case 'major': return '#EF4444'; // Red
      case 'large': return '#F59E0B'; // Orange
      default: return '#3B82F6';      // Blue
    }
  };

  return (
    // Explicitly set a z-index to ensure it renders correctly in the container
    <div className="h-full w-full absolute inset-0 z-0"> 
      <MapContainer 
        center={[-1.5, 34.0]} // Default center
        zoom={5} 
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
        attributionControl={false}
      >
        <MapController view={view} />
        
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {CAMPS.map((camp) => (
          <CircleMarker 
            key={camp.id}
            center={[camp.lat, camp.lng]}
            pathOptions={{ 
              color: 'white', 
              fillColor: getRefColor(camp.type), 
              fillOpacity: 0.8, 
              weight: 2 
            }}
            radius={camp.type === 'major' ? 12 : 8}
          >
            <Tooltip direction="top" offset={[0, -10]} opacity={1}>
              <span className="font-bold font-sans">{camp.name}</span>
            </Tooltip>
            <Popup>
              <div className="text-sm font-sans">
                <strong className="text-slate-900 block text-base">{camp.name}</strong>
                <span className="text-slate-500 block mb-1">{camp.country}</span>
                <div className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-semibold inline-block border border-slate-200">
                  Pop: {camp.pop}
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}