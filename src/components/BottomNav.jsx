import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Calendar, Play, FileText, Stethoscope } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { haptic } from '../utils/haptics';

const tabs = [
  { label: 'Home',         icon: Home,        path: '/home' },
  { label: 'Appointments', icon: Calendar,    path: '/appointments' },
  { label: 'Videos',       icon: Play,        path: '/videos' },
  { label: 'Reports',      icon: FileText,    path: '/reports' },
  { label: 'Doctors',      icon: Stethoscope, path: '/search' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { t } = useTheme();

  const handleTab = (path) => {
    haptic.tab();
    navigate(path);
  };

  return (
    <div style={{
      width: '100%',
      background: t.navBg,
      borderTop: `1px solid ${t.navBorder}`,
      display: 'flex',
      flexShrink: 0,
      paddingBottom: 'env(safe-area-inset-bottom)',
      boxShadow: `0 -4px 20px rgba(0,0,0,${t.navBg === '#1E293B' ? '0.3' : '0.06'})`,
      transition: 'background 0.4s ease, border-color 0.4s ease',
      zIndex: 100,
    }}>
      {tabs.map(({ label, icon: Icon, path }) => {
        const active = pathname === path;
        return (
          <button key={path} onClick={() => handleTab(path)}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              padding: '10px 0 8px',
              background: 'none', border: 'none', cursor: 'pointer',
              gap: 3,
              WebkitTapHighlightColor: 'transparent',
            }}>
            <div style={{
              width: 36, height: 36, borderRadius: 12,
              background: active ? (t.navBg === '#1E293B' ? 'rgba(59,130,246,0.2)' : '#EFF6FF') : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
              transform: active ? 'scale(1.15) translateY(-2px)' : 'scale(1)',
            }}>
              <Icon size={20} color={active ? t.primary : t.textMuted} strokeWidth={active ? 2.5 : 2} />
            </div>
            <span style={{
              fontSize: 10, fontWeight: active ? 700 : 500,
              color: active ? t.primary : t.textMuted,
              fontFamily: 'Inter, sans-serif',
              transition: 'color 0.2s ease',
            }}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
