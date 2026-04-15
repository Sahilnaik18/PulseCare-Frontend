import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useOnboarding } from '../context/OnboardingContext';

export default function Welcome() {
  const navigate = useNavigate();
  const { data } = useOnboarding();

  return (
    <div className="page-enter flex flex-col items-center justify-center min-h-screen bg-[#F9FAFB] px-6 pb-10 text-center">
      <div
        className="fade-in-up w-56 h-56 rounded-3xl mb-8 flex flex-col items-center justify-center shadow-lg"
        style={{ background: 'linear-gradient(135deg, #dbeafe 0%, #dcfce7 100%)' }}
      >
        <span className="text-7xl">🎉</span>
        <span className="text-5xl mt-2">🩺</span>
      </div>

      <div className="fade-in-up" style={{ animationDelay: '0.15s' }}>
        <h1 className="text-3xl font-bold text-[#111827] leading-tight">
          {data.name ? `Welcome, ${data.name}!` : "You're all set!"}
        </h1>
        <p className="text-[#6B7280] mt-3 text-base leading-relaxed">
          Let's take care of your health.<br />
          Your personalized health journey starts now.
        </p>
      </div>

      {(data.age || data.gender || data.conditions?.length > 0) && (
        <div
          className="fade-in-up w-full mt-8 bg-white rounded-2xl p-4 shadow-md border border-[#E5E7EB] flex gap-4 justify-around"
          style={{ animationDelay: '0.25s' }}
        >
          {data.age && (
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl">🎂</span>
              <span className="text-sm font-semibold text-[#111827]">{data.age} yrs</span>
              <span className="text-xs text-[#6B7280]">Age</span>
            </div>
          )}
          {data.gender && (
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl">{data.gender === 'Male' ? '👨' : data.gender === 'Female' ? '👩' : '🧑'}</span>
              <span className="text-sm font-semibold text-[#111827]">{data.gender}</span>
              <span className="text-xs text-[#6B7280]">Gender</span>
            </div>
          )}
          {data.conditions?.length > 0 && (
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl">📋</span>
              <span className="text-sm font-semibold text-[#111827]">{data.conditions.length}</span>
              <span className="text-xs text-[#6B7280]">Conditions</span>
            </div>
          )}
        </div>
      )}

      <div className="w-full mt-8 fade-in-up" style={{ animationDelay: '0.35s' }}>
        <Button onClick={() => navigate('/home')}>
          Go to Home 🏠
        </Button>
      </div>
    </div>
  );
}
