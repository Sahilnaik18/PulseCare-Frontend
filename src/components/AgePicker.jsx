import { useRef, useEffect } from 'react';
import { haptic } from '../utils/haptics';

const ITEM_H = 36;
const ages = Array.from({ length: 100 }, (_, i) => i + 1);

export default function AgePicker({ value, onChange }) {
  const ref = useRef(null);
  const settling = useRef(false);

  useEffect(() => {
    if (settling.current) return;
    if (ref.current) ref.current.scrollTop = (value - 1) * ITEM_H;
  }, [value]);

  const onScroll = () => {
    settling.current = true;
    const el = ref.current;
    const idx = Math.round(el.scrollTop / ITEM_H);
    const next = Math.min(Math.max(idx + 1, 1), 100);
    if (next !== value) { haptic.light(); onChange(next); }
    clearTimeout(ref._t);
    ref._t = setTimeout(() => {
      el.scrollTop = idx * ITEM_H;
      settling.current = false;
    }, 80);
  };

  return (
    <div style={{ position: 'relative', height: ITEM_H * 3, borderRadius: 14, overflow: 'hidden', background: 'white', border: '1.5px solid #E5E7EB', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
      {/* top fade */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: ITEM_H, background: 'linear-gradient(to bottom,rgba(255,255,255,1),rgba(255,255,255,0))', zIndex: 2, pointerEvents: 'none' }} />
      {/* selector */}
      <div style={{ position: 'absolute', top: ITEM_H, left: 12, right: 12, height: ITEM_H, background: '#EFF6FF', borderRadius: 10, border: '1.5px solid #BFDBFE', zIndex: 1 }} />
      {/* bottom fade */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: ITEM_H, background: 'linear-gradient(to top,rgba(255,255,255,1),rgba(255,255,255,0))', zIndex: 2, pointerEvents: 'none' }} />
      {/* list */}
      <div ref={ref} onScroll={onScroll} style={{ height: '100%', overflowY: 'scroll', scrollSnapType: 'y mandatory', paddingTop: ITEM_H, paddingBottom: ITEM_H }}>
        {ages.map(a => (
          <div key={a} style={{ height: ITEM_H, display: 'flex', alignItems: 'center', justifyContent: 'center', scrollSnapAlign: 'center', cursor: 'pointer', position: 'relative', zIndex: 3 }} onClick={() => { haptic.light(); onChange(a); }}>
            <span style={{ fontSize: a === value ? 18 : 14, fontWeight: a === value ? 800 : 400, color: a === value ? '#2563EB' : '#9CA3AF', transition: 'all 0.12s ease' }}>{a}{a === value ? ' yrs' : ''}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
