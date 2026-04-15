// Pure CSS AI brain + pulse animation — no external deps
export default function AIBrainAnimation({ size = 80 }) {
  return (
    <div style={{ width: size, height: size, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Outer glow ring */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
        animation: 'aiBreathe 2.5s ease-in-out infinite',
      }} />
      {/* Pulse rings */}
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          border: '1.5px solid rgba(59,130,246,0.3)',
          animation: `aiRing 2.5s ease-out ${i * 0.7}s infinite`,
        }} />
      ))}
      {/* Brain icon */}
      <div style={{
        width: size * 0.55, height: size * 0.55,
        borderRadius: '50%',
        background: 'linear-gradient(135deg,#3B82F6,#1E40AF)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: size * 0.3,
        boxShadow: '0 4px 20px rgba(59,130,246,0.5)',
        animation: 'aiFloat 3s ease-in-out infinite',
        zIndex: 1,
      }}>🧠</div>
      {/* ECG line */}
      <svg style={{ position: 'absolute', bottom: 2, left: 0, width: '100%', opacity: 0.6 }} height="14" viewBox="0 0 80 14">
        <polyline
          points="0,7 12,7 18,2 22,12 26,2 30,7 42,7 48,4 52,10 56,4 60,7 80,7"
          fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ animation: 'ecgDraw 2s linear infinite' }}
        />
      </svg>
      <style>{`
        @keyframes aiBreathe { 0%,100%{transform:scale(1);opacity:0.6} 50%{transform:scale(1.15);opacity:1} }
        @keyframes aiRing { 0%{transform:scale(0.6);opacity:0.8} 100%{transform:scale(1.4);opacity:0} }
        @keyframes aiFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        @keyframes ecgDraw { 0%{stroke-dashoffset:200} 100%{stroke-dashoffset:0} }
      `}</style>
    </div>
  );
}
