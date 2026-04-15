import { useTheme } from '../context/ThemeContext';

export default function MobileContainer({ children }) {
  const { dark } = useTheme();
  return (
    <div style={{
      minHeight: '100svh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: dark ? '#020617' : '#E5E7EB',
      transition: 'background 0.4s ease',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '390px',
        height: '100svh',
        maxHeight: '100svh',
        background: dark ? '#0F172A' : 'white',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        borderRadius: '40px',
        boxShadow: dark
          ? '0 0 0 1px #334155, 0 32px 64px rgba(0,0,0,0.7)'
          : '0 0 0 1px #CBD5E1, 0 32px 64px rgba(0,0,0,0.2)',
        transition: 'background 0.4s ease',
      }}>
        {children}
      </div>
    </div>
  );
}
