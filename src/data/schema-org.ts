const FIRM = {
  name: "ATLAW — AT Law Group",
  url: "https://atlawgroup.com",
  telephone: "+1-313-406-7606",
  email: "info@atlawgroup.com",
  address: {
    "@type": "PostalAddress" as const,
    streetAddress: "3 Park Lane Blvd., Suite 400W",
    addressLocality: "Dearborn",
    addressRegion: "MI",
    postalCode: "48126",
    addressCountry: "US",
  },
  areaServed: [
    "Dearborn",
    "Detroit",
    "Dearborn Heights",
    "Ann Arbor",
    "Wayne County",
    "Oakland County",
    "Macomb County",
  ],
  founder: {
    "@type": "Person" as const,
    name: "Dewnya Bazzi",
  },
};

export function homepageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: FIRM.name,
    description:
      "Dearborn personal injury law firm representing injured clients across Southeast Michigan. Auto accidents, medical malpractice, wrongful death, and more.",
    url: FIRM.url,
    telephone: FIRM.telephone,
    email: FIRM.email,
    address: FIRM.address,
    founder: FIRM.founder,
    areaServed: FIRM.areaServed,
    priceRange: "Free Consultation",
  };
}

export function practiceAreaSchema(title: string, serviceType: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: `${title} — ATLAW`,
    serviceType,
    provider: { "@type": "Organization", name: "ATLAW" },
    areaServed: "Southeast Michigan",
    telephone: FIRM.telephone,
    url: FIRM.url,
  };
}

export function cityPracticeSchema(practiceTitle: string, serviceType: string, cityName: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: `${practiceTitle} in ${cityName} — ATLAW`,
    serviceType,
    provider: { "@type": "Organization", name: "ATLAW" },
    areaServed: cityName,
    telephone: FIRM.telephone,
    url: FIRM.url,
  };
}

export function attorneySchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Attorney",
    name: "Dewnya Bazzi",
    jobTitle: "Founder & CEO",
    worksFor: { "@type": "Organization", name: "ATLAW" },
    award: [
      "Super Lawyers Rising Star 2024",
      "Super Lawyers Rising Star 2025",
      "Super Lawyers Rising Star 2026",
    ],
    telephone: FIRM.telephone,
    email: FIRM.email,
  };
}

export function aboutPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: FIRM.name,
    url: FIRM.url,
    telephone: FIRM.telephone,
    email: FIRM.email,
    address: FIRM.address,
    founder: FIRM.founder,
    foundingDate: "2013",
    areaServed: FIRM.areaServed,
  };
}

export function newsArticleSchema(opts: {
  title: string;
  description: string;
  datePublished: string;
  slug: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: opts.title,
    description: opts.description,
    datePublished: opts.datePublished,
    dateModified: opts.datePublished,
    url: `${FIRM.url}/news/${opts.slug}`,
    ...(opts.image ? { image: `${FIRM.url}${opts.image}` } : {}),
    author: { "@type": "Organization", name: FIRM.name },
    publisher: {
      "@type": "Organization",
      name: FIRM.name,
      logo: { "@type": "ImageObject", url: `${FIRM.url}/assets/atlaw-portrait.png` },
    },
  };
}

export function contactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: FIRM.name,
    url: FIRM.url,
    telephone: FIRM.telephone,
    email: FIRM.email,
    address: FIRM.address,
    openingHours: "Mo-Fr 09:00-17:00",
    areaServed: FIRM.areaServed,
    priceRange: "Free Consultation",
  };
}
