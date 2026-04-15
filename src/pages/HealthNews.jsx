import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, TrendingUp, Bookmark, Share2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { haptic } from '../utils/haptics';

const allArticles = [
  // Drug
  { id: 1,  category: 'Drug',   tag: 'Medication',  title: 'New Antibiotic Resistance Study: What You Need to Know', summary: 'Researchers have identified a new strain of bacteria resistant to common antibiotics, raising concerns about future treatment options.', time: '2h ago',  trending: true,  emoji: '💊', color: '#EF4444' },
  { id: 2,  category: 'Drug',   tag: 'Update',      title: 'FDA Approves Breakthrough Pain Relief Drug with Fewer Side Effects', summary: 'The newly approved drug shows 40% fewer gastrointestinal side effects compared to traditional NSAIDs in clinical trials.', time: '5h ago',  trending: false, emoji: '🧪', color: '#F97316' },
  { id: 3,  category: 'Drug',   tag: 'News',        title: 'Generic Insulin Now Available at Lower Cost Across India', summary: 'The government initiative to make insulin affordable has resulted in a 60% price reduction for millions of diabetic patients.', time: '1d ago',  trending: true,  emoji: '💉', color: '#3B82F6' },
  // Virus
  { id: 4,  category: 'Virus',  tag: 'Alert',       title: 'Seasonal Flu Surge: Hospitals Report 30% Rise in Cases', summary: 'Health authorities urge citizens to get vaccinated as influenza cases spike across major cities this winter season.', time: '1h ago',  trending: true,  emoji: '🦠', color: '#10B981' },
  { id: 5,  category: 'Virus',  tag: 'Research',    title: 'Scientists Develop Universal Flu Vaccine Targeting All Strains', summary: 'A universal influenza vaccine that could protect against all known flu strains has entered Phase 3 clinical trials.', time: '3h ago',  trending: false, emoji: '🔬', color: '#6366F1' },
  { id: 6,  category: 'Virus',  tag: 'Update',      title: 'COVID Variant XEC: Symptoms, Spread and Prevention Tips', summary: 'The latest COVID subvariant shows milder symptoms but higher transmissibility. Experts recommend updated booster doses.', time: '6h ago',  trending: true,  emoji: '😷', color: '#8B5CF6' },
  // Psycho
  { id: 7,  category: 'Psycho', tag: 'Mental Health', title: 'WHO Reports 25% Rise in Anxiety Disorders Post-Pandemic', summary: 'Global mental health crisis deepens as anxiety and depression rates continue to climb, with young adults most affected.', time: '4h ago',  trending: true,  emoji: '🧠', color: '#8B5CF6' },
  { id: 8,  category: 'Psycho', tag: 'Wellness',    title: '10 Minutes of Daily Meditation Reduces Stress by 40%, Study Finds', summary: 'A landmark study across 5,000 participants confirms that brief daily mindfulness practice significantly lowers cortisol levels.', time: '8h ago',  trending: false, emoji: '🧘', color: '#6366F1' },
  { id: 9,  category: 'Psycho', tag: 'News',        title: 'India Launches National Mental Health Helpline 24/7', summary: 'The government has expanded mental health support with a toll-free helpline staffed by certified counselors round the clock.', time: '2d ago',  trending: false, emoji: '💬', color: '#EC4899' },
  // Other
  { id: 10, category: 'Other',  tag: 'Nutrition',   title: 'Superfoods 2025: Top 10 Foods That Boost Immunity Naturally', summary: 'Nutritionists reveal the most powerful immune-boosting foods backed by the latest research in functional medicine.', time: '3h ago',  trending: true,  emoji: '🥗', color: '#10B981' },
  { id: 11, category: 'Other',  tag: 'Fitness',     title: 'Walking 7,000 Steps Daily Enough for Longevity, New Study Says', summary: 'Contrary to the popular 10,000-step goal, researchers find that 7,000 daily steps significantly reduces mortality risk.', time: '12h ago', trending: false, emoji: '🚶', color: '#F59E0B' },
  { id: 12, category: 'Other',  tag: 'Technology',  title: 'AI Detects Early-Stage Cancer with 94% Accuracy in New Trial', summary: 'An AI diagnostic tool outperforms radiologists in detecting early-stage lung and breast cancer from routine scans.', time: '1d ago',  trending: true,  emoji: '🤖', color: '#2563EB' },
];

const catConfig = {
  Drug:   { color: '#EF4444', bg: '#FFF5F5', darkBg: 'rgba(239,68,68,0.12)',   emoji: '💊', desc: 'Medications, treatments & pharma updates' },
  Virus:  { color: '#10B981', bg: '#F0FDF4', darkBg: 'rgba(16,185,129,0.12)',  emoji: '🦠', desc: 'Infectious diseases, outbreaks & vaccines' },
  Psycho: { color: '#8B5CF6', bg: '#F5F3FF', darkBg: 'rgba(139,92,246,0.12)', emoji: '❤️', desc: 'Mental health, wellness & psychology' },
  Other:  { color: '#6366F1', bg: '#EEF2FF', darkBg: 'rgba(99,102,241,0.12)', emoji: '⚕️', desc: 'Nutrition, fitness & general health news' },
};

