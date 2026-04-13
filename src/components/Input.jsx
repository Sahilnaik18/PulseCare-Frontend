export default function Input({
  label,
  icon,
  prefix,
  error,
  className = '',
  ...props
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-[#111827]">{label}</label>
      )}
      <div
        className={`input-glow flex items-center gap-2 rounded-2xl border px-4 py-3 bg-[#F9FAFB] transition-all duration-200 focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-blue-100 ${
          error ? 'border-red-400' : 'border-[#E5E7EB]'
        } ${className}`}
      >
        {icon && <span className="text-[#6B7280] flex-shrink-0">{icon}</span>}
        {prefix && (
          <span className="text-[#111827] font-medium flex-shrink-0 pr-1 border-r border-[#E5E7EB] mr-1">
            {prefix}
          </span>
        )}
        <input
          className="flex-1 bg-transparent outline-none text-[#111827] placeholder-[#9CA3AF] text-base min-h-[28px]"
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500 pl-1">{error}</p>}
    </div>
  );
}
