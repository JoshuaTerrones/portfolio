import type { GitHubStats } from "@/lib/github";

type Props = {
  stats: GitHubStats | null;
};

export function GitHubStatsRadar({ stats }: Props) {
  const values = [
    { label: "Code reviews", value: stats?.percentages.codeReviews ?? 0 },
    { label: "Issues", value: stats?.percentages.issues ?? 0 },
    { label: "Pull requests", value: stats?.percentages.pullRequests ?? 0 },
    { label: "Commits", value: stats?.percentages.commits ?? 0 },
  ];

  const center = { x: 220, y: 165 };
  const radius = 105;

  const positions = values.map((item, index) => {
    const angle = -Math.PI / 2 + index * (Math.PI / 2);
    const distance = (item.value / 100) * radius;

    return {
      x: center.x + Math.cos(angle) * distance,
      y: center.y + Math.sin(angle) * distance,
    };
  });

  const polygon = positions.map((p) => `${p.x},${p.y}`).join(" ");

  const axes = [
    { x: center.x, y: center.y - radius, x2: center.x, y2: center.y + radius },
    { x: center.x - radius, y: center.y, x2: center.x + radius, y2: center.y },
  ];

  return (
    <div className="w-full">
      <svg
        viewBox="0 0 440 330"
        role="img"
        aria-label="Distribución de contribuciones de GitHub"
        className="h-auto w-full overflow-visible"
      >
        {axes.map((axis, i) => (
          <line
            key={i}
            x1={axis.x}
            y1={axis.y}
            x2={axis.x2}
            y2={axis.y2}
            stroke="var(--primary)"
            strokeWidth="1.5"
            opacity="0.65"
          />
        ))}

        <polygon
          points={polygon}
          fill="var(--primary)"
          fillOpacity="0.28"
          stroke="var(--primary)"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {positions.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="var(--card)"
            stroke="var(--primary)"
            strokeWidth="2.5"
          />
        ))}

        <g fill="var(--muted-foreground)" fontSize="12" textAnchor="middle">
          <text x="220" y="35">
            Code review
          </text>
          <text x="220" y="292">
            Pull requests
          </text>
          <text x="75" y="155">
            Commits
          </text>
          <text x="365" y="155">
            Issues
          </text>
        </g>

        <g fill="var(--foreground)" fontSize="13" fontWeight="500" textAnchor="middle">
          <text x="220" y="55">
            {values[0].value}%
          </text>
          <text x="220" y="274">
            {values[2].value}%
          </text>
          <text x="75" y="135">
            {values[3].value}%
          </text>
          <text x="365" y="135">
            {values[1].value}%
          </text>
        </g>
      </svg>
    </div>
  );
}
