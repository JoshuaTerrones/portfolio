import type { GitHubContributions } from "@/lib/github";

type ContribGridProps = {
  contributions: GitHubContributions | null;
};

const LEVEL_CLASS: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "bg-border",
  1: "bg-primary/30",
  2: "bg-primary/55",
  3: "bg-primary/80",
  4: "bg-primary",
};

export function ContribGrid({ contributions }: ContribGridProps) {
  if (!contributions) {
    return (
      <div className="mt-4 flex h-[120px] items-center justify-center font-[family-name:var(--font-geist-mono)] text-[11px] text-muted-foreground">
        No disponible
      </div>
    );
  }

  return (
    <div
      className="mt-4 grid gap-[3px]"
      style={{ gridTemplateColumns: `repeat(${contributions.weeks.length}, minmax(0, 1fr))` }}
    >
      {contributions.weeks.flatMap((week) =>
        week.days.map((day) => (
          <div
            key={day.date}
            title={`${day.count} contribuciones el ${day.date}`}
            className={`aspect-square rounded-[2px] ${LEVEL_CLASS[day.level]}`}
          />
        ))
      )}
    </div>
  );
}
