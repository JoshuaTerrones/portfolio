type JsonLdObject = Record<string, unknown>;

export function JsonLd({ data }: { data: JsonLdObject | JsonLdObject[] }) {
  const items = Array.isArray(data) ? data : [data];
  if (items.length === 0) return null;

  const payload =
    items.length === 1
      ? items[0]
      : {
          "@context": "https://schema.org",
          "@graph": items.map((item) => {
            const copy = { ...item };
            delete copy["@context"];
            return copy;
          }),
        };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
