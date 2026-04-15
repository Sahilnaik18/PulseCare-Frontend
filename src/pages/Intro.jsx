import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import intro1 from '../assets/intro1.png';
import intro2 from '../assets/intro2.png';
import intro3 from '../assets/intro3.png';

const slides = [
  { id: 0, img: intro1, bg: '#DBEAFE', accent: '#2563EB' },
  { id: 1, img: intro2, bg: '#DCFCE7', accent: '#22C55E' },
  { id: 2, img: intro3, bg: '#FFEDD5', accent: '#F97316' },
];

export default function Intro() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const touchStartX = useRef(null);

  const goTo = (idx) => { setAnimKey((k) => k + 1); setCurrent(idx); };

  const handleNext = () => {
    if (current < slides.length - 1) goTo(current + 1);
    else navigate('/login');
  };

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 48) {
      if (diff > 0 && current < slides.length - 1) goTo(current + 1);
      else if (diff < 0 && current > 0) goTo(current - 1);
    }
    touchStartX.current = null;
  };

  const slide = slides[current];
  const isLast = current === slides.length - 1;

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#ffffff',
        overflow: 'hidden',
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── Image area — fills all space above the bottom bar ── */}
      <div
        key={animKey}
        className="page-enter"
        style={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
          background: slide.bg,
        }}
      >
        {slide.img ? (
          <img
            src={slide.img}
            alt={`Intro ${slide.id + 1}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center center',
              display: 'block',
            }}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, color: 'rgba(0,0,0,0.3)', fontWeight: 600,
          }}>
            intro{slide.id + 1}.png
          </div>
        )}

        {/* Skip — top right, over the image */}
        <button
          onClick={() => navigate('/login')}
          style={{
            position: 'absolute', top: 52, right: 20,
            zIndex: 10,
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(8px)',
            border: 'none',
            borderRadius: 12,
            padding: '8px 18px',
            fontSize: 13,
            fontWeight: 600,
            color: '#374151',
            cursor: 'pointer',
          }}
        >
          Skip
        </button>

        {/* Dots — overlaid at bottom of image */}
        <div style={{
          position: 'absolute', bottom: 14, left: 0, right: 0,
          display: 'flex', justifyContent: 'center', gap: 8,
          zIndex: 10,
        }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === current ? 28 : 8,
                height: 8,
                borderRadius: 4,
                background: i === current ? 'white' : 'rgba(255,255,255,0.5)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Bottom bar — just the button, flush against image ── */}
      <div style={{
        flexShrink: 0,
        background: '#ffffff',
        padding: '12px 24px',
        paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
      }}>
        <button
          onClick={handleNext}
          className="btn-press"
          style={{
            width: '100%',
            minHeight: 52,
            borderRadius: 18,
            border: 'none',
            background: slide.accent,
            color: 'white',
            fontSize: 16,
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: `0 4px 16px ${slide.accent}55`,
          }}
        >
          {isLast ? 'Get Started →' : 'Next →'}
        </button>
      </div>
    </div>
  );
}
