import { useRef, useEffect, useState, useCallback } from 'react';

const ITEM_H = 64;
const VISIBLE = 5;
const MIN = 1;
const MAX = 100;
const ages = Array.from({ length: MAX - MIN + 1 }, (_, i) => MIN + i);
const PAD = ITEM_H * Math.floor(VISIBLE / 2);
const CONTAINER_H = ITEM_H * VISIBLE;

export default function AgePicker({ value, onChange }) {
  const listRef = useRef(null);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startScroll = useRef(0);
  const scrollTimer = useRef(null);
  const [localVal, setLocalVal] = useState(Number(value) || 25);

  // Scroll to index instantly on mount
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = (localVal - MIN) * ITEM_H;
  }, []); // eslint-disable-line

  const snapTo = useCallback((idx) => {
    const clamped = Math.max(0, Math.min(ages.length - 1, idx));
    const el = listRef.current;
    if (!el) return;
    el.scrollTo({ top: clamped * ITEM_H, behavior: 'smooth' });
    const picked = ages[clamped];
    setLocalVal(picked);
    onChange(picked);
  }, [onChange]);

  const handleScroll = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    // Live update while scrolling
    const idx = Math.round(el.scrollTop / ITEM_H);
    const picked = ages[Math.max(0, Math.min(ages.length - 1, idx))];
    setLocalVal(picked);
    onChange(picked);
    // Snap after scroll stops
    clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => {
      snapTo(Math.round(el.scrollTop / ITEM_H));
    }, 120);
  }, [onChange, snapTo]);

  // Mouse drag (desktop)
  const onMouseDown = (e) => {
    isDragging.current = true;
    startY.current = e.clientY;
    startScroll.current = listRef.current.scrollTop;
    e.preventDefault();
  };
  const onMouseMove = useCallback((e) => {
    if (!isDragging.current) return;
    listRef.current.scrollTop = startScroll.current + (startY.current - e.clientY);
  }, []);
  const onMouseUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    snapTo(Math.round(listRef.current.scrollTop / ITEM_H));
  }, [snapTo]);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  const increment = () => snapTo(localVal - MIN + 1);
  const decrement = () => snapTo(localVal - MIN - 1);

  return (
    <div className="flex items-center gap-4">
      {/* Drum column */}
      <div
        className="relative flex-1 rounded-3xl overflow-hidden bg-white border border-[#E5E7EB]"
        style={{ height: CONTAINER_H, boxShadow: '0 2px 16px rgba(37,99,235,0.07)' }}
      >
        {/* Top gradient mask */}
        <div className="absolute inset-x-0 top-0 z-10 pointer-events-none"
          style={{ height: PAD, background: 'linear-gradient(to bottom, rgba(255,255,255,1) 30%, rgba(255,255,255,0))' }} />
        {/* Bottom gradient mask */}
        <div className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
          style={{ height: PAD, background: 'linear-gradient(to top, rgba(255,255,255,1) 30%, rgba(255,255,255,0))' }} />

        {/* Selection band */}
        <div className="absolute inset-x-3 z-10 pointer-events-none rounded-2xl"
          style={{
            top: PAD,
            height: ITEM_H,
            background: 'linear-gradient(135deg, rgba(37,99,235,0.09), rgba(37,99,235,0.05))',
            border: '1.5px solid rgba(37,99,235,0.18)',
          }}
        />
        {/* Left accent bar */}
        <div className="absolute z-20 pointer-events-none rounded-full"
          style={{ left: 12, top: PAD + 14, width: 3, height: ITEM_H - 28, background: '#2563EB', opacity: 0.7 }} />

        {/* Scrollable list */}
        <div
          ref={listRef}
          onScroll={handleScroll}
          onMouseDown={onMouseDown}
          className="absolute inset-0 overflow-y-scroll"
          style={{
            scrollSnapType: 'y mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            cursor: isDragging.current ? 'grabbing' : 'grab',
          }}
        >
          <div style={{ height: PAD }} />
          {ages.map((age) => {
            const dist = Math.abs(age - localVal);
            return (
              <div
                key={age}
                onClick={() => snapTo(age - MIN)}
                style={{
                  height: ITEM_H,
                  scrollSnapAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: dist === 0 ? '2rem' : dist === 1 ? '1.35rem' : dist === 2 ? '1.05rem' : '0.85rem',
                  fontWeight: dist === 0 ? 800 : dist === 1 ? 600 : 400,
                  color: dist === 0 ? '#2563EB' : dist === 1 ? '#374151' : '#9CA3AF',
                  opacity: dist === 0 ? 1 : dist === 1 ? 0.75 : dist === 2 ? 0.45 : 0.2,
                  transform: `scale(${dist === 0 ? 1 : dist === 1 ? 0.9 : 0.78})`,
                  transition: 'all 0.12s ease',
                  cursor: 'pointer',
                  letterSpacing: dist === 0 ? '0.02em' : 'normal',
                }}
              >
                {age}
              </div>
            );
          })}
          <div style={{ height: PAD }} />
        </div>
      </div>

      {/* Right side: label + stepper */}
      <div className="flex flex-col items-center gap-3">
        {/* Up button */}
        <button
          onClick={increment}
          disabled={localVal >= MAX}
          className="w-11 h-11 rounded-2xl bg-white border border-[#E5E7EB] flex items-center justify-center shadow-sm active:scale-90 transition-transform disabled:opacity-30"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4.5 11.5L9 6.5l4.5 5" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Value badge */}
        <div
          className="w-16 h-16 rounded-2xl flex flex-col items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #2563EB, #3B82F6)', boxShadow: '0 4px 16px rgba(37,99,235,0.35)' }}
        >
          <span className="text-2xl font-extrabold text-white leading-none">{localVal}</span>
          <span className="text-[9px] text-blue-200 font-medium mt-0.5">yrs</span>
        </div>

        {/* Down button */}
        <button
          onClick={decrement}
          disabled={localVal <= MIN}
          className="w-11 h-11 rounded-2xl bg-white border border-[#E5E7EB] flex items-center justify-center shadow-sm active:scale-90 transition-transform disabled:opacity-30"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4.5 6.5L9 11.5l4.5-5" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
