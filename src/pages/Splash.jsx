import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate('/intro'), 2800);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen px-8"
      style={{
        background: 'linear-gradient(160deg, #2563EB 0%, #60a5fa 50%, #f9fafb 100%)',
      }}
    >
      {/* Logo */}
      <div className="fade-in-up flex flex-col items-center gap-4">
        <div className="w-20 h-20 rounded-3xl bg-white shadow-lg flex items-center justify-center">
          <span className="text-4xl">🩺</span>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white tracking-tight">PulseCare</h1>
          <p className="text-blue-100 mt-2 text-base font-medium">
            Smart healthcare at your fingertips
          </p>
        </div>
      </div>

      {/* Pulsing dots loader */}
      <div className="flex gap-2 mt-16">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="pulse-dot w-2.5 h-2.5 rounded-full bg-white opacity-80"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}
