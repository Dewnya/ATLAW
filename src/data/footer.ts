export type NavLink = { label: string; to: string; external?: boolean };

export const practiceAreaLinks: NavLink[] = [
  { label: "Personal Injury", to: "/personal-injury" },
  { label: "Auto Accidents", to: "/personal-injury/auto-accidents" },
  { label: "Medical Malpractice", to: "/personal-injury/medical-malpractice" },
  { label: "Wrongful Death", to: "/personal-injury/wrongful-death" },
  { label: "Premises Liability", to: "/personal-injury/premises-liability" },
  { label: "Dog Bite Injuries", to: "/personal-injury/dog-bites" },
  { label: "Workers' Compensation", to: "/personal-injury/workers-compensation" },
];

export const companyLinks: NavLink[] = [
  { label: "About", to: "/about" },
  { label: "Our Team", to: "/team" },
  { label: "Areas Served", to: "/areas-served" },
  { label: "News", to: "/news" },
  { label: "Contact", to: "/contact" },
];

export const socialLinks: { label: string; href: string }[] = [
  { label: "Instagram", href: "https://www.instagram.com/atlawgroup/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/at-law-group/" },
  { label: "Facebook", href: "https://www.facebook.com/atlawgroup/" },
  { label: "YouTube", href: "https://www.youtube.com/@atlawgroup" },
  { label: "TikTok", href: "https://www.tiktok.com/@atlawgroup" },
];

export const legalLinks: { label: string; to: string }[] = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of Use", to: "/terms" },
];

export const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=3+Park+Lane+Blvd+Suite+400W%2C+Dearborn%2C+MI+48126";
