import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Play, Pause, Heart, Share2, Bookmark, ChevronRight } from 'lucide-react';
import { videos } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';
import { haptic } from '../utils/haptics';

export default function VideoPlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, dark } = useTheme();
  const video = videos.find(v => v.id === Number(id)) || videos[0];
  const [playing, setPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const suggested = videos.filter(v => v.id !== video.id && (v.category === video.category || Math.random() > 0.5)).slice(0, 5);

  return (
    <div style={{ background: t.bg, height: '100svh', overflowY: 'auto', fontFamily: 'Inter, sans-serif', transition: 'background 0.4s ease' }}>

      {/* Video player */}
      <div style={{ position: 'relative', height: 260, background: `linear-gradient(135deg,${video.color},${video.color}99)`, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {/* Back */}
        <button onClick={() => { haptic.light(); navigate(-1); }} style={{ position: 'absolute', top: 52, left: 20, width: 40, height: 40, borderRadius: 12, background: 'rgba(0,0,0,0.35)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 2 }}>
          <ArrowLeft size={20} color="white" />
        </button>
        {/* Category tag */}
        <div style={{ position: 'absolute', top: 58, right: 20, background: `${video.color}cc`, borderRadius: 8, padding: '4px 10px', zIndex: 2 }}>
          <span style={{ color: 'white', fontSize: 11, fontWeight: 700 }}>{video.category}</span>
        </div>
        {/* Emoji thumbnail */}
        <span style={{ fontSize: 90, filter: dark ? 'brightness(0.8)' : 'none', userSelect: 'none' }}>{video.emoji}</span>
        {/* Play/Pause */}
        <button onClick={() => { haptic.medium(); setPlaying(p => !p); }} style={{ position: 'absolute', width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.92)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 24px rgba(0,0,0,0.3)', transition: 'transform 0.15s ease' }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.92)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          {playing ? <Pause size={24} fill="#374151" color="#374151" /> : <Play size={24} fill="#374151" color="#374151" />}
        </button>
        {/* Progress bar */}
        <div style={{ position: 'absolute', bottom: 16, left: 20, right: 20 }}>
          <div style={{ height: 3, background: 'rgba(255,255,255,0.3)', borderRadius: 2, marginBottom: 6 }}>
            <div style={{ height: '100%', width: playing ? '35%' : '0%', background: 'white', borderRadius: 2, transition: 'width 0.5s ease' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11 }}>{playing ? '1:35' : '0:00'}</span>
            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11 }}>{video.duration}</span>
          </div>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '20px', background: t.bgCard, borderBottom: `1px solid ${t.border}`, transition: 'background 0.4s ease' }}>
        <h2 style={{ fontSize: 19, fontWeight: 800, color: t.text, margin: '0 0 6px' }}>{video.title}</h2>
        <p style={{ fontSize: 12, color: t.textMuted, margin: '0 0 16px' }}>{video.views} views · {video.category}</p>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          {[
            { label: 'Like', icon: Heart, active: liked, activeColor: '#EF4444', activeBg: dark ? 'rgba(239,68,68,0.15)' : '#FEF2F2', onClick: () => { haptic.success(); setLiked(l => !l); } },
            { label: 'Save', icon: Bookmark, active: saved, activeColor: '#2563EB', activeBg: dark ? 'rgba(37,99,235,0.15)' : '#EFF6FF', onClick: () => { haptic.light(); setSaved(s => !s); } },
            { label: 'Share', icon: Share2, active: false, activeColor: '#6B7280', activeBg: t.bgSecondary, onClick: () => haptic.light() },
          ].map(({ label, icon: Icon, active, activeColor, activeBg, onClick }) => (
            <button key={label} onClick={onClick} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: active ? activeBg : t.bgSecondary, border: 'none', borderRadius: 12, padding: '10px 0', cursor: 'pointer', color: active ? activeColor : t.textSecondary, fontSize: 13, fontWeight: 600, transition: 'all 0.2s ease' }}>
              <Icon size={16} fill={active && label !== 'Share' ? activeColor : 'none'} color={active ? activeColor : t.textSecondary} />
              {label}
            </button>
          ))}
        </div>

        <p style={{ fontSize: 14, color: t.textSecondary, lineHeight: 1.7, margin: 0 }}>{video.description}</p>
      </div>

      {/* Suggested videos */}
      <div style={{ padding: '16px 20px 100px' }}>
        <h3 style={{ fontSize: 15, fontWeight: 800, color: t.text, margin: '0 0 14px' }}>More Videos</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {suggested.map((v, idx) => (
            <div key={v.id} onClick={() => { haptic.light(); navigate(`/video/${v.id}`); }} style={{
              display: 'flex', gap: 12, background: t.bgCard, borderRadius: 14,
              overflow: 'hidden', boxShadow: t.shadow, cursor: 'pointer',
              animation: 'cardSlideIn 0.3s ease-out both',
              animationDelay: `${idx * 0.06}s`,
              transition: 'transform 0.15s ease',
            }}
              onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
              onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{ width: 90, height: 72, background: `linear-gradient(135deg,${v.color},${v.color}99)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', flexShrink: 0 }}>
                <span style={{ fontSize: 26, filter: dark ? 'brightness(0.8)' : 'none' }}>{v.emoji}</span>
                <div style={{ position: 'absolute', bottom: 4, right: 4, background: 'rgba(0,0,0,0.6)', borderRadius: 4, padding: '1px 5px' }}>
                  <span style={{ color: 'white', fontSize: 9, fontWeight: 600 }}>{v.duration}</span>
                </div>
              </div>
              <div style={{ flex: 1, padding: '10px 12px 10px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: t.text, margin: '0 0 3px', lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{v.title}</p>
                <p style={{ fontSize: 11, color: t.textMuted, margin: 0 }}>{v.views} views</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', paddingRight: 12 }}>
                <ChevronRight size={16} color={t.textMuted} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`@keyframes cardSlideIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}
