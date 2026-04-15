import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('pulsecare-theme');
    if (saved) return saved === 'dark';
    return false; // default light
  });

  useEffect(() => {
    localStorage.setItem('pulsecare-theme', dark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, [dark]);

  const toggle = () => setDark(d => !d);

  // Theme tokens
  const t = dark ? {
    bg: '#0F172A',
    bgSecondary: '#1E293B',
    bgCard: '#1E293B',
    bgCardHover: '#263348',
    bgInput: '#1E293B',
    border: '#334155',
    text: '#F1F5F9',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    primary: '#3B82F6',
    primaryGrad: 'linear-gradient(135deg,#2563EB,#1D4ED8)',
    headerGrad: 'linear-gradient(135deg,#1E3A8A,#1E40AF)',
    navBg: '#1E293B',
    navBorder: '#334155',
    chipBg: '#334155',
    chipText: '#94A3B8',
    shadow: '0 2px 12px rgba(0,0,0,0.4)',
    shadowLg: '0 8px 32px rgba(0,0,0,0.5)',
    uploadBg: '#1E3A8A22',
    uploadBorder: '#3B82F6',
    skeletonBase: '#1E293B',
    skeletonShimmer: '#263348',
  } : {
    bg: '#F8FAFF',
    bgSecondary: '#F1F5F9',
    bgCard: '#FFFFFF',
    bgCardHover: '#F8FAFF',
    bgInput: '#F8FAFF',
    border: '#E5E7EB',
    text: '#111827',
    textSecondary: '#6B7280',
    textMuted: '#9CA3AF',
    primary: '#2563EB',
    primaryGrad: 'linear-gradient(135deg,#2563EB,#1E40AF)',
    headerGrad: 'linear-gradient(135deg,#2563EB,#1E40AF)',
    navBg: '#FFFFFF',
    navBorder: '#F1F5F9',
    chipBg: '#F1F5F9',
    chipText: '#6B7280',
    shadow: '0 2px 12px rgba(0,0,0,0.06)',
    shadowLg: '0 8px 32px rgba(37,99,235,0.35)',
    uploadBg: '#EFF6FF',
    uploadBorder: '#BFDBFE',
    skeletonBase: '#F1F5F9',
    skeletonShimmer: '#E2E8F0',
  };

  return (
    <ThemeContext.Provider value={{ dark, toggle, t }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
