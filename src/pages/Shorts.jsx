import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Bookmark, Share2, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { shorts } from '../data/mockData';
import { haptic } from '../utils/haptics';

function formatNum(n) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}K` : n;
}

function ShortCard({ short, isActive }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(short.likes);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hearts, setHearts] = useState([]);
  const timerRef = useRef(null);

  // Simulate playback progress
  useEffect(() => {
    if (!isActive) { setProgress(0); setPlaying(true); return; }
    timerRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(timerRef.current); return 100; }
        return p + (playing ? 1.2 : 0);
      });
    }, 100);
    return () => clearInterval(timerRef.current);
  }, [isActive, playing]);

  const handleLike = () => {
    haptic.success();
    setLiked(l => !l);
    setLikeCount(c => liked ? c - 1 : c + 1);
    const id = Date.now();
    setHearts(h => [...h, { id, x: Math.random() * 40 - 20 }]);
    setTimeout(() => setHearts(h => h.filter(x => x.id !== id)), 1200);
  };

  const handleDoubleTap = () => {
    if (!liked) handleLike();
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: `linear-gradient(160deg,${short.color}44 0%,#0A0A1A 60%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
      onDoubleClick={handleDoubleTap}
    >
      {/* Background glow */}
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 40%, ${short.color}33 0%, transparent 65%)` }} />

      {/* Main emoji */}
      <div style={{ fontSize: 120, animation: isActive ? 'shortFloat 3s ease-in-out infinite' : 'none', filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.2))', userSelect: 'none', zIndex: 1 }}>
        {short.emoji}
      </div>

      {/* Play/pause overlay */}
      <button onClick={() => { haptic.light(); setPlaying(p => !p); }} style={{ position: 'absolute', inset: 0, background: 'none', border: 'none', cursor: 'pointer', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {!playing && (
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeInOut 0.8s ease forwards' }}>
            <Play size={28} fill="white" color="white" />
          </div>
        )}
      </button>

      {/* Floating hearts */}
      {hearts.map(h => (
        <div key={h.id} style={{ position: 'absolute', bottom: '35%', right: 60, fontSize: 32, animation: 'floatHeart 1.2s ease-out forwards', transform: `translateX(${h.x}px)`, pointerEvents: 'none', zIndex: 10 }}>❤️</div>
      ))}

      {/* Right action bar */}
      <div style={{ position: 'absolute', right: 14, bottom: 120, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, zIndex: 5 }}>
        {/* Creator */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: `linear-gradient(135deg,${short.color},${short.color}88)`, border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{short.creatorEmoji}</div>
          <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: -10 }}>
            <span style={{ color: 'white', fontSize: 11, fontWeight: 800 }}>+</span>
          </div>
        </div>
        {/* Like */}
        <button onClick={handleLike} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer' }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.15s ease', transform: liked ? 'scale(1.2)' : 'scale(1)' }}>
            <Heart size={22} fill={liked ? '#EF4444' : 'none'} color={liked ? '#EF4444' : 'white'} />
          </div>
          <span style={{ color: 'white', fontSize: 11, fontWeight: 700, textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>{formatNum(likeCount)}</span>
        </button>
        {/* Save */}
        <button onClick={() => { haptic.light(); setSaved(s => !s); }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer' }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bookmark size={20} fill={saved ? '#FBBF24' : 'none'} color={saved ? '#FBBF24' : 'white'} />
          </div>
          <span style={{ color: 'white', fontSize: 11, fontWeight: 700, textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>Save</span>
        </button>
        {/* Share */}
        <button onClick={() => haptic.light()} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer' }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Share2 size={20} color="white" />
          </div>
          <span style={{ color: 'white', fontSize: 11, fontWeight: 700, textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>Share</span>
        </button>
        {/* Mute */}
        <button onClick={() => { haptic.light(); setMuted(m => !m); }} style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(0,0,0,0.4)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          {muted ? <VolumeX size={18} color="white" /> : <Volume2 size={18} color="white" />}
        </button>
      </div>

      {/* Bottom info */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 60, padding: '0 16px 24px', background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)', zIndex: 5 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span style={{ fontSize: 14 }}>{short.creatorEmoji}</span>
          <span style={{ color: 'white', fontSize: 13, fontWeight: 700 }}>{short.creator}</span>
          <span style={{ fontSize: 10, fontWeight: 700, color: short.color, background: `${short.color}33`, borderRadius: 6, padding: '2px 7px', border: `1px solid ${short.color}66` }}>{short.category}</span>
        </div>
        <p style={{ color: 'white', fontSize: 14, fontWeight: 700, margin: '0 0 4px', lineHeight: 1.3 }}>{short.title}</p>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, margin: 0, lineHeight: 1.5 }}>{short.description}</p>
      </div>

      {/* Progress bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'rgba(255,255,255,0.2)', zIndex: 6 }}>
        <div style={{ height: '100%', width: `${progress}%`, background: 'white', transition: 'width 0.1s linear', borderRadius: 1 }} />
      </div>
    </div>
  );
}

export default function ShortsPage() {
  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [offset, setOffset] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = (idx) => {
    if (idx < 0 || idx >= shorts.length || animating) return;
    haptic.light();
    setAnimating(true);
    setCurrentIdx(idx);
    setOffset(0);
    setTimeout(() => setAnimating(false), 300);
  };

  const onTouchStart = (e) => setTouchStart(e.touches[0].clientY);
  const onTouchMove = (e) => {
    if (touchStart === null) return;
    setOffset(touchStart - e.touches[0].clientY);
  };
  const onTouchEnd = () => {
    if (offset > 60) goTo(currentIdx + 1);
    else if (offset < -60) goTo(currentIdx - 1);
    setOffset(0);
    setTouchStart(null);
  };

  return (
    <div style={{ height: '100svh', background: '#0A0A1A', position: 'relative', overflow: 'hidden', fontFamily: 'Inter, sans-serif' }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Back button */}
      <button onClick={() => { haptic.light(); navigate(-1); }} style={{ position: 'absolute', top: 52, left: 16, zIndex: 20, width: 38, height: 38, borderRadius: 12, background: 'rgba(0,0,0,0.5)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
        <ArrowLeft size={18} color="white" />
      </button>

      {/* Short counter */}
      <div style={{ position: 'absolute', top: 58, right: 16, zIndex: 20, background: 'rgba(0,0,0,0.5)', borderRadius: 10, padding: '4px 10px' }}>
        <span style={{ color: 'white', fontSize: 12, fontWeight: 700 }}>{currentIdx + 1} / {shorts.length}</span>
      </div>

      {/* Dot indicators */}
      <div style={{ position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)', zIndex: 20, display: 'flex', flexDirection: 'column', gap: 5 }}>
        {shorts.map((_, i) => (
          <div key={i} onClick={() => goTo(i)} style={{ width: 4, height: i === currentIdx ? 20 : 4, borderRadius: 2, background: i === currentIdx ? 'white' : 'rgba(255,255,255,0.35)', transition: 'all 0.25s ease', cursor: 'pointer' }} />
        ))}
      </div>

      {/* Swipe hint */}
      {currentIdx === 0 && (
        <div style={{ position: 'absolute', bottom: 100, left: '50%', transform: 'translateX(-50%)', zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, animation: 'swipeHint 2s ease-in-out 1s 2 forwards' }}>
          <div style={{ fontSize: 20 }}>👆</div>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, fontWeight: 600 }}>Swipe up</span>
        </div>
      )}

      {/* Video stack */}
      <div style={{ width: '100%', height: '100%', transform: `translateY(${-offset * 0.3}px)`, transition: animating ? 'transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94)' : 'none' }}>
        <ShortCard short={shorts[currentIdx]} isActive={true} />
      </div>

      {/* Keyboard nav for desktop */}
      <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 12, zIndex: 20 }}>
        <button onClick={() => goTo(currentIdx - 1)} disabled={currentIdx === 0} style={{ width: 40, height: 40, borderRadius: '50%', background: currentIdx === 0 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.25)', border: 'none', color: 'white', fontSize: 16, cursor: currentIdx === 0 ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>↑</button>
        <button onClick={() => goTo(currentIdx + 1)} disabled={currentIdx === shorts.length - 1} style={{ width: 40, height: 40, borderRadius: '50%', background: currentIdx === shorts.length - 1 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.25)', border: 'none', color: 'white', fontSize: 16, cursor: currentIdx === shorts.length - 1 ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>↓</button>
      </div>

      <style>{`
        @keyframes shortFloat{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-12px) scale(1.05)}}
        @keyframes floatHeart{0%{transform:translateY(0) scale(1);opacity:1}100%{transform:translateY(-100px) scale(1.5);opacity:0}}
        @keyframes fadeInOut{0%{opacity:1}100%{opacity:0}}
        @keyframes swipeHint{0%,100%{transform:translateX(-50%) translateY(0);opacity:0.8}50%{transform:translateX(-50%) translateY(-10px);opacity:1}}
      `}</style>
    </div>
  );
}
