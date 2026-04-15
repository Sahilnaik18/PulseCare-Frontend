import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pulsemateLogo from '../assets/pulsemate.png';

export default function Splash() {
  const navigate = useNavigate();
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    // Show tagline after logo settles
    const t1 = setTimeout(() => setShowTagline(true), 700);
    const t2 = setTimeout(() => navigate('/intro'), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [navigate]);

  return (
    <div
      style={{
        minHeight: '100svh',
        background: 'linear-gradient(180deg, #6B7FE3 0%, #3D52D5 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0,
      }}
    >
      {/* Logo — fixed size, no animation, just clean render */}
      <img
        src={pulsemateLogo}
        alt="PulseMate"
        style={{
          width: 160,
          height: 160,
          objectFit: 'contain',
          display: 'block',
          animation: 'logoIn 0.5s ease-out forwards',
        }}
      />

      {/* Tagline — types in character by character */}
      <div style={{ marginTop: 20, textAlign: 'center', minHeight: 52 }}>
        {showTagline && (
          <>
            <p
              style={{
                color: 'rgba(255,255,255,0.95)',
                fontSize: 15,
                fontWeight: 500,
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '0.06em',
                animation: 'typeIn 1.2s steps(22, end) forwards',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                width: 0,
                borderRight: '2px solid rgba(255,255,255,0.7)',
              }}
            >
              Your Health. Your Mate.
            </p>
          </>
        )}
      </div>

      <style>{`
        @keyframes logoIn {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes typeIn {
          from { width: 0; }
          to   { width: 200px; border-color: transparent; }
        }
      `}</style>
    </div>
  );
}
