import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, BellOff, Check, Trash2, Settings } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNotifications } from '../context/NotificationContext';
import { haptic } from '../utils/haptics';

const TYPE_CONFIG = {
  appointment: { color: '#2563EB', bg: 'rgba(37,99,235,0.12)',  label: 'Appointment' },
  queue:       { color: '#F97316', bg: 'rgba(249,115,22,0.12)', label: 'Queue' },
  message:     { color: '#8B5CF6', bg: 'rgba(139,92,246,0.12)', label: 'Message' },
};

export default function NotificationsPage() {
  const navigate = useNavigate();
  const { t, dark } = useTheme();
  const { notifications, unreadCount, markRead, markAllRead, deleteNotif } = useNotifications();
  const [filter, setFilter] = useState('all');
  const [showSettings, setShowSettings] = useState(false);

  const filtered = filter === 'all' ? notifications : notifications.filter(n => n.type === filter);
  const groups = [
    { key: 'unread', label: 'New', items: filtered.filter(n => !n.read) },
    { key: 'read',   label: 'Earlier', items: filtered.filter(n => n.read) },
  ].filter(g => g.items.length > 0);

  return (
    <div style={{ background: t.bg, height: '100%', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif', transition: 'background 0.4s ease' }}>
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 24 }}>

        {/* Header */}
        <div style={{ background: t.headerGrad, padding: '52px 20px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button onClick={() => { haptic.light(); navigate(-1); }} style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,0.2)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <ArrowLeft size={20} color="white" />
              </button>
              <div>
                <h1 style={{ color: 'white', fontSize: 20, fontWeight: 800, margin: 0 }}>Notifications</h1>
                {unreadCount > 0 && <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, margin: 0 }}>{unreadCount} unread</p>}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {unreadCount > 0 && (
                <button onClick={() => { haptic.light(); markAllRead(); }} style={{ height: 36, padding: '0 12px', borderRadius: 10, background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Check size={13} /> All read
                </button>
              )}
              <button onClick={() => { haptic.light(); setShowSettings(true); }} style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.2)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <Settings size={16} color="white" />
              </button>
            </div>
          </div>

          {/* Filter chips */}
          <div style={{ display: 'flex', gap: 8 }}>
            {[{ v: 'all', l: 'All' }, { v: 'appointment', l: '📅 Appointments' }, { v: 'queue', l: '⏳ Queue' }, { v: 'message', l: '💬 Messages' }].map(f => (
              <button key={f.v} onClick={() => { haptic.tab(); setFilter(f.v); }} style={{ flexShrink: 0, padding: '6px 14px', borderRadius: 20, border: 'none', cursor: 'pointer', background: filter === f.v ? 'white' : 'rgba(255,255,255,0.15)', color: filter === f.v ? '#2563EB' : 'rgba(255,255,255,0.85)', fontSize: 12, fontWeight: 700, transition: 'all 0.2s ease' }}>{f.l}</button>
            ))}
          </div>
        </div>

        <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div style={{ fontSize: 52, marginBottom: 12 }}>🔔</div>
              <p style={{ fontSize: 16, fontWeight: 700, color: t.text, margin: '0 0 6px' }}>All caught up!</p>
              <p style={{ fontSize: 13, color: t.textMuted, margin: 0 }}>No notifications here</p>
            </div>
          ) : groups.map(group => (
            <div key={group.key}>
              <p style={{ fontSize: 12, fontWeight: 800, color: t.textMuted, margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{group.label}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {group.items.map((n, idx) => {
                  const cfg = TYPE_CONFIG[n.type] || TYPE_CONFIG.appointment;
                  return (
                    <div key={n.id} onClick={() => { haptic.light(); markRead(n.id); navigate(n.link); }} style={{ background: n.read ? t.bgCard : (dark ? `${cfg.color}18` : `${cfg.color}08`), borderRadius: 16, padding: '14px 16px', boxShadow: t.shadow, cursor: 'pointer', display: 'flex', alignItems: 'flex-start', gap: 12, border: n.read ? `1px solid transparent` : `1px solid ${cfg.color}33`, animation: 'cardSlideIn 0.3s ease-out both', animationDelay: `${idx * 0.05}s`, transition: 'background 0.2s ease', position: 'relative' }}>
                      {/* Unread dot */}
                      {!n.read && <div style={{ position: 'absolute', top: 14, right: 14, width: 8, height: 8, borderRadius: '50%', background: cfg.color }} />}
                      {/* Icon */}
                      <div style={{ width: 42, height: 42, borderRadius: 13, background: cfg.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{n.icon}</div>
                      {/* Content */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                          <p style={{ fontSize: 13, fontWeight: n.read ? 600 : 800, color: t.text, margin: 0 }}>{n.title}</p>
                          <span style={{ fontSize: 9, fontWeight: 700, color: cfg.color, background: cfg.bg, borderRadius: 5, padding: '1px 6px', flexShrink: 0 }}>{cfg.label}</span>
                        </div>
                        <p style={{ fontSize: 12, color: t.textSecondary, margin: '0 0 5px', lineHeight: 1.5 }}>{n.message}</p>
                        <p style={{ fontSize: 10, color: t.textMuted, margin: 0 }}>{n.time}</p>
                      </div>
                      {/* Delete */}
                      <button onClick={e => { e.stopPropagation(); haptic.light(); deleteNotif(n.id); }} style={{ width: 28, height: 28, borderRadius: 8, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, opacity: 0.4 }}>
                        <Trash2 size={13} color={t.textMuted} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings sheet */}
      {showSettings && <NotifSettings t={t} dark={dark} onClose={() => setShowSettings(false)} />}

      <style>{`@keyframes cardSlideIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}

function NotifSettings({ t, dark, onClose }) {
  const { settings, setSettings } = useNotifications();
  const toggle = (key) => { haptic.light(); setSettings(s => ({ ...s, [key]: !s[key] })); };
  const rows = [
    { key: 'appointments', icon: '📅', label: 'Appointment Reminders', sub: '24h, 1h, 10min before' },
    { key: 'queue',        icon: '⏳', label: 'Queue Updates',          sub: 'Offline visits only' },
    { key: 'messages',     icon: '💬', label: 'Doctor Messages',        sub: 'Chat and updates' },
    { key: 'vibration',    icon: '📳', label: 'Vibration',              sub: 'Haptic feedback' },
    { key: 'sound',        icon: '🔊', label: 'Sound',                  sub: 'Notification sounds' },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 300, display: 'flex', alignItems: 'flex-end' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} />
      <div style={{ position: 'relative', width: '100%', background: t.bgCard, borderRadius: '24px 24px 0 0', padding: '20px 20px 36px', animation: 'slideUp 0.3s ease-out' }}>
        <div style={{ width: 40, height: 4, background: t.border, borderRadius: 2, margin: '0 auto 20px' }} />
        <h3 style={{ fontSize: 17, fontWeight: 800, color: t.text, margin: '0 0 16px' }}>Notification Settings</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {rows.map(r => (
            <div key={r.key} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: `1px solid ${t.border}` }}>
              <span style={{ fontSize: 20, flexShrink: 0 }}>{r.icon}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: t.text, margin: '0 0 2px' }}>{r.label}</p>
                <p style={{ fontSize: 11, color: t.textMuted, margin: 0 }}>{r.sub}</p>
              </div>
              <button onClick={() => toggle(r.key)} style={{ width: 44, height: 24, borderRadius: 12, background: settings[r.key] ? '#2563EB' : (dark ? '#334155' : '#E5E7EB'), border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.3s ease', flexShrink: 0 }}>
                <div style={{ position: 'absolute', top: 3, left: settings[r.key] ? 23 : 3, width: 18, height: 18, borderRadius: '50%', background: 'white', boxShadow: '0 1px 4px rgba(0,0,0,0.2)', transition: 'left 0.3s ease' }} />
              </button>
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}`}</style>
    </div>
  );
}
