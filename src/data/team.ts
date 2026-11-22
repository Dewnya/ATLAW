export type TeamMember = {
  name: string;
  title: string;
  photo: string;
  role: "founder" | "attorney" | "staff";
};

export const founder: TeamMember = {
  name: "Dewnya Bazzi",
  title: "Founder & CEO",
  photo: "/assets/team/dewnya-bazzi.avif",
  role: "founder",
};

/** The Our Team page no longer shows an attorney section (firm, Nov 17, 2026). */
export const attorneys: TeamMember[] = [];

/** Client advocates and staff, in the order the firm gave (Nov 19, 2026); portraits from the firm. */
export const staff: TeamMember[] = [
  { name: "Mahmoud Mansour", title: "International Legal Consultant", photo: "/assets/team/mahmoud-mansour.avif", role: "staff" },
  { name: "Lamis Baydoun", title: "Business Relations Manager", photo: "/assets/team/lamis-baydoun.avif", role: "staff" },
  { name: "Hagee Chamas", title: "Paralegal", photo: "/assets/team/hagee-chamas.avif", role: "staff" },
  { name: "Abeer Almalahi", title: "Paralegal", photo: "/assets/team/abeer-almalahi.avif", role: "staff" },
  { name: "Janet Sprung", title: "Senior Client Advocate", photo: "/assets/team/janet-sprung.avif", role: "staff" },
  { name: "Tamara Daouk", title: "Client Advocate", photo: "/assets/team/tamara-daouk.avif", role: "staff" },
  { name: "Madison Misovich", title: "Client Advocate", photo: "/assets/team/madison-misovich.avif", role: "staff" },
  { name: "Amaan Butt", title: "Client Advocate", photo: "/assets/team/amaan-butt.avif", role: "staff" },
  { name: "Fatima Zreik", title: "Intake Specialist", photo: "/assets/team/fatima-zreik.avif", role: "staff" },
  { name: "Deema Ghamloush", title: "Office Manager", photo: "/assets/team/deema-ghamloush.avif", role: "staff" },
  { name: "Abbas Abdallah", title: "Administrative Assistant", photo: "/assets/team/abbas-abdallah.avif", role: "staff" },
  { name: "Lubna Hakim", title: "Receptionist", photo: "/assets/team/lubna-hakim.avif", role: "staff" },
];

export const members: TeamMember[] = [founder, ...attorneys, ...staff];
