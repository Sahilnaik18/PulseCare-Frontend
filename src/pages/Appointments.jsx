import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, X, RefreshCw, Users, Video, Building2 } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import EmptyState from '../components/EmptyState';
import { appointments } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';
import { haptic } from '../utils/haptics';

// Countdown timer for online appointments
function Countdown({ scheduledTime }) {
  const [secs, setSecs] = useState(() => {
    // Simulate 25 mins remaining
    return 25 * 60;
  });
  useEffect(() => {
    const t = setInterval(() => setSecs(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  const m = Math.floor(secs / 60), s = secs % 60;
  const pct = ((25 * 60 - secs) / (25 * 60)) * 100;
  const urgent = secs < 5 * 60;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: urgent ? '#EF4444' : '#22C55E', borderRadius: 2, transition: 'width 1s linear' }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 800, color: urgent ? '#EF4444' : '#22C55E', minWidth: 48 }}>
        {m}:{s.toString().padStart(2, '0')}
      </span>
    </div>
  );
}

export default function AppointmentsPage() {
  const navigate = useNavigate();
  const { t, dark } = useTheme();
  const [tab, setTab] = useState('upcoming');
  const [list, setList] = useState(appointments);

  const cancel = (id) => {
    haptic.medium();
    setList(l => l.filter(a => a.id !== id));
  };

  const past = [
    { id: 10, doctor: 'Dr. Rahul Gupta',  specialty: 'Orthopedic',   date: 'Dec 10', time: '10:00 AM', status: 'Completed', avatar: '👨‍⚕️', type: 'offline' },
    { id: 11, doctor: 'Dr. Kavya Reddy',  specialty: 'Pediatrician', date: 'Nov 28', time: '3:30 PM',  status: 'Completed', avatar: '👩‍⚕️', type: 'online' },
  ];

  const shown = tab === 'upcoming' ? list : past;
  const statusColor = (s) => s === 'Confirmed' ? '#22C55E' : s === 'Pending' ? '#F59E0B' : '#94A3B8';
  const statusBg = (s) => s === 'Confirmed' ? (dark ? '#052e1622' : '#F0FDF4') : s === 'Pending' ? (dark ? '#45200522' : '#FFFBEB') : (dark ? '#1E293B' : '#F8FAFF');

  return (
    <div style={{ background: t.bg, height: '100%', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif', transition: 'background 0.4s ease' }}>
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 16 }}>

        {/* Header */}
        <div style={{ background: t.headerGrad, padding: '52px 20px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <button onClick={() => { haptic.light(); navigate(-1); }} style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,0.2)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <ArrowLeft size={20} color="white" />
            </button>
            <h1 style={{ color: 'white', fontSize: 20, fontWeight: 800, margin: 0 }}>Appointments</h1>
          </div>
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.15)', borderRadius: 14, padding: 4 }}>
            {['upcoming', 'past'].map(tabName => (
              <button key={tabName} onClick={() => { haptic.tab(); setTab(tabName); }} style={{ flex: 1, padding: '10px', borderRadius: 11, border: 'none', cursor: 'pointer', background: tab === tabName ? 'white' : 'transparent', color: tab === tabName ? '#2563EB' : 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: 700, textTransform: 'capitalize', transition: 'all 0.2s ease' }}>{tabName}</button>
            ))}
          </div>
        </div>

        <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {shown.length === 0 ? (
            <EmptyState type="appointments" dark={dark} onAction={() => { haptic.medium(); navigate('/search'); }} actionLabel="Book a Doctor" />
          ) : shown.map((apt, idx) => (
            <div key={apt.id} style={{ background: t.bgCard, borderRadius: 18, padding: '16px', boxShadow: t.shadow, borderLeft: `4px solid ${statusColor(apt.status)}`, animation: 'cardSlideIn 0.35s ease-out both', animationDelay: `${idx * 0.07}s` }}>

              {/* Doctor row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: dark ? 'rgba(59,130,246,0.15)' : '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{apt.avatar}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 15, fontWeight: 700, color: t.text, margin: '0 0 2px' }}>{apt.doctor}</p>
                  <p style={{ fontSize: 12, color: t.textSecondary, margin: 0 }}>{apt.specialty}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 8, background: statusBg(apt.status), color: statusColor(apt.status) }}>{apt.status}</span>
                  {/* Type badge */}
                  <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 6, background: apt.type === 'offline' ? (dark ? 'rgba(249,115,22,0.15)' : '#FFF7ED') : (dark ? 'rgba(37,99,235,0.15)' : '#EFF6FF'), color: apt.type === 'offline' ? '#F97316' : t.primary, display: 'flex', alignItems: 'center', gap: 3 }}>
                    {apt.type === 'offline' ? <><Building2 size={9} /> Clinic</> : <><Video size={9} /> Online</>}
                  </span>
                </div>
              </div>

              {/* Date/time row */}
              <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Calendar size={13} color={t.textMuted} />
                  <span style={{ fontSize: 12, color: t.textSecondary }}>{apt.date}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Clock size={13} color={t.textMuted} />
                  <span style={{ fontSize: 12, color: t.textSecondary }}>{apt.time}</span>
                </div>
              </div>

              {/* ── OFFLINE: Queue info + button ── */}
              {apt.type === 'offline' && tab === 'upcoming' && (
                <div style={{ marginBottom: 12 }}>
                  <div style={{ background: dark ? 'rgba(249,115,22,0.1)' : '#FFF7ED', borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, border: `1px solid ${dark ? 'rgba(249,115,22,0.2)' : '#FED7AA'}` }}>
                    <Users size={15} color="#F97316" />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 12, fontWeight: 700, color: '#F97316', margin: '0 0 1px' }}>Queue Position #{apt.queuePosition}</p>
                      <p style={{ fontSize: 11, color: t.textSecondary, margin: 0 }}>~{apt.estimatedWait} min wait · {apt.totalQueue} patients total</p>
                    </div>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E', animation: 'liveBlink 1s ease-in-out infinite' }} />
                  </div>
                  <button onClick={() => { haptic.medium(); navigate(`/queue/${apt.id}`); }} style={{ width: '100%', height: 40, borderRadius: 12, border: 'none', background: 'linear-gradient(135deg,#F97316,#EA580C)', color: 'white', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, boxShadow: '0 4px 14px rgba(249,115,22,0.35)' }}>
                    <Users size={14} /> View Live Queue
                  </button>
                </div>
              )}

              {/* ── ONLINE: Countdown + Join ── */}
              {apt.type === 'online' && tab === 'upcoming' && (
                <div style={{ marginBottom: 12 }}>
                  <div style={{ background: dark ? 'rgba(37,99,235,0.1)' : '#EFF6FF', borderRadius: 12, padding: '10px 14px', marginBottom: 10, border: `1px solid ${dark ? 'rgba(37,99,235,0.2)' : '#BFDBFE'}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <p style={{ fontSize: 12, fontWeight: 700, color: t.primary, margin: 0 }}>Consultation at {apt.scheduledTime}</p>
                      <Video size={14} color={t.primary} />
                    </div>
                    <Countdown scheduledTime={apt.scheduledTime} />
                  </div>
                  <button onClick={() => haptic.success()} style={{ width: '100%', height: 40, borderRadius: 12, border: 'none', background: t.primaryGrad, color: 'white', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, boxShadow: '0 4px 14px rgba(37,99,235,0.35)' }}>
                    <Video size={14} /> Join Video Call
                  </button>
                </div>
              )}

              {/* Cancel / Reschedule */}
              {tab === 'upcoming' && (
                <div style={{ display: 'flex', gap: 10 }}>
                  <button onClick={() => cancel(apt.id)} style={{ flex: 1, height: 36, borderRadius: 10, border: `1.5px solid ${dark ? '#7f1d1d' : '#FEE2E2'}`, background: dark ? '#7f1d1d22' : '#FFF5F5', color: '#EF4444', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}
                    onMouseDown={e => e.currentTarget.style.transform = 'scale(0.96)'}
                    onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                  ><X size={13} /> Cancel</button>
                  <button onClick={() => haptic.light()} style={{ flex: 1, height: 36, borderRadius: 10, border: `1.5px solid ${dark ? '#1e3a8a' : '#DBEAFE'}`, background: dark ? '#1e3a8a22' : '#EFF6FF', color: t.primary, fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}
                    onMouseDown={e => e.currentTarget.style.transform = 'scale(0.96)'}
                    onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                  ><RefreshCw size={13} /> Reschedule</button>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
      <BottomNav />
      <style>{`
        @keyframes cardSlideIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes liveBlink{0%,100%{opacity:1}50%{opacity:0.4}}
      `}</style>
    </div>
  );
}
