import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Download, Eye, Plus } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import EmptyState from '../components/EmptyState';
import { reports } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';
import { haptic } from '../utils/haptics';

export default function ReportsPage() {
  const navigate = useNavigate();
  const { t, dark } = useTheme();
  const [list, setList] = useState(reports);
  const [uploading, setUploading] = useState(false);

  const simulateUpload = () => {
    haptic.medium();
    setUploading(true);
    setTimeout(() => {
      setList(l => [{ id: Date.now(), name: 'New Report', date: 'Today', icon: '📄', type: 'Lab Report', size: '0.3 MB' }, ...l]);
      setUploading(false);
      haptic.success();
    }, 1500);
  };

  return (
    <div style={{ background: t.bg, height: '100%', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif', transition: 'background 0.4s ease' }}>
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 16 }}>

      {/* Header */}
      <div style={{ background: t.headerGrad, padding: '52px 20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => { haptic.light(); navigate(-1); }} style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,0.2)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <ArrowLeft size={20} color="white" />
            </button>
            <h1 style={{ color: 'white', fontSize: 20, fontWeight: 800, margin: 0 }}>My Reports</h1>
          </div>
          <button onClick={simulateUpload} style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,0.2)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Plus size={20} color="white" />
          </button>
        </div>
      </div>

      <div style={{ padding: '16px 20px 0' }}>
        {/* Upload area */}
        <button onClick={simulateUpload} style={{
          width: '100%', borderRadius: 18,
          border: `2px dashed ${dark ? t.uploadBorder : '#BFDBFE'}`,
          background: t.uploadBg,
          padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          cursor: 'pointer', marginBottom: 20,
          transition: 'all 0.2s ease',
        }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          {uploading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', border: `3px solid ${t.primary}`, borderTopColor: 'transparent', animation: 'spin 0.7s linear infinite' }} />
              <span style={{ fontSize: 13, color: t.primary, fontWeight: 600 }}>Uploading...</span>
            </div>
          ) : (
            <>
              <Upload size={24} color={t.primary} />
              <span style={{ fontSize: 14, fontWeight: 700, color: t.primary }}>Upload Report</span>
              <span style={{ fontSize: 12, color: dark ? '#60A5FA' : '#93C5FD' }}>PDF, JPG, PNG up to 10MB</span>
            </>
          )}
        </button>

        {list.length === 0 ? (
          <EmptyState type="reports" dark={dark} onAction={simulateUpload} actionLabel="Upload Report" />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {list.map((r, idx) => (
              <div key={r.id} style={{
                background: t.bgCard, borderRadius: 18, padding: '16px',
                display: 'flex', alignItems: 'center', gap: 14,
                boxShadow: t.shadow,
                animation: 'cardSlideIn 0.35s ease-out both',
                animationDelay: `${idx * 0.06}s`,
              }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: dark ? '#1E293B' : '#F8FAFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>{r.icon}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: t.text, margin: '0 0 2px' }}>{r.name}</p>
                  <p style={{ fontSize: 11, color: t.textMuted, margin: 0 }}>{r.type} · {r.date} · {r.size}</p>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => haptic.light()} style={{ width: 34, height: 34, borderRadius: 10, border: 'none', background: dark ? 'rgba(59,130,246,0.15)' : '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <Eye size={15} color={t.primary} />
                  </button>
                  <button onClick={() => haptic.light()} style={{ width: 34, height: 34, borderRadius: 10, border: 'none', background: dark ? 'rgba(34,197,94,0.15)' : '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <Download size={15} color="#22C55E" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      </div>
      <BottomNav />
      <style>{`
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes cardSlideIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}
