import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Mic, BookmarkPlus, Calendar, ChevronRight, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { haptic } from '../utils/haptics';
import AIBrainAnimation from '../components/AIBrainAnimation';

// ─── Mock AI knowledge base ───────────────────────────────────────────────────
const aiKnowledge = {
  headache: {
    conditions: [
      { name: 'Tension Headache', desc: 'Most common type, caused by stress or muscle tension', confidence: 74, icon: '🧠', color: '#8B5CF6' },
      { name: 'Migraine', desc: 'Intense throbbing pain, often with nausea or light sensitivity', confidence: 58, icon: '⚡', color: '#EF4444' },
      { name: 'Dehydration', desc: 'Lack of fluids causing pressure and head pain', confidence: 45, icon: '💧', color: '#06B6D4' },
      { name: 'Sinusitis', desc: 'Inflammation of sinuses causing facial pressure', confidence: 32, icon: '😤', color: '#F59E0B' },
    ],
    severity: 'low',
    severityText: 'Symptoms appear mild. Monitor at home and rest.',
    specialist: { type: 'General Physician', reason: 'For persistent headaches lasting more than 3 days', icon: '👨‍⚕️' },
    advice: ['Rest in a quiet, dark room', 'Stay well hydrated (8+ glasses)', 'Apply cold/warm compress', 'Avoid screen exposure', 'Take OTC pain relief if needed'],
    followUp: ['Are you also experiencing nausea?', 'Is the pain on one side?', 'Any vision changes?'],
    specialty: 'Neurologist',
  },
  fever: {
    conditions: [
      { name: 'Viral Infection', desc: 'Common cold or flu causing elevated body temperature', confidence: 81, icon: '🦠', color: '#EF4444' },
      { name: 'Bacterial Infection', desc: 'Bacterial illness requiring possible antibiotic treatment', confidence: 52, icon: '🔬', color: '#F97316' },
      { name: 'COVID-19', desc: 'Respiratory illness with fever as a primary symptom', confidence: 38, icon: '😷', color: '#8B5CF6' },
    ],
    severity: 'medium',
    severityText: 'Moderate concern. Consult a doctor if fever exceeds 39.5°C.',
    specialist: { type: 'General Physician', reason: 'Fever may indicate infection requiring diagnosis', icon: '👩‍⚕️' },
    advice: ['Monitor temperature every 4 hours', 'Stay hydrated with water and electrolytes', 'Rest and avoid strenuous activity', 'Take paracetamol for fever above 38.5°C', 'Seek emergency care if above 40°C'],
    followUp: ['How long have you had the fever?', 'Any body aches or chills?', 'Difficulty breathing?'],
    specialty: 'General Physician',
  },
  cough: {
    conditions: [
      { name: 'Common Cold', desc: 'Viral upper respiratory infection with cough and congestion', confidence: 68, icon: '🤧', color: '#06B6D4' },
      { name: 'Allergic Cough', desc: 'Triggered by allergens like dust, pollen or pet dander', confidence: 55, icon: '🌿', color: '#10B981' },
      { name: 'Bronchitis', desc: 'Inflammation of bronchial tubes causing persistent cough', confidence: 40, icon: '🫁', color: '#F59E0B' },
      { name: 'Asthma', desc: 'Chronic condition causing airway inflammation and coughing', confidence: 28, icon: '💨', color: '#8B5CF6' },
    ],
    severity: 'low',
    severityText: 'Mild symptoms. Monitor and rest at home.',
    specialist: { type: 'Pulmonologist', reason: 'Persistent cough may need respiratory evaluation', icon: '👨‍⚕️' },
    advice: ['Drink warm fluids like ginger tea', 'Use honey with warm water', 'Avoid cold drinks and irritants', 'Use steam inhalation', 'Consult doctor if cough lasts 2+ weeks'],
    followUp: ['Is the cough dry or productive?', 'Any shortness of breath?', 'Cough worse at night?'],
    specialty: 'Pulmonologist',
  },
  chest: {
    conditions: [
      { name: 'Muscle Strain', desc: 'Chest wall muscle pain from physical activity', confidence: 55, icon: '💪', color: '#F59E0B' },
      { name: 'Acid Reflux (GERD)', desc: 'Stomach acid causing burning chest sensation', confidence: 48, icon: '🔥', color: '#F97316' },
      { name: 'Anxiety / Panic', desc: 'Stress-induced chest tightness and palpitations', confidence: 42, icon: '😰', color: '#8B5CF6' },
      { name: 'Cardiac Concern', desc: 'Requires immediate evaluation — do not ignore', confidence: 25, icon: '❤️', color: '#EF4444' },
    ],
    severity: 'high',
    severityText: 'High priority. Please consult a doctor immediately.',
    specialist: { type: 'Cardiologist', reason: 'Chest pain always requires cardiac evaluation', icon: '👩‍⚕️' },
    advice: ['Seek medical attention promptly', 'Avoid physical exertion', 'Do not ignore chest pain', 'Call emergency if pain is severe', 'Note when pain started and its nature'],
    followUp: ['Is the pain sharp or dull?', 'Does it radiate to your arm or jaw?', 'Any shortness of breath?'],
    specialty: 'Cardiologist',
  },
  stomach: {
    conditions: [
      { name: 'Gastritis', desc: 'Inflammation of stomach lining causing pain and nausea', confidence: 65, icon: '🫃', color: '#F59E0B' },
      { name: 'Food Poisoning', desc: 'Bacterial contamination causing GI distress', confidence: 52, icon: '🤢', color: '#EF4444' },
      { name: 'IBS', desc: 'Irritable bowel syndrome causing cramping and discomfort', confidence: 38, icon: '🔄', color: '#8B5CF6' },
    ],
    severity: 'medium',
    severityText: 'Moderate concern. Rest and monitor symptoms.',
    specialist: { type: 'Gastroenterologist', reason: 'Stomach pain may need digestive system evaluation', icon: '👨‍⚕️' },
    advice: ['Eat light, bland foods (rice, toast)', 'Stay hydrated with small sips', 'Avoid spicy and fatty foods', 'Rest and avoid stress', 'Seek care if pain is severe or persistent'],
    followUp: ['Any vomiting or diarrhea?', 'When did the pain start?', 'Any recent change in diet?'],
    specialty: 'Gastroenterologist',
  },
  fatigue: {
    conditions: [
      { name: 'Sleep Deprivation', desc: 'Insufficient or poor quality sleep causing exhaustion', confidence: 72, icon: '😴', color: '#6366F1' },
      { name: 'Anemia', desc: 'Low iron or hemoglobin reducing oxygen delivery', confidence: 55, icon: '🩸', color: '#EF4444' },
      { name: 'Thyroid Disorder', desc: 'Underactive thyroid slowing metabolism and energy', confidence: 40, icon: '🦋', color: '#10B981' },
      { name: 'Vitamin Deficiency', desc: 'Low B12 or D3 causing persistent tiredness', confidence: 60, icon: '💊', color: '#F59E0B' },
    ],
    severity: 'low',
    severityText: 'Mild concern. Lifestyle changes may help significantly.',
    specialist: { type: 'General Physician', reason: 'Blood tests can identify underlying causes', icon: '👩‍⚕️' },
    advice: ['Aim for 7–8 hours of sleep', 'Eat iron-rich foods (spinach, lentils)', 'Take vitamin D and B12 supplements', 'Exercise regularly (even light walks)', 'Reduce caffeine and screen time before bed'],
    followUp: ['How long have you felt fatigued?', 'Any changes in weight?', 'Feeling cold often?'],
    specialty: 'General Physician',
  },
};

