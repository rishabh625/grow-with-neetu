export function JsonLd({ data }: { data: object | object[] }) {
  const schemas = (Array.isArray(data) ? data : [data]).filter(Boolean);

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c")
          }}
        />
      ))}
    </>
  );
}
