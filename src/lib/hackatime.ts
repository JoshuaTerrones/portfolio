const HACKATIME_USERNAME = process.env.HACKATIME_USERNAME;
const HACKATIME_API_KEY = process.env.HACKATIME_API_KEY;
const HACKATIME_BASE = "https://hackatime.hackclub.com/api/v1";

export type HackatimeLanguage = {
  name: string;
  total_seconds: number;
  percent: number;
};

export type HackatimeStats = {
  totalSeconds: number;
  totalHours: number;
  languages: HackatimeLanguage[];
};

type HackatimeResponse = {
  data?: {
    total_seconds?: number;
    languages?: Array<{
      name: string;
      total_seconds: number;
      percent?: number;
    }>;
  };
  total_seconds?: number;
  languages?: Array<{
    name: string;
    total_seconds: number;
    percent?: number;
  }>;
};

export async function getHackatimeStats(): Promise<HackatimeStats | null> {
  if (!HACKATIME_USERNAME || !HACKATIME_API_KEY) {
    console.warn("Hackatime no configurado (HACKATIME_USERNAME / HACKATIME_API_KEY).");
    return null;
  }

  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);

  const params = new URLSearchParams({
    start_date: startOfYear.toISOString(),
    end_date: now.toISOString(),
  });

  try {
    const res = await fetch(
      `${HACKATIME_BASE}/users/${HACKATIME_USERNAME}/stats?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${HACKATIME_API_KEY}`,
          Accept: "application/json",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      console.error(`Hackatime: ${res.status} ${res.statusText}`);
      return null;
    }

    const json: HackatimeResponse = await res.json();
    const payload = json.data ?? json;

    const totalSeconds = payload.total_seconds ?? 0;
    const langs = (payload.languages ?? [])
      .slice(0, 5)
      .map((l) => ({
        name: l.name,
        total_seconds: l.total_seconds,
        percent: l.percent ?? (totalSeconds > 0 ? (l.total_seconds / totalSeconds) * 100 : 0),
      }));

    return {
      totalSeconds,
      totalHours: Math.round(totalSeconds / 3600),
      languages: langs,
    };
  } catch (err) {
    console.error("Hackatime fetch error:", err);
    return null;
  }
}
