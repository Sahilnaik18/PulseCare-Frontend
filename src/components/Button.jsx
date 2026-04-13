export default function Button({
  children,
  onClick,
  variant = 'primary',
  loading = false,
  disabled = false,
  className = '',
  type = 'button',
}) {
  const base =
    'btn-press w-full flex items-center justify-center gap-2 rounded-2xl font-semibold text-base select-none min-h-[52px] px-6 py-3 transition-all duration-200';

  const variants = {
    primary:
      'bg-[#2563EB] text-white shadow-md hover:bg-[#1d4ed8] disabled:opacity-50',
    secondary:
      'bg-[#F9FAFB] text-[#111827] border border-[#E5E7EB] shadow-sm hover:bg-gray-100 disabled:opacity-50',
    outline:
      'bg-white text-[#2563EB] border-2 border-[#2563EB] hover:bg-blue-50 disabled:opacity-50',
    ghost:
      'bg-transparent text-[#6B7280] hover:text-[#111827] disabled:opacity-50',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {loading ? (
        <span
          className="w-5 h-5 border-[2.5px] border-white/30 border-t-white rounded-full"
          style={{ animation: 'spin 0.65s linear infinite' }}
        />
      ) : (
        children
      )}
    </button>
  );
}
