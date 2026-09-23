export function BackgroundShapes() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed -right-[200px] -top-[200px] z-0 h-[700px] w-[700px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, var(--accent-soft), transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed -bottom-[250px] -left-[200px] z-0 h-[600px] w-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, var(--accent-soft), transparent 65%)",
        }}
      />
    </>
  );
}
