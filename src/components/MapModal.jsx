import { useState, useEffect } from 'react';
import { X, Navigation, ExternalLink, MapPin, Landmark } from 'lucide-react';
import { haptic } from '../utils/haptics';

// Renders a pure-CSS simulated map with a marker
function SimulatedMap({ doc, dark, fullscreen = false }) {
  const [markerBounce, setMarkerBounce] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMarkerBounce(true), 300);
    return () => clearTimeout(t);
  }, []);

  const h = fullscreen ? '100%' : 180;

  // Grid lines for map feel
  const gridLines = Array.from({ length: 8 });

  return (
    <div style={{ width: '100%', height: h, position: 'relative', overflow: 'hidden', background: dark ? '#1a2744' : '#e8f0fe', borderRadius: fullscreen ? 0 : 16 }}>
      {/* Road grid */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.5 }} viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice">
        {/* Horizontal roads */}
        {[30, 70, 110, 150, 170].map((y, i) => (
          <rect key={`h${i}`} x="0" y={y} width="300" height={i % 2 === 0 ? 6 : 3} fill={dark ? '#2d4a7a' : '#c5d8f5'} />
        ))}
        {/* Vertical roads */}
        {[40, 90, 150, 200, 250].map((x, i) => (
          <rect key={`v${i}`} x={x} y="0" width={i % 2 === 0 ? 6 : 3} height="200" fill={dark ? '#2d4a7a' : '#c5d8f5'} />
        ))}
        {/* Blocks */}
        {[[10,10,25,15],[100,20,40,20],[170,40,30,25],[50,80,35,20],[120,90,45,15],[200,60,30,20],[60,130,40,25],[160,120,35,20],[230,130,25,15]].map(([x,y,w,h], i) => (
          <rect key={`b${i}`} x={x} y={y} width={w} height={h} rx="3" fill={dark ? '#1e3a6e' : '#d0e4ff'} />
        ))}
        {/* Main road highlight */}
        <rect x="0" y="95" width="300" height="10" fill={dark ? '#3b5fa0' : '#a8c4f0'} />
        <rect x="140" y="0" width="10" height="200" fill={dark ? '#3b5fa0' : '#a8c4f0'} />
      </svg>

      {/* User location dot */}
      <div style={{ position: 'absolute', bottom: '30%', left: '25%', zIndex: 2 }}>
        <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#2563EB', border: '3px solid white', boxShadow: '0 0 0 6px rgba(37,99,235,0.2)', animation: 'userPulse 2s ease-in-out infinite' }} />
      </div>

      {/* Clinic marker */}
      <div style={{ position: 'absolute', top: '30%', left: '55%', transform: 'translate(-50%,-100%)', zIndex: 3, animation: markerBounce ? 'markerDrop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards' : 'none', opacity: markerBounce ? 1 : 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ background: doc.color, borderRadius: '50% 50% 50% 0', width: 36, height: 36, transform: 'rotate(-45deg)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 16px ${doc.color}66` }}>
            <span style={{ transform: 'rotate(45deg)', fontSize: 16 }}>{doc.avatar}</span>
          </div>
          <div style={{ width: 2, height: 8, background: doc.color, marginTop: -1 }} />
        </div>
      </div>

      {/* Route line */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1 }} viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice">
        <path d="M 75 140 Q 100 100 145 60" stroke="#2563EB" strokeWidth="2.5" fill="none" strokeDasharray="6 4" opacity="0.7" />
      </svg>

      {/* Distance badge */}
      <div style={{ position: 'absolute', bottom: 10, right: 10, background: dark ? 'rgba(15,23,42,0.9)' : 'rgba(255,255,255,0.95)', borderRadius: 10, padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 5, boxShadow: '0 2px 8px rgba(0,0,0,0.15)', zIndex: 4 }}>
        <MapPin size={11} color={doc.color} />
        <span style={{ fontSize: 11, fontWeight: 700, color: dark ? '#F1F5F9' : '#111827' }}>{doc.distance}</span>
      </div>

      {/* Zoom controls */}
      <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', flexDirection: 'column', gap: 2, zIndex: 4 }}>
        {['+', '−'].map(z => (
          <button key={z} style={{ width: 28, height: 28, borderRadius: 8, background: dark ? 'rgba(15,23,42,0.9)' : 'rgba(255,255,255,0.95)', border: 'none', cursor: 'pointer', fontSize: 16, fontWeight: 700, color: dark ? '#F1F5F9' : '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }}>{z}</button>
        ))}
      </div>

      <style>{`
        @keyframes userPulse{0%,100%{box-shadow:0 0 0 6px rgba(37,99,235,0.2)}50%{box-shadow:0 0 0 10px rgba(37,99,235,0.05)}}
        @keyframes markerDrop{from{transform:translate(-50%,-80%);opacity:0}to{transform:translate(-50%,-100%);opacity:1}}
      `}</style>
    </div>
  );
}

// Full-screen map modal
export function FullMapModal({ doc, t, dark, onClose }) {
  const openGoogleMaps = () => {
    haptic.medium();
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${doc.lat},${doc.lng}`, '_blank');
  };

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 500, display: 'flex', flexDirection: 'column', background: t.bg, fontFamily: 'Inter, sans-serif' }}>
      {/* Top bar */}
      <div style={{ background: t.headerGrad, padding: '52px 20px 16px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <button onClick={() => { haptic.light(); onClose(); }} style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,0.2)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <X size={20} color="white" />
        </button>
        <div>
          <p style={{ color: 'white', fontSize: 15, fontWeight: 800, margin: 0 }}>{doc.clinic?.split(',')[0]}</p>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, margin: 0 }}>{doc.distance} away</p>
        </div>
      </div>

      {/* Map fills remaining space */}
      <div style={{ flex: 1, position: 'relative' }}>
        <SimulatedMap doc={doc} dark={dark} fullscreen />
      </div>

      {/* Bottom sheet */}
      <div style={{ background: t.bgCard, borderRadius: '24px 24px 0 0', padding: '20px 20px 36px', boxShadow: '0 -8px 32px rgba(0,0,0,0.15)', transition: 'background 0.4s ease' }}>
        <div style={{ width: 40, height: 4, background: t.border, borderRadius: 2, margin: '0 auto 16px' }} />

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 14, background: `${doc.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{doc.avatar}</div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 14, fontWeight: 800, color: t.text, margin: '0 0 3px' }}>{doc.clinic?.split(',')[0]}</p>
            <p style={{ fontSize: 12, color: t.textSecondary, margin: '0 0 4px', lineHeight: 1.5 }}>{doc.clinicAddress}</p>
            {doc.landmark && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <Landmark size={11} color={t.textMuted} />
                <span style={{ fontSize: 11, color: t.textMuted }}>{doc.landmark}</span>
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={openGoogleMaps} style={{ flex: 2, height: 50, borderRadius: 14, border: 'none', background: 'linear-gradient(135deg,#2563EB,#1E40AF)', color: 'white', fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 6px 20px rgba(37,99,235,0.4)' }}>
            <Navigation size={16} /> Start Navigation
          </button>
          <button onClick={() => { haptic.light(); window.open(`https://www.google.com/maps/search/?api=1&query=${doc.lat},${doc.lng}`, '_blank'); }} style={{ flex: 1, height: 50, borderRadius: 14, border: `1.5px solid ${t.border}`, background: t.bgSecondary, color: t.text, fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <ExternalLink size={14} /> Maps
          </button>
        </div>
      </div>
    </div>
  );
}

// Inline map preview card (used in DoctorDetail)
export default function MapPreviewCard({ doc, t, dark, onExpand }) {
  return (
    <div style={{ background: t.bgCard, borderRadius: 18, overflow: 'hidden', boxShadow: t.shadow, transition: 'background 0.4s ease' }}>
      {/* Map preview — tappable */}
      <div onClick={() => { haptic.light(); onExpand(); }} style={{ cursor: 'pointer', position: 'relative' }}>
        <SimulatedMap doc={doc} dark={dark} />
        {/* Tap to expand overlay */}
        <div style={{ position: 'absolute', top: 10, left: 10, background: dark ? 'rgba(15,23,42,0.85)' : 'rgba(255,255,255,0.9)', borderRadius: 8, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 5 }}>
          <ExternalLink size={11} color={t.primary} />
          <span style={{ fontSize: 11, fontWeight: 700, color: t.primary }}>Tap to expand</span>
        </div>
      </div>

      {/* Address info */}
      <div style={{ padding: '14px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
          <MapPin size={16} color={doc.color} style={{ flexShrink: 0, marginTop: 2 }} />
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: t.text, margin: '0 0 3px' }}>{doc.clinic?.split(',')[0]}</p>
            <p style={{ fontSize: 12, color: t.textSecondary, margin: '0 0 4px', lineHeight: 1.5 }}>{doc.clinicAddress}</p>
            {doc.landmark && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <Landmark size={10} color={t.textMuted} />
                <span style={{ fontSize: 11, color: t.textMuted }}>{doc.landmark}</span>
              </div>
            )}
          </div>
          <div style={{ background: dark ? 'rgba(34,197,94,0.15)' : '#F0FDF4', borderRadius: 8, padding: '4px 8px', flexShrink: 0 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#22C55E' }}>{doc.distance}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => { haptic.medium(); window.open(`https://www.google.com/maps/dir/?api=1&destination=${doc.lat},${doc.lng}`, '_blank'); }} style={{ flex: 1, height: 40, borderRadius: 12, border: 'none', background: 'linear-gradient(135deg,#2563EB,#1E40AF)', color: 'white', fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <Navigation size={13} /> Get Directions
          </button>
          <button onClick={() => { haptic.light(); onExpand(); }} style={{ flex: 1, height: 40, borderRadius: 12, border: `1.5px solid ${t.border}`, background: t.bgSecondary, color: t.text, fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <MapPin size={13} /> Open in Map
          </button>
        </div>
      </div>
    </div>
  );
}
