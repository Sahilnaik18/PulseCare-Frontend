import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

/* ─── Slide 1: Smart Healthcare — orbiting feature cards around a central hub ─── */
function Slide1Illustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      {/* Pulse rings */}
      <div className="absolute w-52 h-52 rounded-full border-2 border-blue-300/30 pulse-ring" />
      <div className="absolute w-36 h-36 rounded-full border-2 border-blue-400/25 pulse-ring" style={{ animationDelay: '0.8s' }} />

      {/* Central hub */}
      <div
        className="relative z-10 w-24 h-24 rounded-3xl bg-white flex flex-col items-center justify-center gap-1 float"
        style={{ boxShadow: '0 8px 32px rgba(37,99,235,0.22)', animation: 'float 3s ease-in-out infinite, glow-pulse 2.5s ease-in-out infinite' }}
      >
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <path d="M18 4C10.268 4 4 10.268 4 18s6.268 14 14 14 14-6.268 14-14S25.732 4 18 4z" fill="#EFF6FF" />
          <path d="M18 10v8l5 3" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="18" cy="18" r="13" stroke="#2563EB" strokeWidth="2" />
        </svg>
        <span className="text-[10px] font-bold text-[#2563EB]">PulseCare</span>
      </div>

      {/* Orbiting cards */}
      {[
        { icon: '💊', label: 'Meds',     angle: 0,   delay: '0s',    r: 88 },
        { icon: '🏥', label: 'Doctors',  angle: 90,  delay: '0.2s',  r: 88 },
        { icon: '📋', label: 'Reports',  angle: 180, delay: '0.4s',  r: 88 },
        { icon: '❤️', label: 'Vitals',   angle: 270, delay: '0.6s',  r: 88 },
      ].map(({ icon, label, angle, delay, r }) => {
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * r;
        const y = Math.sin(rad) * r;
        return (
          <div
            key={label}
            className="absolute z-10 flex flex-col items-center gap-1"
            style={{
              transform: `translate(${x}px, ${y}px)`,
              animation: `float 3s ease-in-out ${delay} infinite`,
            }}
          >
            <div className="w-14 h-14 rounded-2xl bg-white flex flex-col items-center justify-center gap-0.5 shadow-md">
              <span className="text-xl">{icon}</span>
              <span className="text-[9px] font-semibold text-[#374151]">{label}</span>
            </div>
          </div>
        );
      })}

      {/* Connecting lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 5, pointerEvents: 'none' }}>
        {[0, 90, 180, 270].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const cx = '50%', cy = '50%';
          const ex = `calc(50% + ${Math.cos(rad) * 60}px)`;
          const ey = `calc(50% + ${Math.sin(rad) * 60}px)`;
          return (
            <line
              key={angle}
              x1={cx} y1={cy} x2={ex} y2={ey}
              stroke="#BFDBFE" strokeWidth="1.5" strokeDasharray="4 3"
            />
          );
        })}
      </svg>
    </div>
  );
}

/* ─── Slide 2: Skip the Waiting — appointment booking flow ─── */
function Slide2Illustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      <div className="absolute w-52 h-52 rounded-full border-2 border-green-300/30 pulse-ring" style={{ animationDelay: '0.3s' }} />

      {/* Doctor card */}
      <div
        className="absolute z-10 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 float"
        style={{ top: '14%', left: '8%', width: '82%', animationDelay: '0s' }}
      >
        <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="7" r="4" stroke="#22C55E" strokeWidth="2" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" />
            <path d="M17 13v4m-2-2h4" stroke="#22C55E" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-[#111827]">Dr. Priya Sharma</p>
          <p className="text-[10px] text-[#6B7280]">Cardiologist · 4.9 ★</p>
        </div>
        <div className="bg-green-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-xl" style={{ animation: 'badge-bounce 2s ease-in-out infinite' }}>
          Available
        </div>
      </div>

      {/* Queue tracker */}
      <div
        className="absolute z-10 bg-white rounded-2xl shadow-lg px-4 py-3 float-d1"
        style={{ top: '42%', left: '8%', width: '82%' }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-[#111827]">Live Queue</span>
          <span className="text-[10px] text-green-600 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" style={{ animation: 'badge-bounce 1.2s ease-in-out infinite' }} />
            Live
          </span>
        </div>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold"
              style={{
                background: n === 1 ? '#22C55E' : n === 2 ? '#86EFAC' : '#F0FDF4',
                color: n === 1 ? '#fff' : n === 2 ? '#166534' : '#6B7280',
              }}
            >
              {n}
            </div>
          ))}
          <span className="text-[10px] text-[#6B7280] ml-1">+3 more</span>
        </div>
        <div className="mt-2 h-1.5 rounded-full bg-[#F0FDF4] overflow-hidden">
          <div className="h-full rounded-full bg-green-500" style={{ width: '25%', transition: 'width 1s ease' }} />
        </div>
      </div>

      {/* Confirmed badge */}
      <div
        className="absolute z-10 bg-green-500 text-white rounded-2xl shadow-lg px-4 py-2.5 flex items-center gap-2 float-d2"
        style={{ bottom: '10%', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="7" fill="rgba(255,255,255,0.25)" />
          <path d="M4.5 8l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ strokeDasharray: 14, strokeDashoffset: 0, animation: 'checkmark-draw 0.6s ease-out 0.3s both' }}
          />
        </svg>
        <span className="text-xs font-bold">Appointment Confirmed!</span>
      </div>
    </div>
  );
}

/* ─── Slide 3: Your Health Always With You — AI insights + records ─── */
function Slide3Illustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      <div className="absolute w-52 h-52 rounded-full border-2 border-orange-300/30 pulse-ring" style={{ animationDelay: '0.5s' }} />

      {/* Phone frame */}
      <div
        className="relative z-10 w-44 bg-white rounded-3xl shadow-xl overflow-hidden float"
        style={{ height: 220, border: '2px solid #FED7AA' }}
      >
        {/* Status bar */}
        <div className="bg-orange-50 px-3 py-2 flex items-center justify-between border-b border-orange-100">
          <span className="text-[9px] font-bold text-orange-600">Health AI</span>
          <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <circle cx="5" cy="5" r="4" stroke="white" strokeWidth="1.5" />
              <path d="M3 5l1.5 1.5L7 3.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* AI scan line */}
        <div className="relative overflow-hidden" style={{ height: 90 }}>
          <div className="absolute inset-0 bg-gradient-to-b from-orange-50 to-white" />
          {/* Waveform bars */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end gap-1 h-12">
            {[6,10,14,8,16,12,6,18,10,14,8,12,16,10,6].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm"
                style={{
                  height: `${h}px`,
                  background: i % 3 === 0 ? '#F97316' : '#FED7AA',
                  animation: `float-slow ${1.5 + (i % 3) * 0.3}s ease-in-out ${i * 0.1}s infinite`,
                }}
              />
            ))}
          </div>
          {/* Scan line */}
          <div
            className="absolute left-0 right-0 h-0.5 bg-orange-400/60"
            style={{ animation: 'ai-scan-line 2s ease-in-out infinite', top: 8 }}
          />
        </div>

        {/* Insight cards */}
        <div className="px-3 py-2 flex flex-col gap-1.5">
          {[
            { label: 'Blood Pressure', val: 'Normal', color: '#22C55E' },
            { label: 'Heart Rate',     val: '72 bpm', color: '#2563EB' },
          ].map(({ label, val, color }) => (
            <div key={label} className="flex items-center justify-between bg-gray-50 rounded-xl px-2.5 py-1.5">
              <span className="text-[9px] text-[#6B7280] font-medium">{label}</span>
              <span className="text-[9px] font-bold" style={{ color }}>{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating report badge */}
      <div
        className="absolute z-20 bg-white rounded-2xl shadow-lg px-3 py-2 flex items-center gap-2 float-d1"
        style={{ top: '8%', right: '4%' }}
      >
        <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="1" width="12" height="14" rx="2" stroke="#F97316" strokeWidth="1.5" />
            <path d="M5 5h6M5 8h6M5 11h4" stroke="#F97316" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <p className="text-[9px] font-bold text-[#111827]">Lab Report</p>
          <p className="text-[8px] text-green-600 font-semibold">✓ Uploaded</p>
        </div>
      </div>

      {/* AI insight badge */}
      <div
        className="absolute z-20 bg-orange-500 text-white rounded-2xl shadow-lg px-3 py-2 float-d2"
        style={{ bottom: '8%', right: '4%' }}
      >
        <p className="text-[9px] font-bold">AI Insight</p>
        <p className="text-[8px] opacity-90">All vitals healthy 🎉</p>
      </div>
    </div>
  );
}

/* ─── Slide data ─── */
const slides = [
  {
    id: 0,
    gradient: 'linear-gradient(160deg, #EFF6FF 0%, #DBEAFE 55%, #BFDBFE 100%)',
    Illustration: Slide1Illustration,
    title: 'Smart Healthcare,\nSimplified',
    subtitle: 'Check symptoms, find doctors, and manage your health — all in one place.',
    accent: '#2563EB',
    accentLight: '#DBEAFE',
  },
  {
    id: 1,
    gradient: 'linear-gradient(160deg, #F0FDF4 0%, #DCFCE7 55%, #BBF7D0 100%)',
    Illustration: Slide2Illustration,
    title: 'Skip the\nWaiting',
    subtitle: 'Book appointments instantly and track your live queue in real-time.',
    accent: '#22C55E',
    accentLight: '#DCFCE7',
  },
  {
    id: 2,
    gradient: 'linear-gradient(160deg, #FFF7ED 0%, #FFEDD5 55%, #FED7AA 100%)',
    Illustration: Slide3Illustration,
    title: 'Your Health,\nAlways With You',
    subtitle: 'Store reports, get AI insights, and access your medical history anytime.',
    accent: '#F97316',
    accentLight: '#FFEDD5',
  },
];

export default function Intro() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [animDir, setAnimDir] = useState('right');
  const [animKey, setAnimKey] = useState(0);
  const touchStartX = useRef(null);

  const goTo = (idx, dir = 'right') => {
    setAnimDir(dir);
    setAnimKey((k) => k + 1);
    setCurrent(idx);
  };

  const handleNext = () => {
    if (current < slides.length - 1) goTo(current + 1, 'right');
    else navigate('/login');
  };

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 48) {
      if (diff > 0 && current < slides.length - 1) goTo(current + 1, 'right');
      else if (diff < 0 && current > 0) goTo(current - 1, 'left');
    }
    touchStartX.current = null;
  };

  const slide = slides[current];
  const isLast = current === slides.length - 1;

  return (
    <div
      className="flex flex-col min-h-screen overflow-hidden"
      style={{ background: slide.gradient, transition: 'background 0.55s ease' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Skip */}
      <div className="flex justify-end px-6 pt-12 pb-2 flex-shrink-0">
        <button
          onClick={() => navigate('/login')}
          className="btn-press text-sm font-semibold px-4 py-2 rounded-xl text-[#6B7280] bg-white/70 backdrop-blur-sm transition-all"
        >
          Skip
        </button>
      </div>

      {/* Illustration */}
      <div
        key={`illus-${animKey}`}
        className={animDir === 'right' ? 'slide-in-right' : 'slide-in-left'}
        style={{ flex: '0 0 290px', padding: '0 20px' }}
      >
        <div
          className="w-full rounded-3xl overflow-hidden relative"
          style={{ height: 270, background: slide.accentLight + '55' }}
        >
          <slide.Illustration />
        </div>
      </div>

      {/* Text + dots + CTA */}
      <div className="flex flex-col flex-1 px-6 pt-5">
        <div
          key={`text-${animKey}`}
          className={`flex-1 ${animDir === 'right' ? 'slide-in-right' : 'slide-in-left'}`}
          style={{ animationDelay: '0.07s' }}
        >
          <h1
            className="text-[1.85rem] font-bold leading-tight mb-2.5 text-[#111827]"
            style={{ whiteSpace: 'pre-line' }}
          >
            {slide.title}
          </h1>
          <p className="text-[#6B7280] text-sm leading-relaxed">{slide.subtitle}</p>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 py-5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? 'right' : 'left')}
              className="btn-press transition-all duration-300"
              style={{
                width: i === current ? '28px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: i === current ? slide.accent : '#D1D5DB',
              }}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="safe-bottom">
          <button
            onClick={handleNext}
            className="btn-press w-full min-h-[52px] rounded-2xl font-semibold text-base text-white shadow-lg flex items-center justify-center gap-2 transition-all duration-200"
            style={{ background: slide.accent }}
          >
            {isLast ? 'Get Started →' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
}
