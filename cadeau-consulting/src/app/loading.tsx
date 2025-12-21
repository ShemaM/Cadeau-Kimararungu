export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        {/* Animated Brand Dot */}
        <div className="relative flex h-6 w-6">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-6 w-6 bg-brand-blue"></span>
        </div>
        <p className="text-lg font-bold text-brand-navy tracking-widest animate-pulse">
          LOADING SYSTEM...
        </p>
      </div>
    </div>
  );
}