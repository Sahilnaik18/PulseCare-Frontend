import { useRef, useState } from 'react';

export default function OTPInput({ value, onChange, length = 6 }) {
  const inputs = useRef([]);
  const [popping, setPopping] = useState(-1);

  const triggerPop = (idx) => {
    setPopping(idx);
    setTimeout(() => setPopping(-1), 200);
  };

  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/\D/g, '');
    if (!val) return;
    const char = val[val.length - 1];
    const next = value.split('');
    next[idx] = char;
    onChange(next.join(''));
    triggerPop(idx);
    if (idx < length - 1) setTimeout(() => inputs.current[idx + 1]?.focus(), 10);
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace') {
      const next = value.split('');
      if (next[idx]) {
        next[idx] = '';
        onChange(next.join(''));
      } else if (idx > 0) {
        inputs.current[idx - 1]?.focus();
        const prev = value.split('');
        prev[idx - 1] = '';
        onChange(prev.join(''));
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    onChange(pasted.padEnd(length, '').slice(0, length));
    const focusIdx = Math.min(pasted.length, length - 1);
    inputs.current[focusIdx]?.focus();
  };

  return (
    <div className="flex gap-2.5 justify-center">
      {Array.from({ length }).map((_, idx) => (
        <input
          key={idx}
          ref={(el) => (inputs.current[idx] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[idx] || ''}
          onChange={(e) => handleChange(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          onPaste={handlePaste}
          className={`w-11 h-14 text-center text-xl font-bold rounded-2xl border-2 bg-[#F9FAFB] text-[#111827] outline-none transition-all duration-150
            ${value[idx] ? 'border-[#2563EB] bg-blue-50 shadow-md' : 'border-[#E5E7EB]'}
            focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100
            ${popping === idx ? 'otp-pop' : ''}
          `}
        />
      ))}
    </div>
  );
}
