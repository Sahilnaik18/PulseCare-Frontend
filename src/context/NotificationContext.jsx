import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { haptic } from '../utils/haptics';

const NotificationContext = createContext(null);

const INITIAL = [
  { id: 1,  type: 'appointment', title: 'Appointment Tomorrow', message: 'Your consultation with Dr. Arjun Mehta is tomorrow at 11:30 AM', time: '2h ago',  read: false, link: '/appointments', icon: '📅' },
  { id: 2,  type: 'queue',       title: 'Queue Update',         message: "You are now #4 in line at Dr. Priya Sharma's clinic",           time: '5m ago',  read: false, link: '/appointments', icon: '⏳' },
  { id: 3,  type: 'message',     title: 'Dr. Priya Sharma',     message: 'Please bring your previous ECG reports for the consultation',   time: '1h ago',  read: false, link: '/appointments', icon: '💬' },
  { id: 4,  type: 'appointment', title: 'Appointment Reminder',  message: 'Your appointment with Dr. Sneha Patel starts in 10 minutes',   time: '10m ago', read: true,  link: '/appointments', icon: '📅' },
  { id: 5,  type: 'queue',       title: "Almost Your Turn!",     message: "Get ready! You're #2 in line. Please head to the clinic",      time: '3m ago',  read: true,  link: '/appointments', icon: '⏳' },
  { id: 6,  type: 'message',     title: 'Dr. Rahul Gupta',       message: 'Doctor is running 10 minutes late today. Apologies for the delay', time: '30m ago', read: true, link: '/appointments', icon: '💬' },
  { id: 7,  type: 'appointment', title: 'Booking Confirmed',     message: 'Your appointment with Dr. Kavya Reddy on Dec 28 is confirmed', time: '1d ago',  read: true,  link: '/appointments', icon: '✅' },
  { id: 8,  type: 'queue',       title: "It's Your Turn!",       message: 'Please proceed to Dr. Priya Sharma\'s room now',              time: '2d ago',  read: true,  link: '/queue/1',      icon: '🔔' },
];

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(INITIAL);
  const [settings, setSettings] = useState({ appointments: true, queue: true, messages: true, sound: true, vibration: true });
  const [toast, setToast] = useState(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markRead = useCallback((id) => {
    setNotifications(ns => ns.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications(ns => ns.map(n => ({ ...n, read: true })));
  }, []);

  const deleteNotif = useCallback((id) => {
    setNotifications(ns => ns.filter(n => n.id !== id));
  }, []);

  const push = useCallback((notif) => {
    const n = { ...notif, id: Date.now(), time: 'Just now', read: false };
    setNotifications(ns => [n, ...ns]);
    setToast(n);
    if (settings.vibration) {
      if (notif.type === 'queue') haptic.medium();
      else haptic.light();
    }
    setTimeout(() => setToast(null), 4000);
  }, [settings]);

  // Simulate live queue notification after 20s
  useEffect(() => {
    const t = setTimeout(() => {
      if (settings.queue) {
        push({ type: 'queue', title: 'Queue Update', message: "You are now #3 in line. Approx 12 min wait.", link: '/queue/1', icon: '⏳' });
      }
    }, 20000);
    return () => clearTimeout(t);
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markRead, markAllRead, deleteNotif, push, settings, setSettings }}>
      {children}
      {toast && <ToastBanner toast={toast} onDismiss={() => setToast(null)} />}
    </NotificationContext.Provider>
  );
}

function ToastBanner({ toast, onDismiss }) {
  const typeColor = { appointment: '#2563EB', queue: '#F97316', message: '#8B5CF6' };
  const color = typeColor[toast.type] || '#2563EB';
  return (
    <div onClick={onDismiss} style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 999, padding: '52px 16px 0', pointerEvents: 'auto', animation: 'toastSlide 0.35s cubic-bezier(0.34,1.56,0.64,1)' }}>
      <div style={{ background: 'rgba(15,23,42,0.96)', backdropFilter: 'blur(12px)', borderRadius: 16, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 8px 32px rgba(0,0,0,0.4)', border: `1px solid ${color}44` }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: `${color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{toast.icon}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'white', margin: '0 0 2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{toast.title}</p>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{toast.message}</p>
        </div>
        <div style={{ width: 4, height: 36, borderRadius: 2, background: color, flexShrink: 0 }} />
      </div>
      <style>{`@keyframes toastSlide{from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}

export const useNotifications = () => useContext(NotificationContext);
