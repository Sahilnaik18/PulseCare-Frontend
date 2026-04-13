import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserCircle, Mail } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';
import { useOnboarding } from '../context/OnboardingContext';

export default function Onboarding3() {
  const navigate = useNavigate();
  const { data, update } = useOnboarding();
  const [name, setName] = useState(data.name || '');
  const [email, setEmail] = useState(data.email || '');
  const [loading, setLoading] = useState(false);

  const handleFinish = () => {
    update({ name, email });
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/welcome');
    }, 900);
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
          <div key={s} className="h-1.5 flex-1 rounded-full bg-[#2563EB]" />
        ))}
      </div>

      <div className="fade-in-up mb-8">
        <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mb-6">
          <UserCircle size={28} className="text-[#22C55E]" />
        </div>
        <h1 className="text-3xl font-bold text-[#111827]">Complete your<br />profile</h1>
        <p className="text-[#6B7280] mt-2 text-sm">Almost there — just a few more details</p>
      </div>

      <div className="flex flex-col gap-5 fade-in-up" style={{ animationDelay: '0.1s' }}>
        <Input
          label="Full Name"
          icon={<UserCircle size={18} />}
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Email (optional)"
          icon={<Mail size={18} />}
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-3 mt-auto pt-8">
        <Button onClick={handleFinish} loading={loading} disabled={!name}>
          Finish Setup ✓
        </Button>
        <Button variant="ghost" onClick={() => navigate('/welcome')}>
          Skip for now
        </Button>
      </div>
    </div>
  );
}
