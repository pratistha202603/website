export default function LoadingCircle() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative h-10 w-10">
        
        {/* Outer Glow */}
        <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl animate-pulse" />

        {/* Spinning Ring */}
        <div
          className="relative h-10 w-10 rounded-full
                     border-[3px]
                     border-white/10
                     border-t-cyan-400
                     border-r-blue-500
                     border-b-emerald-400
                     animate-spin
                     shadow-[0_0_20px_rgba(34,211,238,0.6)]"
        />

        {/* Center Dot */}
        <div className="absolute inset-3 rounded-full bg-black/80 backdrop-blur-md" />
      </div>
    </div>
  );
}