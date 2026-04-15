// Animated empty state component for appointments, reports, search
export default function EmptyState({ type = 'appointments', onAction, actionLabel, dark = false }) {
  const configs = {
    appointments: {
      emoji: '📅',
      title: 'No appointments yet',
      subtitle: 'Book a doctor to get started',
      color: '#3B82F6',
      bg: dark ? '#1E3A8A22' : '#EFF6FF',
      orbs: ['#3B82F6', '#60A5FA', '#93C5FD'],
    },
    reports: {
      emoji: '📂',
      title: 'No reports found',
      subtitle: 'Upload your health records here',
      color: '#10B981',
      bg: dark ? '#06402022' : '#F0FDF4',
      orbs: ['#10B981', '#34D399', '#6EE7B7'],
    },
    search: {
      emoji: '🔍',
      title: 'No results found',
      subtitle: 'Try a different name or specialty',
      color: '#8B5CF6',
      bg: dark ? '#4C1D9522' : '#F5F3FF',
      orbs: ['#8B5CF6', '#A78BFA', '#C4B5FD'],
    },
  };

  const c = configs[type];

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '48px 24px', textAlign: 'center',
    }}>
      {/* Animated illustration */}
      <div style={{ position: 'relative', width: 120, height: 120, marginBottom: 24 }}>
        {/* Background circle */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          background: c.bg,
          animation: 'emptyPulse 3s ease-in-out infinite',
        }} />
        {/* Floating orbs */}
        {c.orbs.map((color, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: 10, height: 10, borderRadius: '50%',
            background: color, opacity: 0.6,
            top: `${[15, 70, 40][i]}%`,
            left: `${[75, 80, 10][i]}%`,
            animation: `emptyOrb${i} ${2 + i * 0.5}s ease-in-out infinite`,
          }} />
        ))}
        {/* Main emoji */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 48,
          animation: 'emptyBounce 2.5s ease-in-out infinite',
        }}>{c.emoji}</div>
      </div>

      <p style={{ fontSize: 17, fontWeight: 700, color: dark ? '#F1F5F9' : '#374151', margin: '0 0 8px' }}>{c.title}</p>
      <p style={{ fontSize: 13, color: dark ? '#64748B' : '#9CA3AF', margin: '0 0 24px' }}>{c.subtitle}</p>

      {onAction && (
        <button onClick={onAction} style={{
          padding: '12px 28px', borderRadius: 14, border: 'none',
          background: `linear-gradient(135deg,${c.color},${c.color}cc)`,
          color: 'white', fontSize: 14, fontWeight: 700, cursor: 'pointer',
          boxShadow: `0 4px 16px ${c.color}44`,
          transition: 'transform 0.15s ease',
        }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.96)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
        >{actionLabel || 'Get Started'}</button>
      )}

      <style>{`
        @keyframes emptyPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.06)} }
        @keyframes emptyBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes emptyOrb0 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-6px,-8px)} }
        @keyframes emptyOrb1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(6px,-6px)} }
        @keyframes emptyOrb2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(4px,8px)} }
      `}</style>
    </div>
  );
}
