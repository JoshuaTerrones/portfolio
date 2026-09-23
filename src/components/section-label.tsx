type SectionLabelProps = {
  children: React.ReactNode;
};

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div className="mb-4 font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
      <span className="text-primary">— </span>
      {children}
    </div>
  );
}

