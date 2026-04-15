import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit2, ChevronRight, Bell, Shield, HelpCircle, LogOut, Moon, Sun, Check, X, Plus, Camera } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { useTheme } from '../context/ThemeContext';
import { useProfile } from '../context/ProfileContext';
import { haptic } from '../utils/haptics';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const GENDERS = ['Male', 'Female', 'Other', 'Prefer not to say'];
const AVATARS = ['👤', '👨', '👩', '🧑', '👴', '👵', '🧔', '👱'];

// ── Chip tag component ──────────────────────────────────────────────────────
function Chip({ label, onRemove, color = '#2563EB', t }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: `${color}18`, borderRadius: 20, padding: '5px 10px 5px 12px', border: `1px solid ${color}33` }}>
      <span style={{ fontSize: 12, fontWeight: 600, color }}>{label}</span>
      {onRemove && (
        <button onClick={onRemove} style={{ width: 16, height: 16, borderRadius: '50%', background: `${color}33`, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
          <X size={9} color={color} />
        </button>
      )}
    </div>
  );
}

// ── Field row for view mode ─────────────────────────────────────────────────
function FieldRow({ label, value, last, t }) {
  return (
    <div style={{ padding: '13px 0', borderBottom: last ? 'none' : `1px solid ${t.border}` }}>
      <p style={{ fontSize: 11, fontWeight: 600, color: t.textMuted, margin: '0 0 3px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
      <p style={{ fontSize: 14, fontWeight: 600, color: t.text, margin: 0 }}>{value || '—'}</p>
    </div>
  );
}

// ── Text input for edit mode ────────────────────────────────────────────────
function Field({ label, value, onChange, type = 'text', multiline, t }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <p style={{ fontSize: 12, fontWeight: 700, color: t.textSecondary, margin: '0 0 6px' }}>{label}</p>
      {multiline ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} rows={3}
          style={{ width: '100%', borderRadius: 12, border: `1.5px solid ${t.border}`, background: t.bgInput, color: t.text, fontSize: 14, padding: '10px 14px', outline: 'none', fontFamily: 'Inter, sans-serif', resize: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s ease' }}
          onFocus={e => { haptic.light(); e.target.style.borderColor = '#2563EB'; }}
          onBlur={e => e.target.style.borderColor = t.border}
        />
      ) : (
        <input type={type} value={value} onChange={e => onChange(e.target.value)}
          style={{ width: '100%', height: 46, borderRadius: 12, border: `1.5px solid ${t.border}`, background: t.bgInput, color: t.text, fontSize: 14, padding: '0 14px', outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box', transition: 'border-color 0.2s ease' }}
          onFocus={e => { haptic.light(); e.target.style.borderColor = '#2563EB'; }}
          onBlur={e => e.target.style.borderColor = t.border}
        />
      )}
    </div>
  );
}

// ── Select field ────────────────────────────────────────────────────────────
function SelectField({ label, value, options, onChange, t }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <p style={{ fontSize: 12, fontWeight: 700, color: t.textSecondary, margin: '0 0 6px' }}>{label}</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {options.map(o => (
          <button key={o} onClick={() => { haptic.light(); onChange(o); }} style={{ padding: '7px 14px', borderRadius: 20, border: `1.5px solid ${value === o ? '#2563EB' : t.border}`, background: value === o ? (t.navBg === '#1E293B' ? 'rgba(37,99,235,0.2)' : '#EFF6FF') : t.bgCard, color: value === o ? '#2563EB' : t.text, fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s ease' }}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Chips editor ────────────────────────────────────────────────────────────
function ChipsEditor({ label, items, onAdd, onRemove, color, placeholder, t }) {
  const [input, setInput] = useState('');
  const add = () => {
    if (!input.trim()) return;
    haptic.light();
    onAdd(input.trim());
    setInput('');
  };
  return (
    <div style={{ marginBottom: 14 }}>
      <p style={{ fontSize: 12, fontWeight: 700, color: t.textSecondary, margin: '0 0 8px' }}>{label}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 8 }}>
        {items.map(item => <Chip key={item} label={item} color={color} onRemove={() => onRemove(item)} t={t} />)}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && add()} placeholder={placeholder}
          style={{ flex: 1, height: 38, borderRadius: 10, border: `1.5px solid ${t.border}`, background: t.bgInput, color: t.text, fontSize: 13, padding: '0 12px', outline: 'none', fontFamily: 'Inter, sans-serif' }}
          onFocus={e => e.target.style.borderColor = color}
          onBlur={e => e.target.style.borderColor = t.border}
        />
        <button onClick={add} style={{ width: 38, height: 38, borderRadius: 10, border: 'none', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Plus size={16} color="white" />
        </button>
      </div>
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────────────────
export default function ProfilePage() {
  const navigate = useNavigate();
  const { t, dark, toggle } = useTheme();
  const { profile, update } = useProfile();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(null);
  const [saved, setSaved] = useState(false);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  const startEdit = () => {
    haptic.medium();
    setDraft({ ...profile });
    setEditing(true);
  };

  const cancelEdit = () => {
    haptic.light();
    setDraft(null);
    setEditing(false);
  };

  const saveEdit = () => {
    // Basic validation
    if (!draft.name.trim()) return;
    haptic.success();
    update(draft);
    setEditing(false);
    setDraft(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const d = editing ? draft : profile;
  const setD = (key) => (val) => setDraft(prev => ({ ...prev, [key]: val }));
  const addChip = (key) => (val) => setDraft(prev => ({ ...prev, [key]: [...(prev[key] || []), val] }));
  const removeChip = (key) => (val) => setDraft(prev => ({ ...prev, [key]: prev[key].filter(x => x !== val) }));

  const menuItems = [
    { icon: Bell,        label: 'Notifications',     color: '#F59E0B', action: () => navigate('/notifications') },
    { icon: Shield,      label: 'Privacy & Security', color: '#22C55E', action: () => haptic.light() },
    { icon: HelpCircle,  label: 'Help & Support',     color: '#3B82F6', action: () => haptic.light() },
    { icon: LogOut,      label: 'Logout',             color: '#EF4444', action: () => haptic.light() },
  ];

  return (
    <div style={{ background: t.bg, height: '100%', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif', transition: 'background 0.4s ease', position: 'relative' }}>
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 16 }}>

        {/* Header */}
        <div style={{ background: t.headerGrad, padding: '52px 20px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button onClick={() => { haptic.light(); editing ? cancelEdit() : navigate(-1); }} style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,0.2)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <ArrowLeft size={20} color="white" />
              </button>
              <h1 style={{ color: 'white', fontSize: 20, fontWeight: 800, margin: 0 }}>{editing ? 'Edit Profile' : 'Profile'}</h1>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => { haptic.light(); toggle(); }} style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,0.2)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                {dark ? <Sun size={18} color="white" /> : <Moon size={18} color="white" />}
              </button>
              {!editing && (
                <button onClick={startEdit} style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,0.2)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <Edit2 size={18} color="white" />
                </button>
              )}
            </div>
          </div>

          {/* Avatar + name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{ width: 76, height: 76, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: '3px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 38 }}>{d.avatar}</div>
              {editing && (
                <button onClick={() => setShowAvatarPicker(true)} style={{ position: 'absolute', bottom: 0, right: 0, width: 26, height: 26, borderRadius: '50%', background: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
                  <Camera size={13} color="#2563EB" />
                </button>
              )}
            </div>
            <div>
              <h2 style={{ color: 'white', fontSize: 20, fontWeight: 800, margin: '0 0 3px' }}>{d.name || 'Your Name'}</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, margin: '0 0 2px' }}>{d.gender}{d.dob ? ` · ${new Date().getFullYear() - new Date(d.dob).getFullYear()} yrs` : ''}</p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, margin: 0 }}>+91 {d.phone}</p>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, padding: '16px 20px 0' }}>
          {[
            { label: 'Blood Group', value: d.bloodGroup || '—' },
            { label: 'Conditions',  value: d.conditions?.length || 0 },
            { label: 'Allergies',   value: d.allergies?.length || 0 },
          ].map(s => (
            <div key={s.label} style={{ background: t.bgCard, borderRadius: 14, padding: '12px 10px', textAlign: 'center', boxShadow: t.shadow }}>
              <p style={{ fontSize: 16, fontWeight: 800, color: t.primary, margin: '0 0 2px' }}>{s.value}</p>
              <p style={{ fontSize: 10, color: t.textMuted, margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>

        <div style={{ padding: '16px 20px 0' }}>

          {/* ── VIEW MODE ── */}
          {!editing && (
            <>
              {/* Personal info */}
              <div style={{ background: t.bgCard, borderRadius: 18, padding: '4px 16px', boxShadow: t.shadow, marginBottom: 16 }}>
                <h3 style={{ fontSize: 13, fontWeight: 800, color: t.textMuted, margin: '14px 0 0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Personal Information</h3>
                {[
                  { label: 'Full Name',          value: profile.name },
                  { label: 'Phone Number',        value: `+91 ${profile.phone}` },
                  { label: 'Email',               value: profile.email },
                  { label: 'Date of Birth',       value: profile.dob ? new Date(profile.dob).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '—' },
                  { label: 'Gender',              value: profile.gender },
                  { label: 'Blood Group',         value: profile.bloodGroup },
                  { label: 'Address',             value: profile.address },
                  { label: 'Emergency Contact',   value: `+91 ${profile.emergencyContact}`, last: true },
                ].map((f, i, arr) => <FieldRow key={f.label} {...f} last={i === arr.length - 1} t={t} />)}
              </div>

              {/* Medical info */}
              <div style={{ background: t.bgCard, borderRadius: 18, padding: '16px', boxShadow: t.shadow, marginBottom: 16 }}>
                <h3 style={{ fontSize: 13, fontWeight: 800, color: t.textMuted, margin: '0 0 14px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Medical Information</h3>
                {[
                  { label: 'Conditions', items: profile.conditions, color: '#EF4444' },
                  { label: 'Allergies',  items: profile.allergies,  color: '#F59E0B' },
                  { label: 'Medications', items: profile.medications, color: '#8B5CF6' },
                ].map(sec => (
                  <div key={sec.label} style={{ marginBottom: 14 }}>
                    <p style={{ fontSize: 11, fontWeight: 600, color: t.textMuted, margin: '0 0 7px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{sec.label}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                      {sec.items?.length ? sec.items.map(item => <Chip key={item} label={item} color={sec.color} t={t} />) : <span style={{ fontSize: 13, color: t.textMuted }}>None added</span>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Dark mode toggle */}
              <div style={{ background: t.bgCard, borderRadius: 18, overflow: 'hidden', boxShadow: t.shadow, marginBottom: 16 }}>
                <button onClick={() => { haptic.light(); toggle(); }} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '16px', background: 'none', border: 'none', cursor: 'pointer' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: dark ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {dark ? <Sun size={18} color="#6366F1" /> : <Moon size={18} color="#6366F1" />}
                  </div>
                  <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: t.text, textAlign: 'left' }}>{dark ? 'Light Mode' : 'Dark Mode'}</span>
                  <div style={{ width: 44, height: 24, borderRadius: 12, background: dark ? t.primary : t.border, position: 'relative', transition: 'background 0.3s ease' }}>
                    <div style={{ position: 'absolute', top: 3, left: dark ? 23 : 3, width: 18, height: 18, borderRadius: '50%', background: 'white', boxShadow: '0 1px 4px rgba(0,0,0,0.2)', transition: 'left 0.3s ease' }} />
                  </div>
                </button>
              </div>

              {/* Menu */}
              <div style={{ background: t.bgCard, borderRadius: 18, overflow: 'hidden', boxShadow: t.shadow }}>
                {menuItems.map(({ icon: Icon, label, color, action }, i) => (
                  <button key={label} onClick={() => { haptic.light(); action(); }} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '16px', background: 'none', border: 'none', cursor: 'pointer', borderBottom: i < menuItems.length - 1 ? `1px solid ${t.border}` : 'none' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={18} color={color} />
                    </div>
                    <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: label === 'Logout' ? '#EF4444' : t.text, textAlign: 'left' }}>{label}</span>
                    <ChevronRight size={16} color={t.textMuted} />
                  </button>
                ))}
              </div>
            </>
          )}

          {/* ── EDIT MODE ── */}
          {editing && draft && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, animation: 'fadeIn 0.25s ease-out' }}>
              <div style={{ background: t.bgCard, borderRadius: 18, padding: '16px', boxShadow: t.shadow, marginBottom: 14 }}>
                <p style={{ fontSize: 13, fontWeight: 800, color: t.textMuted, margin: '0 0 14px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Personal Information</p>
                <Field label="Full Name *"        value={draft.name}             onChange={setD('name')}             t={t} />
                <Field label="Phone Number"       value={draft.phone}            onChange={setD('phone')}            type="tel" t={t} />
                <Field label="Email Address"      value={draft.email}            onChange={setD('email')}            type="email" t={t} />
                <Field label="Date of Birth"      value={draft.dob}              onChange={setD('dob')}              type="date" t={t} />
                <Field label="Emergency Contact"  value={draft.emergencyContact} onChange={setD('emergencyContact')} type="tel" t={t} />
                <Field label="Address"            value={draft.address}          onChange={setD('address')}          multiline t={t} />
                <SelectField label="Gender"      value={draft.gender}     options={GENDERS}      onChange={setD('gender')}     t={t} />
                <SelectField label="Blood Group" value={draft.bloodGroup} options={BLOOD_GROUPS} onChange={setD('bloodGroup')} t={t} />
              </div>

              <div style={{ background: t.bgCard, borderRadius: 18, padding: '16px', boxShadow: t.shadow, marginBottom: 14 }}>
                <p style={{ fontSize: 13, fontWeight: 800, color: t.textMuted, margin: '0 0 14px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Medical Information</p>
                <ChipsEditor label="Known Conditions" items={draft.conditions || []} onAdd={addChip('conditions')} onRemove={removeChip('conditions')} color="#EF4444" placeholder="e.g. Diabetes" t={t} />
                <ChipsEditor label="Allergies"        items={draft.allergies || []}  onAdd={addChip('allergies')}  onRemove={removeChip('allergies')}  color="#F59E0B" placeholder="e.g. Penicillin" t={t} />
                <ChipsEditor label="Medications"      items={draft.medications || []} onAdd={addChip('medications')} onRemove={removeChip('medications')} color="#8B5CF6" placeholder="e.g. Metformin 500mg" t={t} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit mode bottom bar */}
      {editing && (
        <div style={{ flexShrink: 0, padding: '12px 20px 20px', background: t.navBg, borderTop: `1px solid ${t.navBorder}`, display: 'flex', gap: 10 }}>
          <button onClick={cancelEdit} style={{ flex: 1, height: 48, borderRadius: 14, border: `1.5px solid ${t.border}`, background: 'none', color: t.text, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
          <button onClick={saveEdit} style={{ flex: 2, height: 48, borderRadius: 14, border: 'none', background: draft?.name?.trim() ? 'linear-gradient(135deg,#2563EB,#1E40AF)' : t.chipBg, color: draft?.name?.trim() ? 'white' : t.textMuted, fontSize: 14, fontWeight: 700, cursor: draft?.name?.trim() ? 'pointer' : 'not-allowed', boxShadow: draft?.name?.trim() ? '0 6px 20px rgba(37,99,235,0.35)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <Check size={16} /> Save Changes
          </button>
        </div>
      )}

      {!editing && <BottomNav />}

      {/* Avatar picker */}
      {showAvatarPicker && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 300, display: 'flex', alignItems: 'flex-end' }}>
          <div onClick={() => setShowAvatarPicker(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} />
          <div style={{ position: 'relative', width: '100%', background: t.bgCard, borderRadius: '24px 24px 0 0', padding: '20px 20px 36px', animation: 'slideUp 0.3s ease-out' }}>
            <div style={{ width: 40, height: 4, background: t.border, borderRadius: 2, margin: '0 auto 16px' }} />
            <p style={{ fontSize: 15, fontWeight: 800, color: t.text, margin: '0 0 16px' }}>Choose Avatar</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
              {AVATARS.map(a => (
                <button key={a} onClick={() => { setDraft(p => ({ ...p, avatar: a })); setShowAvatarPicker(false); haptic.light(); }} style={{ width: 56, height: 56, borderRadius: '50%', background: draft?.avatar === a ? (dark ? 'rgba(37,99,235,0.2)' : '#EFF6FF') : t.bgSecondary, border: `2px solid ${draft?.avatar === a ? '#2563EB' : 'transparent'}`, fontSize: 28, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{a}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Success toast */}
      {saved && (
        <div style={{ position: 'absolute', bottom: 90, left: 20, right: 20, zIndex: 400, background: '#22C55E', borderRadius: 14, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 8px 24px rgba(34,197,94,0.4)', animation: 'toastPop 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}>
          <Check size={18} color="white" />
          <p style={{ color: 'white', fontSize: 14, fontWeight: 700, margin: 0 }}>Profile updated successfully!</p>
        </div>
      )}

      <style>{`
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
        @keyframes toastPop{from{opacity:0;transform:translateY(20px) scale(0.95)}to{opacity:1;transform:translateY(0) scale(1)}}
      `}</style>
    </div>
  );
}
