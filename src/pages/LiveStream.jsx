import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mic, MicOff, Video, VideoOff, Users, Heart, Send, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { haptic } from '../utils/haptics';

const liveComments = [
  { id: 1, user: 'Priya S.', text: 'Great session Dr. Navida! 🙌', avatar: '👩' },
  { id: 2, user: 'Rahul M.', text: 'Can you explain more about BP?', avatar: '👨' },
  { id: 3, user: 'Sneha K.', text: 'Very helpful, thank you!', avatar: '👩‍🦱' },
  { id: 4, user: 'Arjun T.', text: 'Joining from Mumbai 🇮🇳', avatar: '🧑' },
  { id: 5, user: 'Kavya R.', text: 'Please cover diabetes next ❤️', avatar: '👩‍🦰' },
];

export default function LiveStream() {
  const navigate = useNavigate();
  const { t, dark } = useTheme();
  const [micOn, setMicOn] = useState(false);
  const [camOn, setCamOn] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(4821);
  const [viewers, setViewers] = useState(120432);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(liveComments);
  const [hearts, setHearts] = useState([]);

  // Simulate live viewer count fluctuation
  useEffect(() => {
    const t = setInterval(() => {
      setViewers(v => v + Math.floor(Math.random() * 10 - 3));
    }, 2000);
    return () => clearInterval(t);
  }, []);

  const formatViewers = (n) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n;

  const sendComment = () => {
    if (!comment.trim()) return;
    haptic.light();
    setComments(c => [...c, { id: Date.now(), user: 'You', text: comment, avatar: '🧑' }]);
    setComment('');
  };

  const handleLike = () => {
    haptic.success();
    setLiked(l => !l);
    setLikeCount(c => liked ? c - 1 : c + 1);
    // Floating heart animation
    const id = Date.now();
    setHearts(h => [...h, id]);
    setTimeout(() => setHearts(h => h.filter(x => x !== id)), 1500);
  };

  return (
    <div style={{ height: '100svh', display: 'flex', flexDirection: 'column', background: '#0A0A1A', fontFamily: 'Inter, sans-serif', position: 'relative', overflow: 'hidden' }}>

      {/* Live video area */}
      <div style={{ flex: 1, position: 'relative', background: 'linear-gradient(160deg,#1E3A8A 0%,#1E1B4B 50%,#0A0A1A 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>

        {/* Animated background rings */}
        {[0,1,2].map(i => (
          <div key={i} style={{ position: 'absolute', width: 200 + i*80, height: 200 + i*80, borderRadius: '50%', border: '1px solid rgba(99,102,241,0.15)', animation: `liveRing 3s ease-in-out ${i*0.8}s infinite` }} />
        ))}

        {/* Doctor avatar */}
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <div style={{ width: 120, height: 120, borderRadius: '50%', background: 'linear-gradient(135deg,#3B82F6,#6366F1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56, margin: '0 auto 12px', border: '4px solid rgba(255,255,255,0.2)', boxShadow: '0 0 40px rgba(99,102,241,0.5)', animation: 'liveGlow 2s ease-in-out infinite' }}>
            👨‍⚕️
          </div>
          <p style={{ color: 'white', fontSize: 18, fontWeight: 800, margin: '0 0 4px' }}>Dr. Navida</p>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, margin: 0 }}>Cardiologist · Live Session</p>
        </div>

        {/* Top bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '52px 16px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'linear-gradient(to bottom,rgba(0,0,0,0.6),transparent)' }}>
          <button onClick={() => { haptic.light(); navigate(-1); }} style={{ width: 38, height: 38, borderRadius: 12, background: 'rgba(255,255,255,0.15)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <ArrowLeft size={18} color="white" />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* LIVE badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#EF4444', borderRadius: 8, padding: '5px 10px' }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'white', animation: 'liveBlink 1s ease-in-out infinite' }} />
              <span style={{ color: 'white', fontSize: 12, fontWeight: 800 }}>LIVE</span>
            </div>
            {/* Viewer count */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(0,0,0,0.4)', borderRadius: 8, padding: '5px 10px' }}>
              <Users size={13} color="white" />
              <span style={{ color: 'white', fontSize: 12, fontWeight: 700 }}>{formatViewers(viewers)}</span>
            </div>
          </div>
        </div>

        {/* Floating hearts */}
        {hearts.map(id => (
          <div key={id} style={{ position: 'absolute', bottom: 120, right: 40, fontSize: 28, animation: 'floatHeart 1.5s ease-out forwards', pointerEvents: 'none' }}>❤️</div>
        ))}
      </div>

      {/* Comments + controls */}
      <div style={{ background: 'rgba(10,10,26,0.98)', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '12px 16px 0' }}>

        {/* Scrollable comments */}
        <div style={{ height: 130, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12, scrollbarWidth: 'none' }}>
          {comments.map(c => (
            <div key={c.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, animation: 'msgSlideIn 0.25s ease-out' }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{c.avatar}</span>
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#93C5FD' }}>{c.user} </span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>{c.text}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          {/* Comment input */}
          <div style={{ flex: 1, height: 40, borderRadius: 20, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', padding: '0 14px', gap: 8 }}>
            <input value={comment} onChange={e => setComment(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendComment()}
              placeholder="Say something..."
              style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: 'white', fontSize: 13, fontFamily: 'Inter, sans-serif' }} />
            <button onClick={sendComment} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              <Send size={15} color="#93C5FD" />
            </button>
          </div>
          {/* Like */}
          <button onClick={handleLike} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', gap: 2 }}>
            <Heart size={22} fill={liked ? '#EF4444' : 'none'} color={liked ? '#EF4444' : 'rgba(255,255,255,0.6)'} />
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>{formatViewers(likeCount)}</span>
          </button>
          {/* Mic */}
          <button onClick={() => { haptic.light(); setMicOn(m => !m); }} style={{ width: 40, height: 40, borderRadius: '50%', background: micOn ? '#2563EB' : 'rgba(255,255,255,0.1)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            {micOn ? <Mic size={17} color="white" /> : <MicOff size={17} color="rgba(255,255,255,0.5)" />}
          </button>
          {/* Cam */}
          <button onClick={() => { haptic.light(); setCamOn(c => !c); }} style={{ width: 40, height: 40, borderRadius: '50%', background: camOn ? '#2563EB' : 'rgba(255,255,255,0.1)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            {camOn ? <Video size={17} color="white" /> : <VideoOff size={17} color="rgba(255,255,255,0.5)" />}
          </button>
        </div>

        {/* Leave button */}
        <button onClick={() => { haptic.error(); navigate(-1); }} style={{ width: '100%', height: 44, borderRadius: 14, border: 'none', background: '#EF4444', color: 'white', fontSize: 14, fontWeight: 700, cursor: 'pointer', marginBottom: 24 }}>
          Leave Stream
        </button>
      </div>

      <style>{`
        @keyframes liveRing{0%,100%{transform:scale(1);opacity:0.4}50%{transform:scale(1.08);opacity:0.15}}
        @keyframes liveGlow{0%,100%{box-shadow:0 0 40px rgba(99,102,241,0.5)}50%{box-shadow:0 0 60px rgba(99,102,241,0.8)}}
        @keyframes liveBlink{0%,100%{opacity:1}50%{opacity:0.3}}
        @keyframes floatHeart{0%{transform:translateY(0) scale(1);opacity:1}100%{transform:translateY(-120px) scale(1.4);opacity:0}}
        @keyframes msgSlideIn{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:translateX(0)}}
      `}</style>
    </div>
  );
}
