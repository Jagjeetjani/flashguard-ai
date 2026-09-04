import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Circle, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useFloodStore from '../../store/useFloodStore';
import rivers from '../../data/rivers';
import infrastructure from '../../data/infrastructure';
import bridges from '../../data/bridges';

// Component to handle map flying when selected village changes
const MapController = ({ selectedVillageId, villageRisks }) => {
  const map = useMap();
  useEffect(() => {
    if (selectedVillageId && villageRisks) {
      const village = villageRisks.find(v => v.id === selectedVillageId);
      if (village) {
        map.flyTo([village.lat, village.lng], 13, { duration: 1.5 });
      }
    }
  }, [selectedVillageId, villageRisks, map]);
  return null;
};

// Helper to create custom div icons for markers
const createLabelIcon = (text, markerType, size = 'sm') => {
  const dotColor = markerType === '●' ? '#1976D2' : markerType === '◆' ? '#8994A3' : markerType === '+' ? '#D33D3D' : '#E67E22';
  return L.divIcon({
    className: 'bg-transparent border-none',
    html: `<div class="flex items-center gap-1.5 bg-white border border-gray-200 px-2 py-1 rounded-md shadow-md" style="font-family:Inter,sans-serif">
           <span style="color:${dotColor};font-size:10px;line-height:1">●</span>
           <span style="color:#172033;font-weight:600;font-size:${size === 'xs' ? '10px' : '12px'};white-space:nowrap">${text}</span>
         </div>`,
    iconSize: [120, 28],
    iconAnchor: [60, 14]
  });
};

const RiskMap = ({ height = '600px', showControls = true }) => {
  const { villageRisks, selectedVillage, selectVillage } = useFloodStore();

  const getColorByClassification = (classification) => {
    switch (classification) {
      case 'CRITICAL': return '#D33D3D'; // red
      case 'HIGH': return '#E67E22'; // orange
      case 'MODERATE': return '#D4A017'; // amber
      case 'LOW': return '#25844B'; // emerald
      default: return '#1976D2'; // blue
    }
  };

  return (
    <div className="relative rounded-xl overflow-hidden border border-[#E2E8F0] shadow-xl" style={{ height }}>
      <MapContainer 
        center={[30.44, 79.35]} 
        zoom={10} 
        style={{ height: '100%', width: '100%', background: '#F4F7FB' }}
        zoomControl={showControls}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        />

        <MapController selectedVillageId={selectedVillage} villageRisks={villageRisks} />

        {/* Rivers */}
        {rivers?.map((river, idx) => (
          <Polyline
            key={`river-${idx}`}
            positions={river.coordinates}
            color="#1976D2"
            weight={river.type === 'major' ? 4 : 2}
            opacity={0.6}
          />
        ))}

        {/* Bridges */}
        {bridges?.map((bridge, idx) => (
          <Marker
            key={`bridge-${idx}`}
            position={[bridge.lat, bridge.lng]}
            icon={createLabelIcon(bridge.name, '◆', 'xs')}
          >
            <Popup className="custom-popup">
              <div className="font-bold text-[#172033]">{bridge.name}</div>
              <div className="text-sm text-[#788597]">Bridge Infrastructure</div>
            </Popup>
          </Marker>
        ))}

        {/* Infrastructure (Hospitals, Schools) */}
        {infrastructure.hospitals?.map((inf, idx) => (
          <Marker
            key={`hosp-${idx}`}
            position={[inf.lat, inf.lng]}
            icon={createLabelIcon(inf.name, '+', 'xs')}
          >
            <Popup>
              <div className="font-bold text-[#172033]">{inf.name}</div>
              <div className="text-sm capitalize text-[#788597]">{inf.type} • {inf.beds} beds</div>
            </Popup>
          </Marker>
        ))}
        {infrastructure.schools?.map((inf, idx) => (
          <Marker
            key={`sch-${idx}`}
            position={[inf.lat, inf.lng]}
            icon={createLabelIcon(inf.name, '■', 'xs')}
          >
            <Popup>
              <div className="font-bold text-[#172033]">{inf.name}</div>
              <div className="text-sm capitalize text-[#788597]">{inf.type} • {inf.students} students</div>
            </Popup>
          </Marker>
        ))}

        {/* Villages (Circles + Labels) */}
        {villageRisks?.map((village) => {
          const color = getColorByClassification(village.riskLevel);
          const radius = Math.max(1500, Math.min(4000, village.population * 2));
          const isSelected = selectedVillage === village.id;

          return (
            <React.Fragment key={`village-${village.id}`}>
              <Circle
                center={[village.lat, village.lng]}
                radius={radius}
                pathOptions={{
                  fillColor: color,
                  fillOpacity: isSelected ? 0.6 : 0.35,
                  color: isSelected ? '#172033' : color,
                  weight: isSelected ? 3 : 1,
                }}
                eventHandlers={{
                  click: () => selectVillage(village.id)
                }}
              />
              <Marker
                position={[village.lat, village.lng]}
                icon={createLabelIcon(village.name, '●', 'sm')}
                eventHandlers={{
                  click: () => selectVillage(village.id)
                }}
              >
                <Popup>
                  <div className="p-1 min-w-[200px]">
                    <h3 className="font-bold text-lg text-[#172033] border-b border-[#E2E8F0] pb-2 mb-2">{village.name}</h3>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[#4A5568] text-sm">Risk Score</span>
                      <span className="font-bold" style={{ color }}>{village.riskScore}/100</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[#4A5568] text-sm">Population</span>
                      <span className="font-semibold text-[#2D3748]">{village.population}</span>
                    </div>
                    <button 
                      onClick={() => selectVillage(village.id)}
                      className="w-full bg-[#1976D2] text-white rounded py-1.5 text-sm font-medium hover:bg-[#1976D2]/90 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </Popup>
              </Marker>
            </React.Fragment>
          );
        })}
      </MapContainer>

      {/* Map Legend */}
      <div className="absolute bottom-6 right-6 z-[1000] bg-white/90 backdrop-blur-md border border-[#E2E8F0] p-4 rounded-xl shadow-2xl">
        <h4 className="text-xs font-bold text-[#788597] uppercase tracking-wider mb-3">Risk Level Legend</h4>
        <div className="space-y-2">
          {[
            { label: 'Critical (>75)', color: 'bg-[#D33D3D]' },
            { label: 'High (56-75)', color: 'bg-[#E67E22]' },
            { label: 'Moderate (31-55)', color: 'bg-[#D4A017]' },
            { label: 'Low (<30)', color: 'bg-[#25844B]' }
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${item.color} shadow-sm`}></div>
              <span className="text-sm font-medium text-[#2D3748]">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* CSS overrides for dark map and popups (Removed dark overrides) */}
      <style>{`
        .leaflet-popup-content-wrapper {
          background: #ffffff;
          color: #172033;
          border-radius: 0.75rem;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .leaflet-popup-tip {
          background: #ffffff;
        }
      `}</style>
    </div>
  );
};

export default RiskMap;
