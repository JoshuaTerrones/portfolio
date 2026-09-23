type TerminalLineProps = {
  cmd: string;
  error?: boolean;
};

export function TerminalLine({ cmd, error = false }: TerminalLineProps) {
  return (
    <div className="mb-6 flex items-center gap-2.5 font-[family-name:var(--font-geist-mono)] text-[15px] text-muted-foreground">
      <span className="font-medium text-primary">$</span>
      <span className={error ? "text-[#E85D5D]" : "text-foreground"}>{cmd}</span>
      <span className="inline-block h-4 w-[9px] animate-[blink_1.2s_step-end_infinite] bg-primary" />
    </div>
  );
}
