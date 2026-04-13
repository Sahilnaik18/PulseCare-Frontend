import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';
import { useOnboarding } from '../context/OnboardingContext';

function SkeletonLoader() {
  return (
    <div className="flex flex-col gap-5 animate-pulse">
      <div className="skeleton h-5 w-28 mb-1" />
      <div className="skeleton h-14 w-full" />
      <div className="skeleton h-14 w-full" />
      <div className="flex items-center gap-3 my-1">
        <div className="flex-1 h-px bg-[#E5E7EB]" />
        <div className="skeleton h-4 w-6" />
        <div className="flex-1 h-px bg-[#E5E7EB]" />
      </div>
      <div className="skeleton h-14 w-full" />
    </div>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const { update } = useOnboarding();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [pageReady, setPageReady] = useState(false);

  // Simulate brief skeleton on mount
  useEffect(() => {
    const t = setTimeout(() => setPageReady(true), 500);
    return () => clearTimeout(t);
  }, []);

  const handleContinue = () => {
    if (!/^\d{10}$/.test(phone)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    setLoading(true);
    update({ phone });
    setTimeout(() => {
      setLoading(false);
      navigate('/otp');
    }, 800);
  };

  return (
    <div className="page-enter flex flex-col min-h-screen bg-[#F9FAFB] px-6 pt-16 safe-bottom">
      {/* Header */}
      <div className="fade-in-up mb-10">
        <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
          <span className="text-3xl">🩺</span>
        </div>
        <h1 className="text-3xl font-bold text-[#111827] leading-tight">
          Welcome to<br />PulseCare
        </h1>
        <p className="text-[#6B7280] mt-2 text-base">Your health, simplified.</p>
      </div>

      {/* Form — skeleton until ready */}
      {!pageReady ? (
        <SkeletonLoader />
      ) : (
        <div className="flex flex-col gap-5 fade-in-up" style={{ animationDelay: '0.05s' }}>
          <Input
            label="Mobile Number"
            icon={<Phone size={18} />}
            prefix="+91"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            placeholder="Enter 10-digit number"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value.replace(/\D/g, ''));
              setError('');
            }}
            error={error}
          />

          <Button onClick={handleContinue} loading={loading}>
            Continue with OTP
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[#E5E7EB]" />
            <span className="text-[#9CA3AF] text-sm font-medium">OR</span>
            <div className="flex-1 h-px bg-[#E5E7EB]" />
          </div>

          {/* Google button */}
          <Button variant="secondary" onClick={() => {}}>
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </Button>
        </div>
      )}

      <p className="text-center text-xs text-[#9CA3AF] mt-auto pt-8 pb-4">
        By continuing, you agree to our{' '}
        <span className="text-[#2563EB] font-medium">Terms</span> &{' '}
        <span className="text-[#2563EB] font-medium">Privacy Policy</span>
      </p>
    </div>
  );
}
