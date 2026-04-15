// Skeleton loader for location/doctor fetching
export default function SkeletonLoader({ dark = false }) {
  const base = dark ? '#1E293B' : '#F1F5F9';
  const shine = dark ? '#263348' : '#E2E8F0';

  const Bar = ({ w = '100%', h = 14, r = 8, mb = 0 }) => (
    <div style={{
      width: w, height: h, borderRadius: r,
      background: `linear-gradient(90deg, ${base} 25%, ${shine} 50%, ${base} 75%)`,
      backgroundSize: '200% 100%',
      animation: 'shimmerSlide 1.4s ease-in-out infinite',
      marginBottom: mb,
    }} />
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '0 0 4px' }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          background: dark ? '#1E293B' : 'white',
          borderRadius: 18, padding: 16,
          display: 'flex', alignItems: 'center', gap: 14,
          boxShadow: dark ? '0 2px 12px rgba(0,0,0,0.4)' : '0 2px 12px rgba(0,0,0,0.06)',
        }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: base, flexShrink: 0, animation: 'shimmerSlide 1.4s ease-in-out infinite', backgroundImage: `linear-gradient(90deg, ${base} 25%, ${shine} 50%, ${base} 75%)`, backgroundSize: '200% 100%' }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Bar w="70%" h={14} r={6} />
            <Bar w="50%" h={11} r={6} />
            <Bar w="40%" h={10} r={6} />
          </div>
          <Bar w={48} h={32} r={10} />
        </div>
      ))}
      <style>{`@keyframes shimmerSlide { 0%{background-position:200% 0} 100%{background-position:-200% 0} }`}</style>
    </div>
  );
}
