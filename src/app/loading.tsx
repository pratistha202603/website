export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

      <div className="flex flex-col items-center gap-4">
        {/* spinner */}
        <div className="h-10 w-10 rounded-full border-2 border-white/20 border-t-cyan-400 animate-spin" />

        {/* text */}
        <p className="text-sm text-white/70 tracking-wider">
          Loading...
        </p>
      </div>

    </div>
  );
}
