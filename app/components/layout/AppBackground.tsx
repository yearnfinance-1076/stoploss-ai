export default function AppBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden bg-[#06080f]">
      <div className="absolute -top-40 left-1/2 h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-[#1a3a6e]/40 blur-[120px]" />
      <div className="absolute top-1/3 -right-32 h-[400px] w-[400px] rounded-full bg-[#2563eb]/20 blur-[100px]" />
      <div className="absolute bottom-0 left-0 h-[300px] w-[500px] rounded-full bg-[#0f766e]/15 blur-[90px]" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
}
