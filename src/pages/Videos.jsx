import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Play, X, Zap, Film } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { videos, shorts, videoCategories } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';
import { haptic } from '../utils/haptics';

const catColor = (cat) => {
  const map = { Fitness: '#F97316', 'Mental Health': '#8B5CF6', 'Diet & Nutrition': '#10B981', 'Heart Health': '#EF4444', 'Skin Care': '#EC4899', 'Diabetes Care': '#3B82F6', 'Home Remedies': '#84CC16' };
  return map[cat] || '#6366F1';
};

function ShortThumb({ v, onClick, t, dark }) {
  return (
    <div onClick={onClick} style={{ width: 120, flexShrink: 0, cursor: 'pointer', transition: 'transform 0.15s ease' }}
      onMouseDown={e => e.currentTarget.style.transform = 'scale(0.94)'}
      onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
      onTouchStart={e => e.currentTarget.style.transform = 'scale(0.94)'}
      onTouchEnd={e => e.currentTarget.style.transform = 'scale(1)'}
    >
      <div style={{ height: 180, borderRadius: 14, background: `linear-gradient(160deg,${v.color}55,#0A0A1A)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', border: `1px solid ${v.color}44` }}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 40%,${v.color}33,transparent 70%)` }} />
        <span style={{ fontSize: 44, zIndex: 1 }}>{v.emoji}</span>
        <div style={{ position: 'absolute', bottom: 8, left: 8, right: 8 }}>
          <div style={{ height: 2, background: 'rgba(255,255,255,0.2)', borderRadius: 1, marginBottom: 5 }}>
            <div style={{ width: '40%', height: '100%', background: 'white', borderRadius: 1 }} />
          </div>
          <span style={{ color: 'white', fontSize: 9, fontWeight: 600, background: 'rgba(0,0,0,0.5)', borderRadius: 4, padding: '1px 5px' }}>{v.duration}</span>
        </div>
        <div style={{ position: 'absolute', top: 8, right: 8, background: '#EF4444', borderRadius: 5, padding: '2px 5px', display: 'flex', alignItems: 'center', gap: 3 }}>
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'white', animation: 'liveBlink 1s infinite' }} />
          <span style={{ color: 'white', fontSize: 8, fontWeight: 800 }}>SHORT</span>
        </div>
      </div>
      <p style={{ fontSize: 11, fontWeight: 700, color: t.text, margin: '6px 0 2px', lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{v.title}</p>
      <p style={{ fontSize: 10, color: t.textMuted, margin: 0 }}>{v.views} views</p>
    </div>
  );
}

