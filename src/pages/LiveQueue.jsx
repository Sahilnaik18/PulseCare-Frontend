import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Bell, BellOff, MapPin, Clock, Users, CheckCircle, AlertTriangle } from 'lucide-react';
import { appointments } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';
import { haptic } from '../utils/haptics';

function QueueRing({ position, total, color }) {
  const pct = Math.max(0, ((total - position) / total) * 100);
  const r = 54, circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <div style={{ position: 'relative', width: 140, height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="140" height="140" style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
        <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="10" />
        <circle cx="70" cy="70" r={r} fill="none" stroke="white" strokeWidth="10"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 1s ease' }} />
      </svg>
      <div style={{ textAlign: 'center', zIndex: 1 }}>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: 600, margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Your Position</p>
        <p style={{ color: 'white', fontSize: 44, fontWeight: 900, margin: 0, lineHeight: 1, animation: 'numPop 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}>#{position}</p>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, margin: 0 }}>of {total} patients</p>
      </div>
    </div>
  );
}

export default function LiveQueue() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, dark } = useTheme();
  const apt = appointments.find(a => a.id === Number(id)) || appointments[0];

  const [position, setPosition] = useState(apt.queuePosition || 4);
  const [doctorSeeing, setDoctorSeeing] = useState(apt.doctorSeeing || 2);
  const [waitMins, setWaitMins] = useState(apt.estimatedWait || 18);
  const [notifyOn, setNotifyOn] = useState(true);
  const [pulse, setPulse] = useState(false);
  const total = apt.totalQueue || 9;

  // Simulate live queue updates every 12s
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(p => {
        if (p <= 1) { clearInterval(interval); return 1; }
        const next = p - 1;
        setPulse(true);
        setTimeout(() => setPulse(false), 600);
        haptic.light();
        return next;
      });
      setDoctorSeeing(d => d + 1);
      setWaitMins(w => Math.max(1, w - 4));
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const isNext = position === 1;
  const isNear = position <= 2;
  const headerColor = isNext ? 'linear-gradient(135deg,#22C55E,#16A34A)'
    : isNear ? 'linear-gradient(135deg,#F59E0B,#D97706)'
    : t.headerGrad;

  const statusMsg = isNext
    ? { text: "It's your turn now! 🎉", sub: 'Please proceed to the doctor\'s room', icon: CheckCircle, color: '#22C55E' }
    : isNear
    ? { text: 'Almost your turn!', sub: 'Please reach the clinic in 5 minutes', icon: AlertTriangle, color: '#F59E0B' }
    : { text: 'You can relax for now', sub: `We'll notify you when you're near`, icon: Bell, color: t.primary };

  const StatusIcon = statusMsg.icon;

  return (
    <div style={{ background: t.bg, height: '100%', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif', transition: 'background 0.4s ease' }}>
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 24 }}>

        {/* Header */}
        <div style={{ background: headerColor, padding: '52px 20px 32px', transition: 'background 0.6s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <button onClick={() => { haptic.light(); navigate(-1); }} style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,0.2)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <ArrowLeft size={20} color="white" />
            </button>
            <div>
              <p style={{ color: 'white', fontSize: 17, fontWeight: 800, margin: 0 }}>Live Queue</p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, margin: 0 }}>🏥 Clinic Visit Tracking</p>
            </div>
            {/* Live indicator */}
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.2)', borderRadius: 20, padding: '5px 10px' }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22C55E', animation: 'liveBlink 1s ease-in-out infinite' }} />
              <span style={{ color: 'white', fontSize: 11, fontWeight: 700 }}>LIVE</span>
            </div>
          </div>

          {/* Queue ring */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div style={{ animation: pulse ? 'queuePulse 0.6s ease' : 'none' }}>
              <QueueRing position={position} total={total} />
            </div>
            {/* Wait time */}
            <div style={{ display: 'flex', gap: 20 }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, margin: '0 0 2px' }}>Est. Wait</p>
                <p style={{ color: 'white', fontSize: 20, fontWeight: 800, margin: 0 }}>~{waitMins} min</p>
              </div>
              <div style={{ width: 1, background: 'rgba(255,255,255,0.2)' }} />
              <div style={{ textAlign: 'center' }}>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, margin: '0 0 2px' }}>Now Seeing</p>
                <p style={{ color: 'white', fontSize: 20, fontWeight: 800, margin: 0 }}>#{doctorSeeing}</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Doctor card */}
          <div style={{ background: t.bgCard, borderRadius: 18, padding: '16px', boxShadow: t.shadow, display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: dark ? 'rgba(59,130,246,0.15)' : '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>{apt.avatar}</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 15, fontWeight: 800, color: t.text, margin: '0 0 2px' }}>{apt.doctor}</p>
              <p style={{ fontSize: 12, color: t.textSecondary, margin: '0 0 6px' }}>{apt.specialty}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E', animation: 'liveBlink 1.5s ease-in-out infinite' }} />
                <span style={{ fontSize: 11, color: '#22C55E', fontWeight: 600 }}>Doctor is active · Seeing patient #{doctorSeeing}</span>
              </div>
            </div>
          </div>

          {/* Status message */}
          <div style={{ background: `${statusMsg.color}18`, borderRadius: 16, padding: '14px 16px', border: `1px solid ${statusMsg.color}33`, display: 'flex', alignItems: 'flex-start', gap: 12, animation: 'cardSlideIn 0.3s ease-out' }}>
            <StatusIcon size={20} color={statusMsg.color} style={{ flexShrink: 0, marginTop: 1 }} />
            <div>
              <p style={{ fontSize: 14, fontWeight: 800, color: statusMsg.color, margin: '0 0 3px' }}>{statusMsg.text}</p>
              <p style={{ fontSize: 12, color: t.textSecondary, margin: 0 }}>{statusMsg.sub}</p>
            </div>
          </div>

          {/* Queue progress bar */}
          <div style={{ background: t.bgCard, borderRadius: 16, padding: '16px', boxShadow: t.shadow }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: t.text, margin: 0 }}>Queue Progress</p>
              <p style={{ fontSize: 12, color: t.textMuted, margin: 0 }}>{total - position} of {total} done</p>
            </div>
            <div style={{ height: 8, background: dark ? '#334155' : '#F1F5F9', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${((total - position) / total) * 100}%`, background: `linear-gradient(90deg,${t.primary},#22C55E)`, borderRadius: 4, transition: 'width 1s ease' }} />
            </div>
            {/* Patient dots */}
            <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
              {Array.from({ length: total }).map((_, i) => {
                const num = i + 1;
                const isDone = num < position;
                const isCurrent = num === doctorSeeing;
                const isMe = num === position;
                return (
                  <div key={i} style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: isDone ? '#22C55E' : isCurrent ? '#F59E0B' : isMe ? t.primary : (dark ? '#334155' : '#F1F5F9'),
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, fontWeight: 700,
                    color: isDone || isCurrent || isMe ? 'white' : t.textMuted,
                    border: isMe ? `2px solid ${t.primary}` : 'none',
                    boxShadow: isMe ? `0 0 0 3px ${t.primary}33` : 'none',
                    transition: 'all 0.4s ease',
                    animation: isMe ? 'myDot 1.5s ease-in-out infinite' : 'none',
                  }}>
                    {isDone ? '✓' : isCurrent ? '👨‍⚕️' : isMe ? 'Me' : num}
                  </div>
                );
              })}
            </div>
            <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
              {[{ color: '#22C55E', label: 'Done' }, { color: '#F59E0B', label: 'Current' }, { color: t.primary, label: 'You' }, { color: dark ? '#334155' : '#F1F5F9', label: 'Waiting' }].map(l => (
                <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: l.color }} />
                  <span style={{ fontSize: 10, color: t.textMuted }}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Notify toggle */}
          <div style={{ background: t.bgCard, borderRadius: 16, padding: '14px 16px', boxShadow: t.shadow, display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: notifyOn ? (dark ? 'rgba(37,99,235,0.15)' : '#EFF6FF') : (dark ? '#334155' : '#F1F5F9'), display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {notifyOn ? <Bell size={18} color={t.primary} /> : <BellOff size={18} color={t.textMuted} />}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: t.text, margin: '0 0 2px' }}>Notify when near</p>
              <p style={{ fontSize: 11, color: t.textSecondary, margin: 0 }}>Alert when you're 2 positions away</p>
            </div>
            <button onClick={() => { haptic.light(); setNotifyOn(n => !n); }} style={{ width: 44, height: 24, borderRadius: 12, background: notifyOn ? t.primary : (dark ? '#334155' : '#E5E7EB'), border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.3s ease', flexShrink: 0 }}>
              <div style={{ position: 'absolute', top: 3, left: notifyOn ? 23 : 3, width: 18, height: 18, borderRadius: '50%', background: 'white', boxShadow: '0 1px 4px rgba(0,0,0,0.2)', transition: 'left 0.3s ease' }} />
            </button>
          </div>

          {/* Clinic info */}
          <div style={{ background: t.bgCard, borderRadius: 16, padding: '14px 16px', boxShadow: t.shadow, display: 'flex', alignItems: 'center', gap: 12 }}>
            <MapPin size={18} color={t.primary} style={{ flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: t.text, margin: '0 0 2px' }}>Clinic Visit</p>
              <p style={{ fontSize: 11, color: t.textSecondary, margin: 0 }}>Please be present at the clinic. Queue updates in real-time.</p>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes liveBlink{0%,100%{opacity:1}50%{opacity:0.3}}
        @keyframes numPop{from{transform:scale(1.3)}to{transform:scale(1)}}
        @keyframes queuePulse{0%{transform:scale(1)}50%{transform:scale(1.04)}100%{transform:scale(1)}}
        @keyframes myDot{0%,100%{box-shadow:0 0 0 3px ${t.primary}33}50%{box-shadow:0 0 0 6px ${t.primary}11}}
        @keyframes cardSlideIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
    </div>
  );
}