const getAIData = (msg) => {
  const l = msg.toLowerCase();
  if (l.includes('headache') || l.includes('head')) return aiKnowledge.headache;
  if (l.includes('fever') || l.includes('temperature')) return aiKnowledge.fever;
  if (l.includes('cough')) return aiKnowledge.cough;
  if (l.includes('chest') || l.includes('heart')) return aiKnowledge.chest;
  if (l.includes('stomach') || l.includes('abdomen') || l.includes('nausea')) return aiKnowledge.stomach;
  if (l.includes('fatigue') || l.includes('tired') || l.includes('weak')) return aiKnowledge.fatigue;
  return aiKnowledge.headache; // default
};

const severityConfig = {
  low:    { color: '#22C55E', bg: 'rgba(34,197,94,0.12)',   label: 'Low Risk',    icon: CheckCircle,     bar: 25 },
  medium: { color: '#F59E0B', bg: 'rgba(245,158,11,0.12)',  label: 'Moderate',    icon: AlertTriangle,   bar: 60 },
  high:   { color: '#EF4444', bg: 'rgba(239,68,68,0.12)',   label: 'High Priority', icon: AlertTriangle, bar: 90 },
};

// ─── Rich AI Response Card ────────────────────────────────────────────────────
function AIResponseCard({ data, t, dark, onBook, onSave }) {
  const sev = severityConfig[data.severity];
  const SevIcon = sev.icon;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, animation: 'msgSlideIn 0.4s ease-out' }}>

      {/* Intro bubble */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
        <div style={{ width: 32, height: 32, borderRadius: 10, background: dark ? 'rgba(59,130,246,0.2)' : '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>🤖</div>
        <div style={{ background: t.bgCard, borderRadius: '18px 18px 18px 4px', padding: '12px 14px', boxShadow: t.shadow, maxWidth: '85%' }}>
          <p style={{ fontSize: 14, color: t.text, margin: 0, lineHeight: 1.5 }}>Based on your symptoms, here's my analysis. <strong>Please review carefully.</strong></p>
        </div>
      </div>

      {/* Possible Conditions */}
      <div style={{ background: t.bgCard, borderRadius: 18, padding: '16px', boxShadow: t.shadow }}>
        <p style={{ fontSize: 12, fontWeight: 800, color: t.textMuted, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Possible Conditions</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {data.conditions.map((c, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, animation: 'cardSlideIn 0.35s ease-out both', animationDelay: `${i * 0.08}s` }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: `${c.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{c.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: t.text, margin: 0 }}>{c.name}</p>
                  <span style={{ fontSize: 11, fontWeight: 800, color: c.color }}>{c.confidence}%</span>
                </div>
                <p style={{ fontSize: 11, color: t.textSecondary, margin: '0 0 5px', lineHeight: 1.4 }}>{c.desc}</p>
                {/* Confidence bar */}
                <div style={{ height: 4, background: dark ? '#334155' : '#F1F5F9', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${c.confidence}%`, background: c.color, borderRadius: 2, animation: 'barGrow 0.8s ease-out both', animationDelay: `${i * 0.1 + 0.3}s` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Severity */}
      <div style={{ background: sev.bg, borderRadius: 16, padding: '14px 16px', border: `1px solid ${sev.color}33`, animation: 'cardSlideIn 0.35s ease-out 0.3s both' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <SevIcon size={18} color={sev.color} />
          <p style={{ fontSize: 13, fontWeight: 800, color: sev.color, margin: 0 }}>Severity: {sev.label}</p>
        </div>
        <div style={{ height: 6, background: dark ? '#334155' : 'rgba(0,0,0,0.1)', borderRadius: 3, marginBottom: 8, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${sev.bar}%`, background: sev.color, borderRadius: 3, animation: 'barGrow 1s ease-out 0.4s both' }} />
        </div>
        <p style={{ fontSize: 12, color: sev.color, margin: 0, fontWeight: 600 }}>{data.severityText}</p>
      </div>

      {/* Suggested Specialist */}
      <div style={{ background: t.bgCard, borderRadius: 16, padding: '14px 16px', boxShadow: t.shadow, display: 'flex', alignItems: 'center', gap: 12, animation: 'cardSlideIn 0.35s ease-out 0.4s both' }}>
        <div style={{ width: 44, height: 44, borderRadius: 14, background: dark ? 'rgba(37,99,235,0.15)' : '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>{data.specialist.icon}</div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 11, color: t.textMuted, margin: '0 0 2px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Recommended Specialist</p>
          <p style={{ fontSize: 14, fontWeight: 800, color: t.text, margin: '0 0 2px' }}>{data.specialist.type}</p>
          <p style={{ fontSize: 11, color: t.textSecondary, margin: 0 }}>{data.specialist.reason}</p>
        </div>
      </div>

      {/* Quick Advice */}
      <div style={{ background: t.bgCard, borderRadius: 16, padding: '14px 16px', boxShadow: t.shadow, animation: 'cardSlideIn 0.35s ease-out 0.5s both' }}>
        <p style={{ fontSize: 12, fontWeight: 800, color: t.textMuted, margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Quick Advice</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {data.advice.map((a, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#2563EB', marginTop: 5, flexShrink: 0 }} />
              <p style={{ fontSize: 13, color: t.text, margin: 0, lineHeight: 1.5 }}>{a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: 10, animation: 'cardSlideIn 0.35s ease-out 0.6s both' }}>
        <button onClick={onBook} style={{ flex: 1, height: 46, borderRadius: 14, border: 'none', background: 'linear-gradient(135deg,#2563EB,#1E40AF)', color: 'white', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, boxShadow: '0 4px 16px rgba(37,99,235,0.35)' }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.96)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <Calendar size={15} /> Book Doctor
        </button>
        <button onClick={onSave} style={{ flex: 1, height: 46, borderRadius: 14, border: `1.5px solid ${dark ? '#334155' : '#E5E7EB'}`, background: t.bgCard, color: t.text, fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.96)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <BookmarkPlus size={15} /> Save Report
        </button>
      </div>

      {/* Disclaimer */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, background: dark ? 'rgba(245,158,11,0.08)' : '#FFFBEB', borderRadius: 12, padding: '10px 12px', border: `1px solid ${dark ? 'rgba(245,158,11,0.2)' : '#FDE68A'}` }}>
        <Info size={13} color="#F59E0B" style={{ flexShrink: 0, marginTop: 1 }} />
        <p style={{ fontSize: 11, color: dark ? '#FCD34D' : '#92400E', margin: 0, lineHeight: 1.5 }}>This is AI-generated advice. Always consult a qualified doctor for medical decisions.</p>
      </div>

      {/* Follow-up suggestions */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {data.followUp.map((q, i) => (
          <span key={i} style={{ fontSize: 11, fontWeight: 600, color: t.primary, background: dark ? 'rgba(37,99,235,0.15)' : '#EFF6FF', borderRadius: 20, padding: '5px 12px', border: `1px solid ${dark ? 'rgba(37,99,235,0.3)' : '#BFDBFE'}`, cursor: 'pointer', animation: 'cardSlideIn 0.3s ease-out both', animationDelay: `${i * 0.08 + 0.7}s` }}>{q}</span>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
const quickSymptoms = ['Headache', 'Fever', 'Cough', 'Fatigue', 'Chest Pain', 'Stomach Pain'];

export default function AIChat() {
  const navigate = useNavigate();
  const { t, dark } = useTheme();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [savedReports, setSavedReports] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const startChat = () => {
    haptic.medium();
    setShowIntro(false);
    setMessages([{
      id: 1, role: 'ai', type: 'text',
      text: "Hi! I'm your AI health assistant 🩺\n\nDescribe your symptoms and I'll provide a detailed analysis with possible conditions, severity level, and recommended next steps.",
    }]);
  };

  const send = (text) => {
    if (!text.trim()) return;
    haptic.light();
    setMessages(m => [...m, { id: Date.now(), role: 'user', type: 'text', text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      haptic.success();
      const data = getAIData(text);
      setMessages(m => [...m, { id: Date.now() + 1, role: 'ai', type: 'rich', data }]);
    }, 2000);
  };

  const handleSave = () => {
    haptic.success();
    setSavedReports(r => [...r, { id: Date.now(), date: new Date().toLocaleDateString() }]);
    setMessages(m => [...m, { id: Date.now(), role: 'ai', type: 'text', text: '✅ Report saved! You can find it in your Reports section.' }]);
  };

  const handleBook = (specialty) => {
    haptic.medium();
    navigate('/search');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100svh', background: t.bg, fontFamily: 'Inter, sans-serif', transition: 'background 0.4s ease' }}>

      {/* Header */}
      <div style={{ background: t.headerGrad, padding: '52px 20px 16px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <button onClick={() => { haptic.light(); navigate(-1); }} style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,0.2)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <ArrowLeft size={20} color="white" />
        </button>
        <div style={{ width: 40, height: 40, position: 'relative', flexShrink: 0 }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: 12, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🤖</div>
          <div style={{ position: 'absolute', bottom: 2, right: 2, width: 8, height: 8, borderRadius: '50%', background: '#22C55E', border: '1.5px solid white', animation: 'statusBlink 2s ease-in-out infinite' }} />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ color: 'white', fontSize: 16, fontWeight: 800, margin: 0 }}>AI Symptom Checker</p>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, margin: 0 }}>● Online · Powered by AI</p>
        </div>
        {savedReports.length > 0 && (
          <div style={{ background: '#22C55E', borderRadius: 8, padding: '3px 8px' }}>
            <span style={{ color: 'white', fontSize: 11, fontWeight: 700 }}>{savedReports.length} saved</span>
          </div>
        )}
      </div>

      {/* Intro */}
      {showIntro ? (
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 24px', gap: 20 }}>
          <AIBrainAnimation size={120} />
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: t.text, margin: '0 0 8px' }}>AI Health Assistant</h2>
            <p style={{ fontSize: 14, color: t.textSecondary, margin: 0, lineHeight: 1.6 }}>Get instant structured health insights — conditions, severity, specialist recommendations and more.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
            {[
              { icon: '🔒', text: 'Private & secure analysis' },
              { icon: '🧠', text: 'AI-powered condition matching' },
              { icon: '📊', text: 'Severity & specialist guidance' },
              { icon: '📂', text: 'Save reports for your doctor' },
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, background: t.bgCard, borderRadius: 14, padding: '12px 16px', boxShadow: t.shadow, animation: 'cardSlideIn 0.35s ease-out both', animationDelay: `${i * 0.08}s` }}>
                <span style={{ fontSize: 20 }}>{f.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{f.text}</span>
              </div>
            ))}
          </div>
          <button onClick={startChat} style={{ width: '100%', height: 52, borderRadius: 16, border: 'none', background: t.primaryGrad, color: 'white', fontSize: 16, fontWeight: 700, cursor: 'pointer', boxShadow: '0 8px 24px rgba(37,99,235,0.4)', animation: 'btnGlow 2s ease-in-out infinite' }}>
            Start Symptom Check
          </button>
        </div>
      ) : (
        <>
          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 8px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {messages.map((msg, idx) => (
              <div key={msg.id} style={{ animation: 'msgSlideIn 0.3s ease-out both', animationDelay: `${Math.min(idx * 0.04, 0.2)}s` }}>
                {msg.role === 'user' ? (
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{ maxWidth: '78%', padding: '12px 16px', borderRadius: '18px 18px 4px 18px', background: t.primaryGrad, color: 'white', fontSize: 14, lineHeight: 1.5, boxShadow: '0 4px 16px rgba(37,99,235,0.3)' }}>{msg.text}</div>
                  </div>
                ) : msg.type === 'rich' ? (
                  <AIResponseCard data={msg.data} t={t} dark={dark} onBook={() => handleBook(msg.data.specialty)} onSave={handleSave} />
                ) : (
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
                    <div style={{ width: 32, height: 32, borderRadius: 10, background: dark ? 'rgba(59,130,246,0.2)' : '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>🤖</div>
                    <div style={{ maxWidth: '82%', padding: '12px 14px', borderRadius: '18px 18px 18px 4px', background: t.bgCard, color: t.text, fontSize: 14, lineHeight: 1.6, boxShadow: t.shadow, whiteSpace: 'pre-line' }}>{msg.text}</div>
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: dark ? 'rgba(59,130,246,0.2)' : '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🤖</div>
                <div style={{ background: t.bgCard, borderRadius: '18px 18px 18px 4px', padding: '14px 18px', boxShadow: t.shadow }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', border: `2px solid ${t.primary}`, borderTopColor: 'transparent', animation: 'spin 0.7s linear infinite' }} />
                    <span style={{ fontSize: 11, color: t.primary, fontWeight: 600 }}>AI is analyzing...</span>
                  </div>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {[0, 1, 2].map(i => <div key={i} className="pulse-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: t.textMuted }} />)}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick symptom chips */}
          <div style={{ padding: '8px 16px', display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none', flexShrink: 0 }}>
            {quickSymptoms.map(s => (
              <button key={s} onClick={() => send(s)} style={{ flexShrink: 0, padding: '7px 14px', borderRadius: 20, border: `1.5px solid ${t.border}`, background: t.bgCard, color: t.text, fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s ease' }}
                onMouseDown={e => e.currentTarget.style.transform = 'scale(0.93)'}
                onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
              >{s}</button>
            ))}
          </div>

          {/* Input bar */}
          <div style={{ padding: '8px 16px 28px', background: t.navBg, borderTop: `1px solid ${t.navBorder}`, display: 'flex', gap: 10, alignItems: 'flex-end', flexShrink: 0, transition: 'background 0.4s ease' }}>
            <div style={{ flex: 1, minHeight: 48, borderRadius: 14, background: t.bgInput, border: `1.5px solid ${t.border}`, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 8 }}>
              <input value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send(input)}
                placeholder="Describe your symptoms..."
                style={{ flex: 1, border: 'none', background: 'none', outline: 'none', fontSize: 14, color: t.text, fontFamily: 'Inter, sans-serif', padding: '14px 0' }} />
              <Mic size={18} color={t.textMuted} style={{ flexShrink: 0 }} />
            </div>
            <button onClick={() => send(input)} style={{ width: 48, height: 48, borderRadius: 14, border: 'none', background: input.trim() ? t.primaryGrad : t.chipBg, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.15s ease', flexShrink: 0 }}
              onMouseDown={e => e.currentTarget.style.transform = 'scale(0.92)'}
              onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <Send size={18} color={input.trim() ? 'white' : t.textMuted} />
            </button>
          </div>
        </>
      )}

      <style>{`
        @keyframes statusBlink{0%,100%{opacity:1}50%{opacity:0.4}}
        @keyframes msgSlideIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes cardSlideIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes btnGlow{0%,100%{box-shadow:0 8px 24px rgba(37,99,235,0.4)}50%{box-shadow:0 8px 32px rgba(37,99,235,0.7)}}
        @keyframes barGrow{from{width:0}to{width:var(--w,100%)}}
        @keyframes spin{to{transform:rotate(360deg)}}
      `}</style>
    </div>
  );
}