function VideoRow({ v, onClick, t, dark }) {
  return (
    <div onClick={onClick} style={{ display: 'flex', gap: 12, background: t.bgCard, borderRadius: 16, overflow: 'hidden', boxShadow: t.shadow, cursor: 'pointer', transition: 'transform 0.15s ease' }}
      onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
      onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
      onTouchStart={e => e.currentTarget.style.transform = 'scale(0.98)'}
      onTouchEnd={e => e.currentTarget.style.transform = 'scale(1)'}
    >
      <div style={{ width: 110, height: 82, background: `linear-gradient(135deg,${v.color},${v.color}99)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', flexShrink: 0 }}>
        <span style={{ fontSize: 30, filter: dark ? 'brightness(0.85)' : 'none' }}>{v.emoji}</span>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.88)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Play size={11} fill="#374151" color="#374151" />
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 5, right: 5, background: 'rgba(0,0,0,0.65)', borderRadius: 4, padding: '1px 5px' }}>
          <span style={{ color: 'white', fontSize: 9, fontWeight: 600 }}>{v.duration}</span>
        </div>
      </div>
      <div style={{ flex: 1, padding: '10px 12px 10px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: t.text, margin: 0, lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{v.title}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 12 }}>{v.creatorEmoji}</span>
          <span style={{ fontSize: 11, color: t.textSecondary }}>{v.creator}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 10, color: t.textMuted }}>{v.views} views</span>
          <span style={{ fontSize: 10, fontWeight: 700, color: catColor(v.category), background: `${catColor(v.category)}18`, borderRadius: 5, padding: '1px 6px' }}>{v.category}</span>
        </div>
      </div>
    </div>
  );
}

export default function VideosPage() {
  const navigate = useNavigate();
  const { t, dark } = useTheme();
  const [tab, setTab] = useState('shorts');
  const [query, setQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredLong = useMemo(() => videos.filter(v =>
    (activeCategory === 'All' || v.category === activeCategory) &&
    (v.title.toLowerCase().includes(query.toLowerCase()) || v.category.toLowerCase().includes(query.toLowerCase()))
  ), [query, activeCategory]);

  const filteredShorts = useMemo(() => shorts.filter(v =>
    (activeCategory === 'All' || v.category === activeCategory) &&
    (v.title.toLowerCase().includes(query.toLowerCase()) || v.category.toLowerCase().includes(query.toLowerCase()))
  ), [query, activeCategory]);

  const grouped = useMemo(() => {
    if (activeCategory !== 'All' || query) return null;
    const map = {};
    videoCategories.slice(1).forEach(cat => {
      const items = videos.filter(v => v.category === cat);
      if (items.length) map[cat] = items;
    });
    return map;
  }, [activeCategory, query]);

  return (
    <div style={{ background: t.bg, height: '100%', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif', transition: 'background 0.4s ease' }}>
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 16 }}>

      {/* Header */}
      <div style={{ background: t.headerGrad, padding: '52px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <h1 style={{ color: 'white', fontSize: 20, fontWeight: 800, margin: 0 }}>Health Videos</h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, margin: 0 }}>Learn, Prevent, Stay Healthy</p>
          </div>
          <button onClick={() => { haptic.light(); setShowSearch(s => !s); }} style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,0.2)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            {showSearch ? <X size={18} color="white" /> : <Search size={18} color="white" />}
          </button>
        </div>

        {showSearch && (
          <div style={{ marginBottom: 14, height: 44, borderRadius: 14, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', animation: 'slideDown 0.2s ease-out' }}>
            <Search size={15} color="rgba(255,255,255,0.7)" />
            <input autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder="Search videos..."
              style={{ flex: 1, border: 'none', background: 'none', outline: 'none', fontSize: 14, color: 'white', fontFamily: 'Inter, sans-serif' }} />
            {query && <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}><X size={14} color="rgba(255,255,255,0.7)" /></button>}
          </div>
        )}

        {/* Tab switcher */}
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.15)', borderRadius: 14, padding: 4, marginBottom: 0 }}>
          {[
            { key: 'shorts', label: 'Shorts', icon: Zap },
            { key: 'full',   label: 'Full Videos', icon: Film },
          ].map(({ key, label, icon: Icon }) => (
            <button key={key} onClick={() => { haptic.tab(); setTab(key); }} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '10px', borderRadius: 11, border: 'none', cursor: 'pointer', background: tab === key ? 'white' : 'transparent', color: tab === key ? '#2563EB' : 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: 700, transition: 'all 0.2s ease' }}>
              <Icon size={14} />{label}
            </button>
          ))}
        </div>
      </div>

      {/* Category chips */}
      <div style={{ padding: '14px 20px 0', display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none' }}>
        {videoCategories.map(cat => (
          <button key={cat} onClick={() => { haptic.tab(); setActiveCategory(cat); }} style={{ flexShrink: 0, padding: '7px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', background: activeCategory === cat ? t.primary : t.chipBg, color: activeCategory === cat ? 'white' : t.chipText, fontSize: 12, fontWeight: 600, transition: 'all 0.2s ease', boxShadow: activeCategory === cat ? `0 4px 12px ${t.primary}44` : 'none' }}>{cat}</button>
        ))}
      </div>
      {tab === 'shorts' && (
        <div style={{ padding: '16px 20px 0' }}>
          {/* Enter full shorts player CTA */}
          <button onClick={() => { haptic.medium(); navigate('/shorts'); }} style={{ width: '100%', borderRadius: 18, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#0A0A1A,#1E1B4B)', padding: '16px 20px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 14, boxShadow: '0 6px 24px rgba(0,0,0,0.3)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: -10, top: -10, width: 80, height: 80, borderRadius: '50%', background: 'rgba(99,102,241,0.2)' }} />
            <div style={{ width: 48, height: 48, borderRadius: 14, background: 'linear-gradient(135deg,#6366F1,#8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>⚡</div>
            <div style={{ textAlign: 'left', flex: 1 }}>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, margin: '0 0 2px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Swipe Experience</p>
              <p style={{ color: 'white', fontSize: 15, fontWeight: 800, margin: 0 }}>Open Health Shorts</p>
            </div>
            <div style={{ background: '#6366F1', borderRadius: 10, padding: '7px 14px' }}>
              <span style={{ color: 'white', fontSize: 12, fontWeight: 700 }}>Play</span>
            </div>
          </button>

          {/* Shorts grid */}
          {filteredShorts.length > 0 ? (
            <>
              <p style={{ fontSize: 13, color: t.textSecondary, margin: '0 0 14px' }}>{filteredShorts.length} shorts</p>
              <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8, scrollbarWidth: 'none' }}>
                {filteredShorts.map((v, idx) => (
                  <div key={v.id} style={{ animation: 'cardSlideIn 0.3s ease-out both', animationDelay: `${idx * 0.05}s` }}>
                    <ShortThumb v={v} t={t} dark={dark} onClick={() => { haptic.light(); navigate('/shorts'); }} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>⚡</div>
              <p style={{ fontSize: 15, fontWeight: 700, color: t.text, margin: '0 0 6px' }}>No shorts found</p>
              <p style={{ fontSize: 13, color: t.textMuted, margin: 0 }}>Try a different category</p>
            </div>
          )}
        </div>
      )}

      {/* ── FULL VIDEOS TAB ── */}
      {tab === 'full' && (
        <div style={{ padding: '16px 20px 0' }}>
          {(query || activeCategory !== 'All') ? (
            <>
              <p style={{ fontSize: 13, color: t.textSecondary, margin: '0 0 14px' }}>{filteredLong.length} video{filteredLong.length !== 1 ? 's' : ''}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {filteredLong.map((v, idx) => (
                  <div key={v.id} style={{ animation: 'cardSlideIn 0.3s ease-out both', animationDelay: `${idx * 0.05}s` }}>
                    <VideoRow v={v} t={t} dark={dark} onClick={() => { haptic.light(); navigate(`/video/${v.id}`); }} />
                  </div>
                ))}
                {filteredLong.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '48px 0' }}>
                    <div style={{ fontSize: 48, marginBottom: 12 }}>🎬</div>
                    <p style={{ fontSize: 15, fontWeight: 700, color: t.text, margin: '0 0 6px' }}>No videos found</p>
                    <p style={{ fontSize: 13, color: t.textMuted, margin: 0 }}>Try a different keyword or category</p>
                  </div>
                )}
              </div>
            </>
          ) : grouped && Object.entries(grouped).map(([cat, items]) => (
            <div key={cat} style={{ marginBottom: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 4, height: 18, borderRadius: 2, background: catColor(cat) }} />
                  <h2 style={{ fontSize: 16, fontWeight: 800, color: t.text, margin: 0 }}>{cat}</h2>
                </div>
                <button onClick={() => { haptic.tab(); setActiveCategory(cat); }} style={{ background: 'none', border: 'none', color: t.primary, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>See All</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {items.slice(0, 2).map(v => (
                  <VideoRow key={v.id} v={v} t={t} dark={dark} onClick={() => { haptic.light(); navigate(`/video/${v.id}`); }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      </div>
      <BottomNav />
      <style>{`
        @keyframes cardSlideIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes liveBlink{0%,100%{opacity:1}50%{opacity:0.3}}
      `}</style>
    </div>
  );
}