export default function HealthNews() {
  const { category } = useParams();
  const navigate = useNavigate();
  const { t, dark } = useTheme();
  const [saved, setSaved] = useState({});
  const [activeTab, setActiveTab] = useState('All');

  const cat = catConfig[category] || catConfig.Other;
  const articles = allArticles.filter(a => a.category === category);
  const shown = activeTab === 'Trending' ? articles.filter(a => a.trending) : articles;

  return (
    <div style={{ height: '100svh', overflowY: 'auto', background: t.bg, fontFamily: 'Inter, sans-serif', transition: 'background 0.4s ease' }}>

      {/* Header */}
      <div style={{ background: t.headerGrad, padding: '52px 20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <button onClick={() => { haptic.light(); navigate(-1); }} style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,0.2)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <ArrowLeft size={20} color="white" />
          </button>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 22 }}>{cat.emoji}</span>
              <h1 style={{ color: 'white', fontSize: 20, fontWeight: 800, margin: 0 }}>{category}</h1>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, margin: 0 }}>{cat.desc}</p>
          </div>
        </div>
        {/* Tabs */}
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: 3 }}>
          {['All', 'Trending'].map(tab => (
            <button key={tab} onClick={() => { haptic.tab(); setActiveTab(tab); }} style={{ flex: 1, padding: '8px', borderRadius: 10, border: 'none', cursor: 'pointer', background: activeTab === tab ? 'white' : 'transparent', color: activeTab === tab ? cat.color : 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: 700, transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
              {tab === 'Trending' && <TrendingUp size={13} />}{tab}
            </button>
          ))}
        </div>
      </div>

      {/* Articles */}
      <div style={{ padding: '16px 20px 32px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <p style={{ fontSize: 13, color: t.textSecondary, margin: '0 0 4px' }}>{shown.length} article{shown.length !== 1 ? 's' : ''}</p>

        {shown.map((a, idx) => (
          <div key={a.id} style={{
            background: t.bgCard, borderRadius: 18, overflow: 'hidden',
            boxShadow: t.shadow, transition: 'background 0.4s ease',
            animation: 'cardSlideIn 0.35s ease-out both',
            animationDelay: `${idx * 0.07}s`,
          }}>
            {/* Colored top strip */}
            <div style={{ height: 4, background: `linear-gradient(90deg,${a.color},${a.color}88)` }} />
            <div style={{ padding: '14px 16px' }}>
              {/* Tag + time row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 16 }}>{a.emoji}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: a.color, background: dark ? `${a.color}22` : `${a.color}15`, borderRadius: 6, padding: '2px 8px' }}>{a.tag}</span>
                  {a.trending && (
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#F97316', background: dark ? 'rgba(249,115,22,0.15)' : '#FFF7ED', borderRadius: 6, padding: '2px 7px', display: 'flex', alignItems: 'center', gap: 3 }}>
                      <TrendingUp size={9} /> Hot
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Clock size={11} color={t.textMuted} />
                  <span style={{ fontSize: 11, color: t.textMuted }}>{a.time}</span>
                </div>
              </div>

              {/* Title */}
              <h3 style={{ fontSize: 15, fontWeight: 800, color: t.text, margin: '0 0 8px', lineHeight: 1.4 }}>{a.title}</h3>

              {/* Summary */}
              <p style={{ fontSize: 13, color: t.textSecondary, margin: '0 0 14px', lineHeight: 1.6 }}>{a.summary}</p>

              {/* Actions */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: `1px solid ${t.border}`, paddingTop: 12 }}>
                <button onClick={() => { haptic.light(); navigate('/search'); }} style={{ fontSize: 13, fontWeight: 700, color: a.color, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  Read More →
                </button>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => { haptic.light(); setSaved(s => ({ ...s, [a.id]: !s[a.id] })); }} style={{ width: 32, height: 32, borderRadius: 10, border: 'none', background: saved[a.id] ? (dark ? 'rgba(37,99,235,0.2)' : '#EFF6FF') : t.bgSecondary, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <Bookmark size={14} fill={saved[a.id] ? '#2563EB' : 'none'} color={saved[a.id] ? '#2563EB' : t.textMuted} />
                  </button>
                  <button onClick={() => haptic.light()} style={{ width: 32, height: 32, borderRadius: 10, border: 'none', background: t.bgSecondary, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <Share2 size={14} color={t.textMuted} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`@keyframes cardSlideIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}
