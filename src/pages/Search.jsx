import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Star, MapPin, RefreshCw, Navigation, SlidersHorizontal, X, Video, Building2, Clock, Mic } from 'lucide-react';
import { doctors as allDoctors } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';
import { haptic } from '../utils/haptics';
import SkeletonLoader from '../components/SkeletonLoader';
import BottomNav from '../components/BottomNav';

const specialties = ['All', 'General Physician', 'Cardiologist', 'Neurologist', 'Dermatologist', 'Orthopedic', 'Pediatrician'];
const mockCoords = { lat: 19.076, lng: 72.877 };
const doctorCoords = [
  { lat: 19.082, lng: 72.883 }, { lat: 19.065, lng: 72.869 }, { lat: 19.091, lng: 72.895 },
  { lat: 19.072, lng: 72.871 }, { lat: 19.079, lng: 72.880 }, { lat: 19.074, lng: 72.875 },
];

function calcDist(lat1, lng1, lat2, lng2) {
  const R = 6371, dLat = (lat2 - lat1) * Math.PI / 180, dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(1);
}

function FilterSheet({ visible, onClose, filters, setFilters, t, dark }) {
  const [local, setLocal] = useState(filters);
  if (!visible) return null;
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 300, display: 'flex', alignItems: 'flex-end' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} />
      <div style={{ position: 'relative', width: '100%', maxWidth: 390, margin: '0 auto', background: t.bgCard, borderRadius: '24px 24px 0 0', padding: '20px 20px 36px', animation: 'slideUp 0.3s ease-out' }}>
        <div style={{ width: 40, height: 4, background: t.border, borderRadius: 2, margin: '0 auto 20px' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ fontSize: 17, fontWeight: 800, color: t.text, margin: 0 }}>Filters</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} color={t.textMuted} /></button>
        </div>

        {/* Rating */}
        <p style={{ fontSize: 13, fontWeight: 700, color: t.text, margin: '0 0 10px' }}>Minimum Rating</p>
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {[3, 3.5, 4, 4.5].map(r => (
            <button key={r} onClick={() => setLocal(l => ({ ...l, minRating: r }))} style={{ flex: 1, padding: '8px 0', borderRadius: 12, border: `1.5px solid ${local.minRating === r ? t.primary : t.border}`, background: local.minRating === r ? (dark ? 'rgba(37,99,235,0.15)' : '#EFF6FF') : t.bgSecondary, color: local.minRating === r ? t.primary : t.textSecondary, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
              {r}★+
            </button>
          ))}
        </div>

        {/* Mode */}
        <p style={{ fontSize: 13, fontWeight: 700, color: t.text, margin: '0 0 10px' }}>Consultation Mode</p>
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {[{ v: 'all', l: 'All' }, { v: 'online', l: '🟢 Online' }, { v: 'offline', l: '🏥 In-Clinic' }].map(m => (
            <button key={m.v} onClick={() => setLocal(l => ({ ...l, mode: m.v }))} style={{ flex: 1, padding: '9px 0', borderRadius: 12, border: `1.5px solid ${local.mode === m.v ? t.primary : t.border}`, background: local.mode === m.v ? (dark ? 'rgba(37,99,235,0.15)' : '#EFF6FF') : t.bgSecondary, color: local.mode === m.v ? t.primary : t.textSecondary, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
              {m.l}
            </button>
          ))}
        </div>

        {/* Availability */}
        <p style={{ fontSize: 13, fontWeight: 700, color: t.text, margin: '0 0 10px' }}>Availability</p>
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {[{ v: 'all', l: 'Any' }, { v: 'available', l: '✅ Available' }].map(a => (
            <button key={a.v} onClick={() => setLocal(l => ({ ...l, avail: a.v }))} style={{ flex: 1, padding: '9px 0', borderRadius: 12, border: `1.5px solid ${local.avail === a.v ? t.primary : t.border}`, background: local.avail === a.v ? (dark ? 'rgba(37,99,235,0.15)' : '#EFF6FF') : t.bgSecondary, color: local.avail === a.v ? t.primary : t.textSecondary, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
              {a.l}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => { setLocal({ minRating: 0, mode: 'all', avail: 'all' }); }} style={{ flex: 1, height: 48, borderRadius: 14, border: `1.5px solid ${t.border}`, background: 'none', color: t.text, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Reset</button>
          <button onClick={() => { haptic.medium(); setFilters(local); onClose(); }} style={{ flex: 2, height: 48, borderRadius: 14, border: 'none', background: t.primaryGrad, color: 'white', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Apply Filters</button>
        </div>
      </div>
      <style>{`@keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}`}</style>
    </div>
  );
}

export default function SearchPage() {
  const navigate = useNavigate();
  const { t, dark } = useTheme();
  const [query, setQuery] = useState('');
  const [specialty, setSpecialty] = useState('All');
  const [consultMode, setConsultMode] = useState('all'); // all | online | offline
  const [locationGranted, setLocationGranted] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [doctors, setDoctors] = useState(allDoctors);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ minRating: 0, mode: 'all', avail: 'all' });

  const requestLocation = () => {
    haptic.medium();
    setLoadingLocation(true);
    setTimeout(() => {
      const jitter = () => (Math.random() - 0.5) * 0.01;
      const coords = { lat: mockCoords.lat + jitter(), lng: mockCoords.lng + jitter() };
      const updated = allDoctors.map((d, i) => ({
        ...d, distance: `${calcDist(coords.lat, coords.lng, doctorCoords[i]?.lat || mockCoords.lat, doctorCoords[i]?.lng || mockCoords.lng)} km`,
      })).sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
      setDoctors(updated);
      setLocationGranted(true);
      setLoadingLocation(false);
      haptic.success();
    }, 1800);
  };

  const activeFilterCount = [filters.minRating > 0, filters.mode !== 'all', filters.avail !== 'all'].filter(Boolean).length;

  const filtered = useMemo(() => doctors.filter(d => {
    const q = query.toLowerCase();
    if (specialty !== 'All' && d.specialty !== specialty) return false;
    if (q && !d.name.toLowerCase().includes(q) && !d.specialty.toLowerCase().includes(q)) return false;
    if (filters.minRating > 0 && d.rating < filters.minRating) return false;
    if (filters.mode !== 'all' && d.mode !== 'both' && d.mode !== filters.mode) return false;
    if (filters.avail === 'available' && !d.available) return false;
    if (consultMode !== 'all' && d.mode !== 'both' && d.mode !== consultMode) return false;
    return true;
  }), [doctors, query, specialty, filters, consultMode]);

  const allSlots = (doc) => [...(doc.slots?.morning || []), ...(doc.slots?.afternoon || [])].slice(0, 3);

  return (
    <div style={{ background: t.bg, height: '100%', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif', transition: 'background 0.4s ease', position: 'relative' }}>
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 16 }}>

      {/* Header */}
      <div style={{ background: t.headerGrad, padding: '52px 20px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <button onClick={() => { haptic.light(); navigate(-1); }} style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,0.2)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
            <ArrowLeft size={20} color="white" />
          </button>
          <div style={{ flex: 1 }}>
            <h1 style={{ color: 'white', fontSize: 19, fontWeight: 800, margin: 0 }}>Find Doctors</h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, margin: 0 }}>Book trusted healthcare professionals</p>
          </div>
          <button onClick={() => { haptic.light(); setShowFilters(true); }} style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,0.2)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}>
            <SlidersHorizontal size={18} color="white" />
            {activeFilterCount > 0 && <div style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, borderRadius: '50%', background: '#F97316' }} />}
          </button>
        </div>

        {/* Search */}
        <div style={{ height: 46, borderRadius: 14, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', marginBottom: 14 }}>
          <Search size={16} color="rgba(255,255,255,0.7)" />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search doctors, specialties..."
            style={{ flex: 1, border: 'none', background: 'none', outline: 'none', fontSize: 14, color: 'white', fontFamily: 'Inter, sans-serif' }} />
          <Mic size={16} color="rgba(255,255,255,0.6)" />
        </div>

        {/* Online / Offline toggle */}
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: 3 }}>
          {[{ v: 'all', l: 'All' }, { v: 'online', l: '🟢 Online' }, { v: 'offline', l: '🏥 In-Clinic' }].map(m => (
            <button key={m.v} onClick={() => { haptic.tab(); setConsultMode(m.v); }} style={{ flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer', background: consultMode === m.v ? 'white' : 'transparent', color: consultMode === m.v ? '#2563EB' : 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: 700, transition: 'all 0.2s ease' }}>
              {m.l}
            </button>
          ))}
        </div>
      </div>

      {/* Specialty chips */}
      <div style={{ padding: '12px 20px 0', display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none' }}>
        {specialties.map(s => (
          <button key={s} onClick={() => { haptic.tab(); setSpecialty(s); }} style={{ flexShrink: 0, padding: '7px 14px', borderRadius: 20, border: 'none', cursor: 'pointer', background: specialty === s ? t.primary : t.chipBg, color: specialty === s ? 'white' : t.chipText, fontSize: 12, fontWeight: 600, transition: 'all 0.2s ease', boxShadow: specialty === s ? `0 4px 12px ${t.primary}44` : 'none' }}>{s}</button>
        ))}
      </div>

      {/* Active filter chips */}
      {activeFilterCount > 0 && (
        <div style={{ padding: '10px 20px 0', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {filters.minRating > 0 && <span style={{ fontSize: 11, fontWeight: 700, color: t.primary, background: dark ? 'rgba(37,99,235,0.15)' : '#EFF6FF', borderRadius: 20, padding: '4px 10px', border: `1px solid ${dark ? 'rgba(37,99,235,0.3)' : '#BFDBFE'}` }}>{filters.minRating}★+</span>}
          {filters.mode !== 'all' && <span style={{ fontSize: 11, fontWeight: 700, color: '#10B981', background: dark ? 'rgba(16,185,129,0.15)' : '#F0FDF4', borderRadius: 20, padding: '4px 10px', border: '1px solid rgba(16,185,129,0.3)' }}>{filters.mode === 'online' ? '🟢 Online' : '🏥 In-Clinic'}</span>}
          {filters.avail !== 'all' && <span style={{ fontSize: 11, fontWeight: 700, color: '#22C55E', background: dark ? 'rgba(34,197,94,0.15)' : '#F0FDF4', borderRadius: 20, padding: '4px 10px', border: '1px solid rgba(34,197,94,0.3)' }}>Available</span>}
          <button onClick={() => setFilters({ minRating: 0, mode: 'all', avail: 'all' })} style={{ fontSize: 11, fontWeight: 700, color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 6px' }}>Clear all</button>
        </div>
      )}

      <div style={{ padding: '14px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* Location banner */}
        {!locationGranted && !loadingLocation && (
          <div style={{ background: dark ? 'rgba(59,130,246,0.12)' : '#EFF6FF', borderRadius: 16, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, border: `1px solid ${dark ? 'rgba(59,130,246,0.3)' : '#BFDBFE'}`, animation: 'cardSlideIn 0.3s ease-out' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: t.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Navigation size={18} color="white" />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: t.text, margin: '0 0 2px' }}>Find doctors near you</p>
              <p style={{ fontSize: 11, color: t.textSecondary, margin: 0 }}>Enable location for proximity sorting</p>
            </div>
            <button onClick={requestLocation} style={{ padding: '8px 14px', borderRadius: 10, border: 'none', background: t.primary, color: 'white', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Allow</button>
          </div>
        )}

        {loadingLocation && (
          <div style={{ background: t.bgCard, borderRadius: 16, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: t.shadow }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', border: `3px solid ${t.primary}`, borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite', flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: t.text, margin: '0 0 2px' }}>Fetching nearby doctors...</p>
              <p style={{ fontSize: 11, color: t.textSecondary, margin: 0 }}>Calculating distances</p>
            </div>
          </div>
        )}

        {locationGranted && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E', animation: 'statusBlink 2s ease-in-out infinite' }} />
              <span style={{ fontSize: 12, color: '#22C55E', fontWeight: 600 }}>Live location · Mumbai</span>
            </div>
            <button onClick={requestLocation} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', color: t.primary, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
              <RefreshCw size={12} /> Refresh
            </button>
          </div>
        )}

        {loadingLocation ? <SkeletonLoader dark={dark} /> : (
          <>
            <p style={{ fontSize: 13, color: t.textSecondary, margin: 0 }}>{filtered.length} doctor{filtered.length !== 1 ? 's' : ''} found</p>

            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px 0' }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
                <p style={{ fontSize: 16, fontWeight: 700, color: t.text, margin: '0 0 6px' }}>No doctors found</p>
                <p style={{ fontSize: 13, color: t.textMuted, margin: 0 }}>Try adjusting your filters</p>
              </div>
            ) : filtered.map((doc, idx) => (
              <div key={doc.id} style={{ background: t.bgCard, borderRadius: 20, padding: '16px', boxShadow: t.shadow, cursor: 'pointer', animation: 'cardSlideIn 0.35s ease-out both', animationDelay: `${idx * 0.06}s`, transition: 'transform 0.15s ease' }}
                onClick={() => { haptic.light(); navigate(`/doctor/${doc.id}`); }}
                onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
                onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                onTouchStart={e => e.currentTarget.style.transform = 'scale(0.98)'}
                onTouchEnd={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                {/* Top row */}
                <div style={{ display: 'flex', gap: 14, marginBottom: 12 }}>
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <div style={{ width: 60, height: 60, borderRadius: '50%', background: `linear-gradient(135deg,${doc.color}33,${doc.color}11)`, border: `2px solid ${doc.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30 }}>{doc.avatar}</div>
                    {doc.available && <div style={{ position: 'absolute', bottom: 2, right: 2, width: 12, height: 12, borderRadius: '50%', background: '#22C55E', border: `2px solid ${t.bgCard}` }} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                      <p style={{ fontSize: 15, fontWeight: 800, color: t.text, margin: 0 }}>{doc.name}</p>
                      {doc.rating >= 4.8 && <span style={{ fontSize: 9, fontWeight: 800, color: '#F59E0B', background: dark ? 'rgba(245,158,11,0.15)' : '#FFFBEB', borderRadius: 5, padding: '2px 5px' }}>TOP</span>}
                    </div>
                    <p style={{ fontSize: 12, color: t.textSecondary, margin: '0 0 6px' }}>{doc.specialty} · {doc.experience}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Star size={11} fill="#F59E0B" color="#F59E0B" />
                        <span style={{ fontSize: 12, fontWeight: 700, color: t.text }}>{doc.rating}</span>
                        <span style={{ fontSize: 10, color: t.textMuted }}>({doc.reviews})</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <MapPin size={10} color={locationGranted ? '#22C55E' : t.textMuted} />
                        <span style={{ fontSize: 11, color: locationGranted ? '#22C55E' : t.textMuted, fontWeight: locationGranted ? 600 : 400 }}>{doc.distance}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        {doc.mode === 'online' || doc.mode === 'both' ? <Video size={10} color="#2563EB" /> : <Building2 size={10} color={t.textMuted} />}
                        <span style={{ fontSize: 10, color: t.textMuted }}>{doc.mode === 'both' ? 'Online & Clinic' : doc.mode === 'online' ? 'Online' : 'Clinic'}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <p style={{ fontSize: 15, fontWeight: 800, color: t.primary, margin: '0 0 4px' }}>{doc.fee}</p>
                    <span style={{ fontSize: 10, color: t.textMuted }}>per visit</span>
                  </div>
                </div>

                {/* Time slots */}
                {allSlots(doc).length > 0 && (
                  <div style={{ marginBottom: 12 }}>
                    <p style={{ fontSize: 11, color: t.textMuted, margin: '0 0 7px', fontWeight: 600 }}>Available slots today</p>
                    <div style={{ display: 'flex', gap: 7 }}>
                      {allSlots(doc).map(slot => (
                        <button key={slot} onClick={e => { e.stopPropagation(); haptic.medium(); navigate(`/doctor/${doc.id}`); }} style={{ padding: '5px 10px', borderRadius: 8, border: `1px solid ${dark ? 'rgba(37,99,235,0.3)' : '#BFDBFE'}`, background: dark ? 'rgba(37,99,235,0.1)' : '#EFF6FF', color: t.primary, fontSize: 11, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Clock size={9} />{slot}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Book button */}
                <button onClick={e => { e.stopPropagation(); haptic.medium(); navigate(`/doctor/${doc.id}`); }} style={{ width: '100%', height: 40, borderRadius: 12, border: 'none', background: doc.available ? t.primaryGrad : t.chipBg, color: doc.available ? 'white' : t.textMuted, fontSize: 13, fontWeight: 700, cursor: doc.available ? 'pointer' : 'default' }}>
                  {doc.available ? 'Book Appointment' : 'Currently Unavailable'}
                </button>
              </div>
            ))}
          </>
        )}
      </div>
      </div>

      <BottomNav />
      <FilterSheet visible={showFilters} onClose={() => setShowFilters(false)} filters={filters} setFilters={setFilters} t={t} dark={dark} />

      <style>{`
        @keyframes cardSlideIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes statusBlink{0%,100%{opacity:1}50%{opacity:0.4}}
      `}</style>
    </div>
  );
}
