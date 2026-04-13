export default function Chip({ label, selected, onClick, icon }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border-2 font-medium text-sm transition-all duration-200 active:scale-95 select-none ${
        selected
          ? 'bg-[#2563EB] border-[#2563EB] text-white shadow-md'
          : 'bg-[#F9FAFB] border-[#E5E7EB] text-[#374151] hover:border-[#2563EB] hover:text-[#2563EB]'
      }`}
    >
      {icon && <span>{icon}</span>}
      {label}
    </button>
  );
}
