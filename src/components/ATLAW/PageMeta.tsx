import { Helmet } from "react-helmet-async";

const SITE_NAME = "ATLAW — Dearborn Personal Injury Lawyers";
const DEFAULT_OG_IMAGE = "/assets/atlaw-portrait.png"; // stopgap until atlaw-og-share.png (1200×630) added
const BASE_URL = "https://atlawgroup.com";

interface PageMetaProps {
  title: string;
  description: string;
  canonical?: string;
  schema?: object | object[];
  ogImage?: string;
  ogType?: string;
  /** Keep the page out of search indexes (404, unapproved content). */
  noindex?: boolean;
}

export function PageMeta({
  title,
  description,
  canonical,
  schema,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  noindex = false,
}: PageMetaProps) {
  const fullCanonical = canonical
    ? canonical.startsWith("http") ? canonical : `${BASE_URL}${canonical}`
    : undefined;

  const fullOgImage = ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`;

  const schemas = schema
    ? Array.isArray(schema) ? schema : [schema]
    : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex" />}

      {fullCanonical && <link rel="canonical" href={fullCanonical} />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:site_name" content={SITE_NAME} />
      {fullCanonical && <meta property="og:url" content={fullCanonical} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />

      {/* Structured Data */}
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}
