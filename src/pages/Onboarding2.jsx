import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Activity } from 'lucide-react';
import Button from '../components/Button';
import Chip from '../components/Chip';
import { useOnboarding } from '../context/OnboardingContext';

const conditions = [
  { label: 'Diabetes', icon: '🩸' },
  { label: 'Blood Pressure', icon: '💓' },
  { label: 'Heart Issues', icon: '❤️' },
  { label: 'Asthma', icon: '🫁' },
  { label: 'Thyroid', icon: '🔬' },
  { label: 'None', icon: '✅' },
];

export default function Onboarding2() {
  const navigate = useNavigate();
  const { data, update } = useOnboarding();
  const [selected, setSelected] = useState(data.conditions || []);

  const toggle = (label) => {
    if (label === 'None') {
      setSelected(['None']);
      return;
    }
    setSelected((prev) => {
      const without = prev.filter((c) => c !== 'None');
      return without.includes(label)
        ? without.filter((c) => c !== label)
        : [...without, label];
    });
  };

  const handleNext = () => {
    update({ conditions: selected });
    navigate('/onboarding/3');
  };

  return (
    <div className="page-enter flex flex-col min-h-screen bg-[#F9FAFB] px-6 pt-12 pb-8">
      <button
        onClick={() => navigate(-1)}
        className="w-10 h-10 rounded-2xl bg-white border border-[#E5E7EB] flex items-center justify-center shadow-sm mb-8 active:scale-95 transition-transform"
      >
        <ArrowLeft size={20} className="text-[#374151]" />
      </button>

      {/* Progress */}
      <div className="flex gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${s <= 2 ? 'bg-[#2563EB]' : 'bg-[#E5E7EB]'}`}
          />
        ))}
      </div>

      <div className="fade-in-up mb-8">
        <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center mb-6">
          <Activity size={28} className="text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-[#111827]">Any existing<br />conditions?</h1>
        <p className="text-[#6B7280] mt-2 text-sm">Select all that apply</p>
      </div>

      <div className="flex flex-wrap gap-3 fade-in-up mb-8" style={{ animationDelay: '0.1s' }}>
        {conditions.map(({ label, icon }) => (
          <Chip
            key={label}
            label={label}
            icon={icon}
            selected={selected.includes(label)}
            onClick={() => toggle(label)}
          />
        ))}
      </div>

      <div className="flex flex-col gap-3 mt-auto">
        <Button onClick={handleNext}>Next →</Button>
        <Button variant="ghost" onClick={() => navigate('/onboarding/3')}>
          Skip for now
        </Button>
      </div>
    </div>
  );
}
