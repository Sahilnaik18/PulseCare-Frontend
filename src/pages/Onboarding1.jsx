import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User } from 'lucide-react';
import Button from '../components/Button';
import AgePicker from '../components/AgePicker';
import { useOnboarding } from '../context/OnboardingContext';

// Brand-consistent SVG gender icons — all use the same stroke color logic
const MaleIcon = ({ color }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="11" cy="16" r="7" stroke={color} strokeWidth="2.2" />
    <line x1="16.5" y1="10.5" x2="23" y2="4" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <polyline points="19,4 23,4 23,8" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FemaleIcon = ({ color }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="11" r="7" stroke={color} strokeWidth="2.2" />
    <line x1="14" y1="18" x2="14" y2="26" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <line x1="10" y1="22" x2="18" y2="22" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

const OtherIcon = ({ color }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="13" r="7" stroke={color} strokeWidth="2.2" />
    <line x1="14" y1="20" x2="14" y2="26" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <line x1="10" y1="24" x2="18" y2="24" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <line x1="19" y1="8" x2="24" y2="3" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <polyline points="21,3 24,3 24,6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const genders = [
  { label: 'Male',   Icon: MaleIcon },
  { label: 'Female', Icon: FemaleIcon },
  { label: 'Other',  Icon: OtherIcon },
];

export default function Onboarding1() {
  const navigate = useNavigate();
  const { data, update } = useOnboarding();
  const [age, setAge] = useState(Number(data.age) || 25);
  const [gender, setGender] = useState(data.gender || '');

  const handleNext = () => {
    update({ age, gender });
    navigate('/onboarding/2');
  };

  return (
    <div className="page-enter flex flex-col min-h-screen bg-[#F9FAFB] px-6 pt-12 safe-bottom">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="w-10 h-10 rounded-2xl bg-white border border-[#E5E7EB] flex items-center justify-center shadow-sm mb-6 active:scale-95 transition-transform"
      >
        <ArrowLeft size={20} className="text-[#374151]" />
      </button>

      {/* Progress */}
      <div className="flex gap-2 mb-6">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${s === 1 ? 'bg-[#2563EB]' : 'bg-[#E5E7EB]'}`}
          />
        ))}
      </div>

      {/* Header */}
      <div className="fade-in-up mb-7">
        <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-4">
          <User size={28} className="text-[#2563EB]" />
        </div>
        <h1 className="text-3xl font-bold text-[#111827]">Tell us<br />about you</h1>
        <p className="text-[#6B7280] mt-1.5 text-sm">Help us personalize your experience</p>
      </div>

      <div className="flex flex-col gap-7 fade-in-up" style={{ animationDelay: '0.1s' }}>

        {/* ── Age Picker ── */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-[#111827]">Your Age</label>
            <span className="text-xs text-[#6B7280]">Scroll or tap ↑↓</span>
          </div>
          <AgePicker value={age} onChange={setAge} />
        </div>

        {/* ── Gender ── */}
        <div className="flex flex-col gap-3">
          <label className="text-sm font-semibold text-[#111827]">Gender</label>
          <div className="flex gap-3">
            {genders.map(({ label, Icon }) => {
              const active = gender === label;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => setGender(label)}
                  className="gender-card flex-1 flex flex-col items-center gap-2.5 py-5 rounded-2xl border-2 font-semibold text-sm"
                  style={{
                    background: active
                      ? 'linear-gradient(135deg, #2563EB, #3B82F6)'
                      : '#FFFFFF',
                    borderColor: active ? '#2563EB' : '#E5E7EB',
                    color: active ? '#FFFFFF' : '#374151',
                    boxShadow: active
                      ? '0 6px 20px rgba(37,99,235,0.28)'
                      : '0 1px 4px rgba(0,0,0,0.05)',
                  }}
                >
                  <Icon color={active ? '#FFFFFF' : '#2563EB'} />
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <Button onClick={handleNext} disabled={!gender}>
          Next →
        </Button>
      </div>
    </div>
  );
}
