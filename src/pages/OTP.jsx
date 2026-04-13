import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import OTPInput from '../components/OTPInput';
import Button from '../components/Button';
import { useOnboarding } from '../context/OnboardingContext';

export default function OTP() {
  const navigate = useNavigate();
  const { data } = useOnboarding();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer === 0) { setCanResend(true); return; }
    const t = setTimeout(() => setTimer((p) => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  const handleVerify = () => {
    if (otp.length < 6) {
      setError('Please enter the complete 6-digit OTP');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/onboarding/1');
    }, 900);
  };

  const handleResend = () => {
    setTimer(30);
    setCanResend(false);
    setOtp('');
    setError('');
  };

  return (
    <div className="page-enter flex flex-col min-h-screen bg-[#F9FAFB] px-6 pt-12 pb-8">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="w-10 h-10 rounded-2xl bg-white border border-[#E5E7EB] flex items-center justify-center shadow-sm mb-8 active:scale-95 transition-transform"
      >
        <ArrowLeft size={20} className="text-[#374151]" />
      </button>

      <div className="fade-in-up mb-10">
        <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mb-6">
          <MessageSquare size={28} className="text-[#22C55E]" />
        </div>
        <h1 className="text-3xl font-bold text-[#111827]">Verify your<br />number</h1>
        <p className="text-[#6B7280] mt-2 text-sm">
          Enter the 6-digit OTP sent to{' '}
          <span className="font-semibold text-[#111827]">+91 {data.phone || 'XXXXXXXXXX'}</span>
        </p>
      </div>

      <div className="flex flex-col gap-8 fade-in-up" style={{ animationDelay: '0.1s' }}>
        <OTPInput value={otp} onChange={setOtp} />

        {error && (
          <p className="text-center text-sm text-red-500">{error}</p>
        )}

        {/* Timer / Resend */}
        <div className="text-center">
          {canResend ? (
            <button
              onClick={handleResend}
              className="text-[#2563EB] font-semibold text-sm active:opacity-70"
            >
              Resend OTP
            </button>
          ) : (
            <p className="text-[#6B7280] text-sm">
              Resend OTP in{' '}
              <span className="font-semibold text-[#111827]">00:{String(timer).padStart(2, '0')}</span>
            </p>
          )}
        </div>

        <Button onClick={handleVerify} loading={loading}>
          Verify &amp; Continue
        </Button>
      </div>

      <p className="text-center text-xs text-[#9CA3AF] mt-auto pt-8">
        Didn't receive it? Check your SMS inbox or try resending.
      </p>
    </div>
  );
}
