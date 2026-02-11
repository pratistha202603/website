export default function LoadingCircle() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative h-6 w-6">
        <div className="absolute inset-0 rounded-full bg-cyan-400/30 blur-md" />

        <div
          className="relative h-6 w-6 rounded-full
                     border-2 border-white/10
                     border-t-cyan-400
                     border-r-emerald-400
                     animate-spin"
        />
      </div>
    </div>
  );
}
