export default function MobileContainer({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div
        className="relative w-full bg-white overflow-hidden"
        style={{
          maxWidth: '390px',
          minHeight: '100svh',
          boxShadow: '0 0 40px rgba(0,0,0,0.15)',
        }}
      >
        {children}
      </div>
    </div>
  );
}
