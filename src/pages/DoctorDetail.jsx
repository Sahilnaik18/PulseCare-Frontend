import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Heart, Share2, Video, Building2, Clock, CheckCircle } from 'lucide-react';
import { doctors } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';
import { haptic } from '../utils/haptics';
import MapPreviewCard from '../components/MapModal';

const days = [
  { label: 'Mon', date: '23' }, { label: 'Tue', date: '24' }, { label: 'Wed', date: '25' },
  { label: 'Thu', date: '26' }, { label: 'Fri', date: '27' }, { label: 'Sat', date: '28' },
];

function BookingSuccess({ doc, slot, day, mode, t, onDone }) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 400, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: t.bgCard, borderRadius: 24, padding: '32px 24px', textAlign: 'center', width: '100%', animation: 'popIn 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', animation: 'successPulse 0.6s ease-out' }}>
          <CheckCircle size={40} color="#22C55E" />
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: t.text, margin: '0 0 8px' }}>Appointment Booked!</h2>
        <p style={{ fontSize: 14, color: t.textSecondary, margin: '0 0 20px' }}>Your appointment has been confirmed</p>
        <div style={{ background: t.bgSecondary, borderRadius: 16, padding: '16px', marginBottom: 20, textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: `linear-gradient(135deg,${doc.color}33,${doc.color}11)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{doc.avatar}</div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: t.text, margin: 0 }}>{doc.name}</p>
              <p style={{ fontSize: 12, color: t.textSecondary, margin: 0 }}>{doc.specialty}</p>
            </div>
          </div>
          {[
            { label: 'Date', value: `${days[day].label}, Dec ${days[day].date}` },
            { label: 'Time', value: slot },
            { label: 'Mode', value: mode === 'online' ? '🟢 Video Consultation' : '🏥 In-Clinic Visit' },
            { label: 'Fee', value: doc.fee },
          ].map(r => (
            <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: t.textMuted }}>{r.label}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: t.text }}>{r.value}</span>
            </div>
          ))}
        </div>
        <button onClick={onDone} style={{ width: '100%', height: 48, borderRadius: 14, border: 'none', background: 'linear-gradient(135deg,#2563EB,#1E40AF)', color: 'white', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
          View Appointments
        </button>
        {mode === 'offline' && doc.lat && (
          <button onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${doc.lat},${doc.lng}`, '_blank')} style={{ width: '100%', height: 44, borderRadius: 14, border: '1.5px solid #E5E7EB', background: 'none', color: t.text, fontSize: 14, fontWeight: 700, cursor: 'pointer', marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            🗺️ Get Directions to Clinic
          </button>
        )}
      </div>
      <style>{`
        @keyframes popIn{from{transform:scale(0.8);opacity:0}to{transform:scale(1);opacity:1}}
        @keyframes successPulse{0%{transform:scale(0)}60%{transform:scale(1.2)}100%{transform:scale(1)}}
      `}</style>
    </div>
  );
}

