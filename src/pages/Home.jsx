import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Mic, Bell, ChevronRight, Star, MapPin, Play, Moon, Sun } from "lucide-react";
import BottomNav from "../components/BottomNav";
import { doctors, appointments, videos, healthTips } from "../data/mockData";
import { useTheme } from "../context/ThemeContext";
import { haptic } from "../utils/haptics";
import { useOnboarding } from "../context/OnboardingContext";
import { useNotifications } from "../context/NotificationContext";
import { useProfile } from "../context/ProfileContext";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  if (h < 21) return "Good evening";
  return "Good night";
}

function OnboardingOverlay({ onDismiss, t }) {
  const steps = [
    { icon: "🤖", text: "Check symptoms instantly with AI" },
    { icon: "👨‍⚕️", text: "Book doctors near you" },
    { icon: "📂", text: "Store and access reports anytime" },
  ];
  return (
    <div style={{ position:"absolute",inset:0,zIndex:200,background:"rgba(0,0,0,0.6)",backdropFilter:"blur(4px)",display:"flex",alignItems:"flex-end" }}>
      <div style={{ width:"100%",background:t.bgCard,borderRadius:"28px 28px 0 0",padding:"28px 24px 40px",animation:"slideUp 0.4s ease-out" }}>
        <div style={{ width:40,height:4,background:t.border,borderRadius:2,margin:"0 auto 24px" }} />
        <h2 style={{ fontSize:22,fontWeight:800,color:t.text,marginBottom:8,textAlign:"center" }}>Welcome to PulseMate</h2>
        <p style={{ fontSize:13,color:t.textSecondary,textAlign:"center",marginBottom:28 }}>Your complete health companion</p>
        <div style={{ display:"flex",flexDirection:"column",gap:16,marginBottom:28 }}>
          {steps.map((s,i) => (
            <div key={i} style={{ display:"flex",alignItems:"center",gap:14 }}>
              <div style={{ width:44,height:44,borderRadius:14,background:t.bgSecondary,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0 }}>{s.icon}</div>
              <span style={{ fontSize:14,fontWeight:600,color:t.text }}>{s.text}</span>
            </div>
          ))}
        </div>
        <button onClick={() => { haptic.success(); onDismiss(); }} style={{ width:"100%",height:52,borderRadius:16,border:"none",background:"linear-gradient(135deg,#2563EB,#1E40AF)",color:"white",fontSize:16,fontWeight:700,cursor:"pointer" }}>Get Started</button>
        <button onClick={onDismiss} style={{ width:"100%",marginTop:12,background:"none",border:"none",color:t.textMuted,fontSize:13,cursor:"pointer" }}>Skip</button>
      </div>
      <style>{`@keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}`}</style>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const { t, dark, toggle } = useTheme();
  const { data } = useOnboarding();
  const { profile } = useProfile();
  const { unreadCount } = useNotifications();
  const name = profile.name || data.name || "there";
  const [showOnboarding, setShowOnboarding] = useState(
    () => !localStorage.getItem("pulsecare-onboarding-seen")
  );
  const [tipIdx, setTipIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTipIdx(i => (i + 1) % healthTips.length), 3000);
    return () => clearInterval(timer);
  }, []);

  const dismiss = () => {
    localStorage.setItem("pulsecare-onboarding-seen", "1");
    setShowOnboarding(false);
  };

  return (
    <div style={{ background:t.bg, height:'100%', display:'flex', flexDirection:'column', fontFamily:'Inter, sans-serif', transition:'background 0.4s ease', position:'relative' }}>
      <div style={{ flex:1,overflowY:"auto",paddingBottom:16 }}>

      {/* Header */}
      <div style={{ background:t.headerGrad,padding:"52px 20px 24px",borderRadius:"0 0 28px 28px" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20 }}>
          {/* Profile avatar top-left */}
          <button onClick={() => { haptic.light(); navigate("/profile"); }} style={{ display:"flex",alignItems:"center",gap:10,background:"none",border:"none",cursor:"pointer",padding:0 }}>
            <div style={{ width:42,height:42,borderRadius:"50%",background:"rgba(255,255,255,0.2)",border:"2px solid rgba(255,255,255,0.4)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0 }}>👤</div>
            <div style={{ textAlign:"left" }}>
              <p style={{ color:"rgba(255,255,255,0.7)",fontSize:12,margin:0 }}>{getGreeting()} 👋</p>
              <p style={{ color:"white",fontSize:16,fontWeight:800,margin:0 }}>{name}</p>
            </div>
          </button>
          <div style={{ display:"flex",gap:10 }}>
            <button onClick={() => { haptic.light(); toggle(); }} style={{ width:40,height:40,borderRadius:"50%",background:"rgba(255,255,255,0.2)",border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer" }}>
              {dark ? <Sun size={18} color="white" /> : <Moon size={18} color="white" />}
            </button>
            <button onClick={() => { haptic.light(); navigate("/notifications"); }} style={{ width:44,height:44,borderRadius:"50%",background:"rgba(255,255,255,0.2)",border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",position:"relative" }}>
              <Bell size={20} color="white" />
              {unreadCount > 0 && (
                <div style={{ position:"absolute",top:6,right:6,minWidth:16,height:16,borderRadius:8,background:"#EF4444",border:"2px solid rgba(255,255,255,0.3)",display:"flex",alignItems:"center",justifyContent:"center",padding:"0 3px" }}>
                  <span style={{ color:"white",fontSize:9,fontWeight:800 }}>{unreadCount > 9 ? '9+' : unreadCount}</span>
                </div>
              )}
            </button>
          </div>
        </div>
        <button onClick={() => navigate("/search")} style={{ width:"100%",height:48,borderRadius:14,background:"rgba(255,255,255,0.15)",backdropFilter:"blur(8px)",border:"1px solid rgba(255,255,255,0.25)",display:"flex",alignItems:"center",gap:10,padding:"0 14px",cursor:"pointer",textAlign:"left" }}>
          <Search size={18} color="rgba(255,255,255,0.7)" />
          <span style={{ flex:1,color:"rgba(255,255,255,0.6)",fontSize:14 }}>Search doctors, symptoms...</span>
          <Mic size={18} color="rgba(255,255,255,0.7)" />
        </button>
      </div>

      <div style={{ padding:"20px 20px 0" }}>

        {/* Health tip ticker */}
        <div style={{ background:dark?"rgba(59,130,246,0.12)":"#EFF6FF",borderRadius:12,padding:"10px 14px",marginBottom:20,display:"flex",alignItems:"center",gap:8,border:dark?"1px solid rgba(59,130,246,0.2)":"none" }}>
          <span style={{ fontSize:16 }}>💡</span>
          <span key={tipIdx} style={{ fontSize:12,color:t.primary,fontWeight:600,flex:1,animation:"tipFade 0.5s ease-out" }}>{healthTips[tipIdx]}</span>
        </div>

        {/* AI Symptom Checker */}
        <button onClick={() => { haptic.medium(); navigate("/ai-chat"); }} style={{ width:"100%",borderRadius:20,border:"none",cursor:"pointer",background:"linear-gradient(135deg,#1E40AF 0%,#2563EB 50%,#3B82F6 100%)",padding:"20px",marginBottom:24,display:"flex",alignItems:"center",gap:16,boxShadow:"0 8px 32px rgba(37,99,235,0.35)",position:"relative",overflow:"hidden" }}>
          <div style={{ position:"absolute",right:-20,top:-20,width:120,height:120,borderRadius:"50%",background:"rgba(255,255,255,0.08)" }} />
          <div style={{ position:"absolute",right:10,top:10,width:80,height:80,borderRadius:"50%",background:"rgba(255,255,255,0.06)" }} />
          <div style={{ width:56,height:56,borderRadius:18,background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,flexShrink:0,animation:"aiPulse 2s ease-in-out infinite" }}>🤖</div>
          <div style={{ textAlign:"left",flex:1 }}>
            <p style={{ color:"rgba(255,255,255,0.8)",fontSize:11,margin:"0 0 3px",fontWeight:600,letterSpacing:"0.05em",textTransform:"uppercase" }}>AI Powered</p>
            <h3 style={{ color:"white",fontSize:18,fontWeight:800,margin:"0 0 4px" }}>Symptom Checker</h3>
            <p style={{ color:"rgba(255,255,255,0.7)",fontSize:12,margin:0 }}>Get instant health insights</p>
          </div>
          <div style={{ background:"white",borderRadius:12,padding:"8px 14px",flexShrink:0 }}>
            <span style={{ color:"#2563EB",fontSize:13,fontWeight:700 }}>Check Now</span>
          </div>
        </button>

        {/* Live Stream Invite Card */}
        <div onClick={() => { haptic.medium(); navigate('/live'); }} style={{ borderRadius:20,background:'linear-gradient(135deg,#3730A3,#2563EB)',padding:'18px 18px 16px',marginBottom:16,cursor:'pointer',boxShadow:'0 8px 28px rgba(37,99,235,0.4)',transition:'transform 0.15s ease',position:'relative',overflow:'hidden' }}
          onMouseDown={e=>e.currentTarget.style.transform='scale(0.98)'}
          onMouseUp={e=>e.currentTarget.style.transform='scale(1)'}
          onTouchStart={e=>e.currentTarget.style.transform='scale(0.98)'}
          onTouchEnd={e=>e.currentTarget.style.transform='scale(1)'}
        >
          <div style={{ position:'absolute',top:-30,right:-30,width:120,height:120,borderRadius:'50%',background:'rgba(255,255,255,0.06)' }} />
          <div style={{ display:'flex',alignItems:'flex-start',gap:14,marginBottom:14 }}>
            <div style={{ width:52,height:52,borderRadius:'50%',background:'rgba(255,255,255,0.15)',border:'2px solid rgba(255,255,255,0.3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:26,flexShrink:0 }}>👨‍⚕️</div>
            <div style={{ flex:1 }}>
              <p style={{ color:'rgba(255,255,255,0.85)',fontSize:13,margin:'0 0 6px',lineHeight:1.45 }}>
                {"You're invited to join Live Stream with "}<span style={{ fontWeight:800,color:'white' }}>Dr. Navida</span>
              </p>
              <div style={{ display:'inline-flex',alignItems:'center',gap:5,background:'#EF4444',borderRadius:6,padding:'3px 8px' }}>
                <div style={{ width:6,height:6,borderRadius:'50%',background:'white',animation:'liveBlink 1s ease-in-out infinite' }} />
                <span style={{ color:'white',fontSize:10,fontWeight:800 }}>LIVE NOW</span>
              </div>
            </div>
          </div>
          <div style={{ height:1,background:'rgba(255,255,255,0.15)',marginBottom:12 }} />
          <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between' }}>
            <p style={{ color:'white',fontSize:13,fontWeight:700,margin:0 }}>120k People join Live Streaming!</p>
            <div style={{ display:'flex' }}>
              {['👩','👨','👩‍🦱','🧑'].map((a,i) => (
                <div key={i} style={{ width:28,height:28,borderRadius:'50%',background:`hsl(${i*60+200},60%,55%)`,border:'2px solid #2563EB',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,marginLeft:i===0?0:-8,zIndex:4-i }}>{a}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div style={{ marginBottom:24 }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14 }}>
            <h2 style={{ fontSize:17,fontWeight:800,color:t.text,margin:0 }}>Upcoming Appointments</h2>
            <button onClick={() => navigate("/appointments")} style={{ background:"none",border:"none",color:t.primary,fontSize:13,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:2 }}>See all <ChevronRight size={14} /></button>
          </div>
          <div style={{ display:"flex",gap:12,overflowX:"auto",paddingBottom:4,scrollbarWidth:"none" }}>
            {appointments.map(apt => (
              <div key={apt.id} onClick={() => navigate("/appointments")} style={{ minWidth:200,background:t.bgCard,borderRadius:18,padding:"14px",boxShadow:t.shadow,cursor:"pointer",flexShrink:0,borderLeft:`4px solid ${apt.status==="Confirmed"?"#22C55E":"#F59E0B"}`,transition:"background 0.4s ease" }}>
                <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:10 }}>
                  <div style={{ width:40,height:40,borderRadius:12,background:dark?"rgba(59,130,246,0.15)":"#EFF6FF",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20 }}>{apt.avatar}</div>
                  <div>
                    <p style={{ fontSize:13,fontWeight:700,color:t.text,margin:0 }}>{apt.doctor}</p>
                    <p style={{ fontSize:11,color:t.textSecondary,margin:0 }}>{apt.specialty}</p>
                  </div>
                </div>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                  <div>
                    <p style={{ fontSize:12,fontWeight:600,color:t.text,margin:0 }}>{apt.date}</p>
                    <p style={{ fontSize:11,color:t.textSecondary,margin:0 }}>{apt.time}</p>
                  </div>
                  <span style={{ fontSize:10,fontWeight:700,padding:"4px 8px",borderRadius:8,background:apt.status==="Confirmed"?(dark?"rgba(34,197,94,0.15)":"#F0FDF4"):(dark?"rgba(245,158,11,0.15)":"#FFFBEB"),color:apt.status==="Confirmed"?"#22C55E":"#F59E0B" }}>{apt.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Doctors */}
        <div style={{ marginBottom:24 }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14 }}>
            <h2 style={{ fontSize:17,fontWeight:800,color:t.text,margin:0 }}>Top Doctors Near You</h2>
            <button onClick={() => navigate("/search")} style={{ background:"none",border:"none",color:t.primary,fontSize:13,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:2 }}>See all <ChevronRight size={14} /></button>
          </div>
          <div style={{ display:"flex",gap:12,overflowX:"auto",paddingBottom:4,scrollbarWidth:"none" }}>
            {doctors.map(doc => (
              <div key={doc.id} onClick={() => { haptic.light(); navigate(`/doctor/${doc.id}`); }} style={{ minWidth:160,background:t.bgCard,borderRadius:18,padding:"16px 14px",boxShadow:t.shadow,cursor:"pointer",flexShrink:0,textAlign:"center",transition:"background 0.4s ease" }}>
                <div style={{ width:56,height:56,borderRadius:"50%",background:dark?"rgba(59,130,246,0.15)":"linear-gradient(135deg,#EFF6FF,#DBEAFE)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,margin:"0 auto 10px" }}>{doc.avatar}</div>
                <p style={{ fontSize:13,fontWeight:700,color:t.text,margin:"0 0 2px" }}>{doc.name}</p>
                <p style={{ fontSize:11,color:t.textSecondary,margin:"0 0 8px" }}>{doc.specialty}</p>
                <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:4,marginBottom:8 }}>
                  <Star size={11} fill="#F59E0B" color="#F59E0B" />
                  <span style={{ fontSize:11,fontWeight:700,color:t.text }}>{doc.rating}</span>
                  <span style={{ fontSize:10,color:t.textMuted,margin:"0 2px" }}>·</span>
                  <MapPin size={10} color={t.textMuted} />
                  <span style={{ fontSize:10,color:t.textMuted }}>{doc.distance}</span>
                </div>
                <button onClick={e => { e.stopPropagation(); haptic.medium(); navigate(`/doctor/${doc.id}`); }} style={{ width:"100%",height:32,borderRadius:10,border:"none",background:doc.available?t.primaryGrad:(dark?"#334155":"#F1F5F9"),color:doc.available?"white":t.textMuted,fontSize:12,fontWeight:700,cursor:"pointer" }}>
                  {doc.available ? "Book" : "Unavailable"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Short */}
        <div style={{ marginBottom:24 }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14 }}>
            <div style={{ display:"flex",alignItems:"center",gap:8 }}>
              <h2 style={{ fontSize:17,fontWeight:800,color:t.text,margin:0 }}>Quick Health Tip</h2>
              <span style={{ fontSize:10,fontWeight:800,color:"white",background:"#EF4444",borderRadius:6,padding:"2px 7px",display:"flex",alignItems:"center",gap:3 }}>
                <span style={{ width:5,height:5,borderRadius:"50%",background:"white",display:"inline-block",animation:"liveBlink 1s infinite" }} />
                SHORT
              </span>
            </div>
            <button onClick={() => { haptic.light(); navigate("/shorts"); }} style={{ background:"none",border:"none",color:t.primary,fontSize:13,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:2 }}>See all <ChevronRight size={14} /></button>
          </div>
          <div onClick={() => { haptic.medium(); navigate("/shorts"); }} style={{ borderRadius:20,overflow:"hidden",boxShadow:t.shadowLg,cursor:"pointer",position:"relative",transition:"transform 0.15s ease" }}
            onMouseDown={e=>e.currentTarget.style.transform="scale(0.98)"}
            onMouseUp={e=>e.currentTarget.style.transform="scale(1)"}
            onTouchStart={e=>e.currentTarget.style.transform="scale(0.98)"}
            onTouchEnd={e=>e.currentTarget.style.transform="scale(1)"}
          >
            {/* Thumbnail */}
            <div style={{ height:200,background:"linear-gradient(160deg,#06B6D444 0%,#0A0A1A 70%)",display:"flex",alignItems:"center",justifyContent:"center",position:"relative" }}>
              <div style={{ position:"absolute",inset:0,background:"radial-gradient(circle at 50% 40%,#06B6D433,transparent 65%)" }} />
              <span style={{ fontSize:90,animation:"shortFloat 3s ease-in-out infinite",filter:"drop-shadow(0 0 20px rgba(6,182,212,0.4))",zIndex:1 }}>💧</span>
              {/* Play button */}
              <div style={{ position:"absolute",width:52,height:52,borderRadius:"50%",background:"rgba(255,255,255,0.92)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 20px rgba(0,0,0,0.3)",zIndex:2 }}>
                <Play size={20} fill="#374151" color="#374151" />
              </div>
              {/* Duration */}
              <div style={{ position:"absolute",bottom:12,right:12,background:"rgba(0,0,0,0.65)",borderRadius:7,padding:"3px 8px" }}>
                <span style={{ color:"white",fontSize:11,fontWeight:600 }}>0:28</span>
              </div>
              {/* Category tag */}
              <div style={{ position:"absolute",top:12,left:12,background:"#06B6D4cc",borderRadius:7,padding:"3px 9px" }}>
                <span style={{ color:"white",fontSize:10,fontWeight:700 }}>Diet & Nutrition</span>
              </div>
              {/* Progress bar */}
              <div style={{ position:"absolute",bottom:0,left:0,right:0,height:3,background:"rgba(255,255,255,0.2)" }}>
                <div style={{ width:"40%",height:"100%",background:"white",borderRadius:1 }} />
              </div>
            </div>
            {/* Info bar */}
            <div style={{ background:dark?"#0F172A":t.bgCard,padding:"14px 16px",display:"flex",alignItems:"center",gap:12,transition:"background 0.4s ease" }}>
              <div style={{ width:36,height:36,borderRadius:"50%",background:"linear-gradient(135deg,#06B6D4,#0891B2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0 }}>👩‍⚕️</div>
              <div style={{ flex:1 }}>
                <p style={{ fontSize:13,fontWeight:700,color:t.text,margin:"0 0 2px",lineHeight:1.3 }}>Drink water first thing in the morning</p>
                <p style={{ fontSize:11,color:t.textMuted,margin:0 }}>Dr. Priya Sharma · 142K views</p>
              </div>
              <ChevronRight size={16} color={t.textMuted} />
            </div>
          </div>
        </div>

        {/* Health News Categories */}
        <div style={{ marginBottom:8 }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14 }}>
            <h2 style={{ fontSize:17,fontWeight:800,color:t.text,margin:0 }}>Health News</h2>
            <span style={{ fontSize:12,color:t.textMuted }}>Articles & Updates</span>
          </div>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:12 }}>
            {[
              { label:'Drug',   emoji:'💊', bg:dark?'rgba(239,68,68,0.15)':'#FEE2E2',  color:'#EF4444' },
              { label:'Virus',  emoji:'🦠', bg:dark?'rgba(16,185,129,0.15)':'#D1FAE5', color:'#10B981' },
              { label:'Psycho', emoji:'❤️', bg:dark?'rgba(239,68,68,0.15)':'#FEE2E2',  color:'#EF4444' },
              { label:'Other',  emoji:'⚕️', bg:dark?'rgba(99,102,241,0.15)':'#E0E7FF', color:'#6366F1' },
            ].map(c => (
              <button key={c.label} onClick={() => { haptic.light(); navigate(`/health-news/${c.label}`); }}
                style={{ display:'flex',flexDirection:'column',alignItems:'center',gap:8,background:t.bgCard,borderRadius:20,padding:'16px 8px 14px',border:'none',cursor:'pointer',boxShadow:t.shadow,transition:'transform 0.15s ease' }}
                onMouseDown={e=>e.currentTarget.style.transform='scale(0.92)'}
                onMouseUp={e=>e.currentTarget.style.transform='scale(1)'}
                onTouchStart={e=>e.currentTarget.style.transform='scale(0.92)'}
                onTouchEnd={e=>e.currentTarget.style.transform='scale(1)'}
              >
                <div style={{ width:54,height:54,borderRadius:16,background:c.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:28 }}>{c.emoji}</div>
                <span style={{ fontSize:12,fontWeight:700,color:t.textSecondary }}>{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        </div>

      </div>
      <BottomNav />
      {showOnboarding && <OnboardingOverlay onDismiss={dismiss} t={t} />}

      <style>{`
        @keyframes aiPulse{0%,100%{box-shadow:0 0 0 0 rgba(255,255,255,0.3)}50%{box-shadow:0 0 0 12px rgba(255,255,255,0)}}
        @keyframes tipFade{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}
        @keyframes liveBlink{0%,100%{opacity:1}50%{opacity:0.3}}
        @keyframes shortFloat{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-10px) scale(1.05)}}
      `}</style>
    </div>
  );
}