export default function DoctorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, dark } = useTheme();
  const doc = doctors.find(d => d.id === Number(id)) || doctors[0];

  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [consultMode, setConsultMode] = useState(doc.mode === 'offline' ? 'offline' : 'online');
  const [saved, setSaved] = useState(false);
  const [booked, setBooked] = useState(false);
  const [activeTab, setActiveTab] = useState('about');

  const allSlots = { ...doc.slots };
  const handleBook = () => {
    if (!selectedSlot) return;
    haptic.success();
    setBooked(true);
  };

  return (
    <div style={{ background: t.bg, height: '100%', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif', transition: 'background 0.4s ease', position: 'relative' }}>
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 16 }}>

      {/* Header */}
      <div style={{ background: t.headerGrad, padding: '52px 20px 28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <button onClick={() => { haptic.light(); navigate(-1); }} style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,0.2)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <ArrowLeft size={20} color="white" />
          </button>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => { haptic.light(); setSaved(s => !s); }} style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,0.2)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Heart size={18} fill={saved ? '#EF4444' : 'none'} color={saved ? '#EF4444' : 'white'} />
            </button>
            <button onClick={() => haptic.light()} style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,0.2)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Share2 size={18} color="white" />
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: `linear-gradient(135deg,${doc.color}44,rgba(255,255,255,0.2))`, border: '3px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>{doc.avatar}</div>
            {doc.available && <div style={{ position: 'absolute', bottom: 3, right: 3, width: 14, height: 14, borderRadius: '50%', background: '#22C55E', border: '2px solid white' }} />}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <h1 style={{ color: 'white', fontSize: 19, fontWeight: 800, margin: 0 }}>{doc.name}</h1>
              {doc.rating >= 4.8 && <span style={{ fontSize: 9, fontWeight: 800, color: '#F59E0B', background: 'rgba(245,158,11,0.25)', borderRadius: 5, padding: '2px 6px' }}>TOP RATED</span>}
            </div>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, margin: '0 0 8px' }}>{doc.specialty} · {doc.experience}</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Star size={13} fill="#F59E0B" color="#F59E0B" />
                <span style={{ color: 'white', fontSize: 13, fontWeight: 700 }}>{doc.rating}</span>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11 }}>({doc.reviews} reviews)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <MapPin size={12} color="rgba(255,255,255,0.7)" />
                <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>{doc.distance}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, padding: '16px 20px 0' }}>
        {[{ label: 'Experience', value: doc.experience }, { label: 'Patients', value: doc.patients }, { label: 'Reviews', value: doc.reviews }].map(s => (
          <div key={s.label} style={{ background: t.bgCard, borderRadius: 14, padding: '12px 10px', textAlign: 'center', boxShadow: t.shadow, transition: 'background 0.4s ease' }}>
            <p style={{ fontSize: 15, fontWeight: 800, color: t.primary, margin: '0 0 2px' }}>{s.value}</p>
            <p style={{ fontSize: 10, color: t.textMuted, margin: 0 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Online/Offline toggle */}
      {doc.mode === 'both' && (
        <div style={{ margin: '16px 20px 0', display: 'flex', background: t.bgSecondary, borderRadius: 14, padding: 4 }}>
          {[{ v: 'online', l: '🟢 Video Consultation' }, { v: 'offline', l: '🏥 In-Clinic Visit' }].map(m => (
            <button key={m.v} onClick={() => { haptic.tab(); setConsultMode(m.v); }} style={{ flex: 1, padding: '10px', borderRadius: 11, border: 'none', cursor: 'pointer', background: consultMode === m.v ? t.primary : 'transparent', color: consultMode === m.v ? 'white' : t.textSecondary, fontSize: 12, fontWeight: 700, transition: 'all 0.2s ease' }}>{m.l}</button>
          ))}
        </div>
      )}

      {/* Mode info */}
      <div style={{ margin: '12px 20px 0', background: t.bgCard, borderRadius: 14, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: t.shadow }}>
        {consultMode === 'online' ? <Video size={18} color="#2563EB" /> : <Building2 size={18} color="#F97316" />}
        <div>
          <p style={{ fontSize: 13, fontWeight: 700, color: t.text, margin: 0 }}>{consultMode === 'online' ? 'Video Consultation' : 'In-Clinic Visit'}</p>
          <p style={{ fontSize: 11, color: t.textSecondary, margin: 0 }}>{consultMode === 'online' ? 'Connect via secure video call' : doc.clinic}</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ margin: '16px 20px 0', display: 'flex', gap: 0, background: t.bgSecondary, borderRadius: 14, padding: 4 }}>
        {[{ v: 'about', l: 'About' }, { v: 'reviews', l: 'Reviews' }, { v: 'book', l: 'Book' }].map(tab => (
          <button key={tab.v} onClick={() => { haptic.tab(); setActiveTab(tab.v); }} style={{ flex: 1, padding: '9px', borderRadius: 11, border: 'none', cursor: 'pointer', background: activeTab === tab.v ? t.bgCard : 'transparent', color: activeTab === tab.v ? t.text : t.textMuted, fontSize: 13, fontWeight: 700, transition: 'all 0.2s ease', boxShadow: activeTab === tab.v ? t.shadow : 'none' }}>{tab.l}</button>
        ))}
      </div>

      <div style={{ padding: '16px 20px 0' }}>

        {/* About tab */}
        {activeTab === 'about' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ background: t.bgCard, borderRadius: 18, padding: '16px', boxShadow: t.shadow }}>
              <h3 style={{ fontSize: 14, fontWeight: 800, color: t.text, margin: '0 0 10px' }}>About</h3>
              <p style={{ fontSize: 13, color: t.textSecondary, lineHeight: 1.7, margin: 0 }}>{doc.about}</p>
            </div>
            <div style={{ background: t.bgCard, borderRadius: 18, padding: '16px', boxShadow: t.shadow }}>
              <h3 style={{ fontSize: 14, fontWeight: 800, color: t.text, margin: '0 0 12px' }}>Education</h3>
              {doc.education.map((e, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: i < doc.education.length - 1 ? 10 : 0 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: t.primary, marginTop: 5, flexShrink: 0 }} />
                  <p style={{ fontSize: 13, color: t.text, margin: 0, lineHeight: 1.5 }}>{e}</p>
                </div>
              ))}
            </div>

            {/* Clinic Location */}
            {(consultMode === 'offline' || doc.mode === 'offline' || doc.mode === 'both') && doc.lat && (
              <div style={{ background: t.bgCard, borderRadius: 18, padding: '16px', boxShadow: t.shadow }}>
                <h3 style={{ fontSize: 14, fontWeight: 800, color: t.text, margin: '0 0 12px' }}>Clinic Location</h3>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <MapPin size={16} color={doc.color} style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: t.text, margin: '0 0 3px' }}>{doc.clinic?.split(',')[0]}</p>
                    <p style={{ fontSize: 12, color: t.textSecondary, margin: 0, lineHeight: 1.5 }}>{doc.clinicAddress}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Reviews tab */}
        {activeTab === 'reviews' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {doc.reviewList.map((r, i) => (
              <div key={i} style={{ background: t.bgCard, borderRadius: 16, padding: '14px 16px', boxShadow: t.shadow, animation: 'cardSlideIn 0.3s ease-out both', animationDelay: `${i * 0.07}s` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: dark ? '#334155' : '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{r.avatar}</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: t.text, margin: 0 }}>{r.user}</p>
                    <div style={{ display: 'flex', gap: 2 }}>
                      {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={10} fill={j < r.rating ? '#F59E0B' : 'none'} color={j < r.rating ? '#F59E0B' : t.border} />)}
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: t.textSecondary, margin: 0, lineHeight: 1.5 }}>{r.comment}</p>
              </div>
            ))}
          </div>
        )}

        {/* Book tab */}
        {activeTab === 'book' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Day selector */}
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: t.text, margin: '0 0 10px' }}>Select Date</p>
              <div style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none' }}>
                {days.map((d, i) => (
                  <button key={i} onClick={() => { haptic.light(); setSelectedDay(i); setSelectedSlot(null); }} style={{ flexShrink: 0, width: 52, padding: '10px 0', borderRadius: 14, border: `1.5px solid ${selectedDay === i ? t.primary : t.border}`, background: selectedDay === i ? t.primary : t.bgCard, color: selectedDay === i ? 'white' : t.text, cursor: 'pointer', transition: 'all 0.2s ease', textAlign: 'center' }}>
                    <p style={{ fontSize: 10, margin: '0 0 2px', fontWeight: 600, opacity: 0.8 }}>{d.label}</p>
                    <p style={{ fontSize: 15, margin: 0, fontWeight: 800 }}>{d.date}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Time slots */}
            {[{ label: '🌅 Morning', slots: allSlots.morning }, { label: '☀️ Afternoon', slots: allSlots.afternoon }, { label: '🌆 Evening', slots: allSlots.evening }].map(group => (
              group.slots?.length > 0 && (
                <div key={group.label}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: t.textMuted, margin: '0 0 8px' }}>{group.label}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {group.slots.map(slot => (
                      <button key={slot} onClick={() => { haptic.medium(); setSelectedSlot(slot); }} style={{ padding: '8px 14px', borderRadius: 12, border: `1.5px solid ${selectedSlot === slot ? t.primary : t.border}`, background: selectedSlot === slot ? (dark ? 'rgba(37,99,235,0.2)' : '#EFF6FF') : t.bgCard, color: selectedSlot === slot ? t.primary : t.text, fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, transition: 'all 0.15s ease' }}>
                        <Clock size={10} />{slot}
                      </button>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        )}
      </div>

      </div>{/* end scroll wrapper */}

      {/* Bottom bar — part of flex layout, always visible */}
      <div style={{ flexShrink: 0, padding: '12px 20px 20px', background: t.navBg, borderTop: `1px solid ${t.navBorder}`, transition: 'background 0.4s ease' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div>
            <p style={{ fontSize: 11, color: t.textMuted, margin: 0 }}>Consultation Fee</p>
            <p style={{ fontSize: 20, fontWeight: 800, color: t.text, margin: 0 }}>{doc.fee}</p>
          </div>
          {selectedSlot && (
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 11, color: t.textMuted, margin: 0 }}>Selected</p>
              <p style={{ fontSize: 13, fontWeight: 700, color: t.primary, margin: 0 }}>{selectedSlot} · {days[selectedDay].label} {days[selectedDay].date}</p>
            </div>
          )}
        </div>
        <button onClick={handleBook} style={{ width: '100%', height: 50, borderRadius: 16, border: 'none', background: selectedSlot ? 'linear-gradient(135deg,#2563EB,#1E40AF)' : t.chipBg, color: selectedSlot ? 'white' : t.textMuted, fontSize: 15, fontWeight: 700, cursor: selectedSlot ? 'pointer' : 'not-allowed', transition: 'all 0.3s ease', boxShadow: selectedSlot ? '0 6px 20px rgba(37,99,235,0.4)' : 'none' }}
          onMouseDown={e => selectedSlot && (e.currentTarget.style.transform = 'scale(0.98)')}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          {selectedSlot ? `Book Appointment · ${consultMode === 'online' ? 'Video' : 'Clinic'}` : 'Select a time slot to book'}
        </button>
      </div>

      {booked && <BookingSuccess doc={doc} slot={selectedSlot} day={selectedDay} mode={consultMode} t={t} onDone={() => { setBooked(false); navigate('/appointments'); }} />}

      <style>{`
        @keyframes cardSlideIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
    </div>
  );
}
