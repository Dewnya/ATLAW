import type { CitySlug } from "./cities-registry";

export interface CityData {
  slug: CitySlug;
  name: string;
  county: string;
  localContext: string[];
  localExpertise: string[];
  nearbyLandmarks: string[];
  localCourts: string[];
  hospitals: string[];
  faqs: { question: string; answer: string }[];
}

export const cities: CityData[] = [
  {
    slug: "dearborn",
    name: "Dearborn",
    county: "Wayne County",
    localContext: [
      "ATLAW is headquartered in Dearborn at 3 Park Lane Boulevard, Suite 400W — steps from the 19th District Court. When you walk into our office, you're meeting the team that will handle your case. There's no call center, no intake farm, no hand-off to a junior associate in another city. Your attorney lives and works where you do.",
      "Dearborn is home to one of the largest Arab-American communities in the country, and our team reflects that. Attorney Dewnya Bazzi and our bilingual staff serve clients in both English and Arabic, ensuring nothing gets lost in translation when your recovery is on the line.",
      "From Michigan Avenue intersections to Ford Road traffic patterns, we know the roads, the hospitals, and the insurance adjusters who handle claims in this area. That local knowledge translates directly into stronger cases and better outcomes for our clients.",
    ],
    localExpertise: [
      "Bilingual Arabic-English legal team serving Dearborn's diverse community",
      "Office located steps from the 19th District Court in Dearborn",
      "Deep familiarity with local roads, intersections, and accident-prone areas",
      "Relationships with Beaumont Dearborn, Corewell Health, and local physicians",
      "Knowledge of Wayne County court procedures and local judges",
      "Active involvement in the Dearborn community and local organizations",
    ],
    nearbyLandmarks: ["Ford Motor Company World Headquarters", "The Henry Ford Museum", "Arab American National Museum", "University of Michigan-Dearborn"],
    localCourts: ["19th District Court", "Wayne County Circuit Court", "Wayne County Probate Court"],
    hospitals: ["Corewell Health Dearborn (formerly Beaumont)", "Dearborn VA Medical Center"],
    faqs: [
      { question: "Where is ATLAW's office in Dearborn?", answer: "Our office is located at 3 Park Lane Boulevard, Suite 400W, Dearborn, MI 48126. We're directly off Michigan Avenue, steps from the 19th District Court. Free parking is available on-site." },
      { question: "Does ATLAW have Arabic-speaking attorneys?", answer: "Yes. Attorney Dewnya Bazzi and several members of our staff are fluent in Arabic. We serve Dearborn's Arab-American community in their preferred language, ensuring nothing is lost when discussing your case." },
      { question: "What should I do after a car accident in Dearborn?", answer: "Call 911, get medical attention (Corewell Health Dearborn is the nearest major hospital), exchange information with the other driver, photograph the scene, and contact ATLAW before speaking with any insurance company. We offer free case evaluations." },
      { question: "How long do I have to file a personal injury claim in Michigan?", answer: "The general statute of limitations for personal injury in Michigan is three years from the date of injury. For auto accident PIP (No-Fault) benefits, you must file within one year. Missing these deadlines can permanently bar your claim." },
      { question: "Does ATLAW handle cases from the 19th District Court?", answer: "Yes. Our office is steps from the 19th District Court in Dearborn. We regularly handle matters in this court as well as Wayne County Circuit Court and courts throughout Southeast Michigan." },
      { question: "How much does it cost to hire a personal injury lawyer in Dearborn?", answer: "Nothing up front. We work on a contingency fee basis — you pay zero unless we recover money for you. The consultation is free, and there is no financial risk to hiring us." },
    ],
  },
  {
    slug: "detroit",
    name: "Detroit",
    county: "Wayne County",
    localContext: [
      "Detroit is Michigan's largest city and the epicenter of auto accidents, workplace injuries, and premises liability claims in the state. ATLAW serves injured Detroit residents from our Dearborn office, less than 15 minutes from downtown. When a Detroit client needs us, we're there — not across the state.",
      "The city's road network — from I-75 and I-94 to the Lodge Freeway and major surface streets like Gratiot, Michigan Avenue, and Grand River — sees some of the highest traffic volumes and accident rates in the region. We know these roads, these intersections, and the patterns that cause crashes.",
      "Detroit's residents deserve aggressive legal representation that doesn't treat them like a case number. Attorney Dewnya Bazzi personally oversees every case, and our team fights insurers who routinely undervalue Detroit claims. We don't accept lowball offers.",
    ],
    localExpertise: [
      "Serving Detroit's injured residents from our nearby Dearborn office",
      "Extensive experience with high-traffic corridors: I-75, I-94, Lodge Freeway, Gratiot Avenue",
      "Knowledge of 36th District Court procedures and Wayne County courts",
      "Relationships with Detroit Medical Center, Henry Ford Hospital, and Sinai-Grace",
      "Experience handling claims in Michigan's highest-volume accident corridors",
      "Bilingual legal services for Detroit's diverse communities",
    ],
    nearbyLandmarks: ["Downtown Detroit", "Midtown", "Eastern Market", "Corktown", "Mexicantown"],
    localCourts: ["36th District Court", "Wayne County Circuit Court", "U.S. District Court — Eastern District of Michigan"],
    hospitals: ["Detroit Medical Center (DMC)", "Henry Ford Hospital", "Sinai-Grace Hospital", "Ascension St. John Hospital"],
    faqs: [
      { question: "Does ATLAW have an office in Detroit?", answer: "Our office is in Dearborn, less than 15 minutes from downtown Detroit. We serve Detroit residents throughout Wayne County and regularly handle cases in 36th District Court and Wayne County Circuit Court." },
      { question: "What should I do after a car accident in Detroit?", answer: "Call 911 and get medical attention immediately — Henry Ford Hospital and Detroit Medical Center are both Level I trauma centers. Document the scene, exchange insurance information, file a police report, and call ATLAW before talking to any insurance adjuster." },
      { question: "Are car accidents more common in Detroit?", answer: "Detroit consistently ranks among the highest in Michigan for traffic accidents due to high traffic volume on freeways like I-75, I-94, and the Lodge, combined with surface street congestion. More accidents mean more insurance disputes — and more reason to have an experienced attorney." },
      { question: "How long do I have to file a personal injury claim in Michigan?", answer: "Three years from the date of injury for most personal injury claims. For auto accident PIP (No-Fault) benefits, you must file within one year. Contact us as soon as possible — evidence preservation and early investigation make a significant difference." },
      { question: "Does ATLAW handle cases in 36th District Court?", answer: "Yes. We regularly handle matters in the 36th District Court as well as Wayne County Circuit Court and other courts throughout Southeast Michigan." },
      { question: "How much does it cost to hire a personal injury lawyer in Detroit?", answer: "Nothing up front. We work on a contingency fee basis — you pay nothing unless we win your case. Your initial consultation is completely free." },
    ],
  },
  {
    slug: "dearborn-heights",
    name: "Dearborn Heights",
    county: "Wayne County",
    localContext: [
      "Dearborn Heights sits directly adjacent to our Dearborn headquarters, making us one of the closest personal injury firms to this community. Our clients in Dearborn Heights don't have to drive across the metro area for quality legal representation — we're right next door.",
      "With major corridors like Telegraph Road, Ford Road, and Ann Arbor Trail running through the city, Dearborn Heights residents face significant traffic hazards daily. Our firm has handled numerous accident claims originating on these roads and understands the patterns that lead to crashes here.",
      "Like neighboring Dearborn, Dearborn Heights has a significant Arab-American population. Our bilingual team ensures that language is never a barrier to getting the legal help you need after an injury.",
    ],
    localExpertise: [
      "Located immediately adjacent to Dearborn Heights — one of the closest PI firms to this community",
      "Bilingual Arabic-English team serving the local community",
      "Familiarity with Telegraph Road, Ford Road, and Ann Arbor Trail accident patterns",
      "Knowledge of 20th District Court procedures",
      "Relationships with local medical providers and treatment facilities",
      "Understanding of Dearborn Heights residential and commercial traffic patterns",
    ],
    nearbyLandmarks: ["Telegraph Road corridor", "Ford Road commercial district", "Dearborn Heights Civic Center"],
    localCourts: ["20th District Court", "Wayne County Circuit Court"],
    hospitals: ["Corewell Health Dearborn", "Garden City Hospital", "Beaumont Wayne"],
    faqs: [
      { question: "How close is ATLAW to Dearborn Heights?", answer: "Our Dearborn office is immediately adjacent to Dearborn Heights — typically less than 10 minutes from anywhere in the city. We're one of the closest personal injury law firms to the Dearborn Heights community." },
      { question: "Does ATLAW handle cases from Dearborn Heights?", answer: "Absolutely. We serve clients throughout Dearborn Heights and regularly handle cases involving accidents on Telegraph Road, Ford Road, and other local corridors. We're familiar with the 20th District Court and Wayne County courts." },
      { question: "What should I do after a car accident in Dearborn Heights?", answer: "Call 911, seek medical attention at the nearest hospital (Corewell Health Dearborn or Garden City Hospital), document the scene, and contact ATLAW for a free case evaluation before speaking with insurance companies." },
      { question: "Does ATLAW offer Arabic-language legal services?", answer: "Yes. Attorney Dewnya Bazzi and members of our staff are fluent in Arabic. We proudly serve the Arab-American communities in Dearborn Heights and surrounding areas." },
      { question: "How long do I have to file a personal injury claim in Michigan?", answer: "The general statute of limitations is three years from the date of injury. Auto accident PIP claims must be filed within one year. Don't wait — contact us for a free evaluation as soon as possible." },
      { question: "How much does it cost to hire ATLAW?", answer: "Nothing up front. We work on a contingency fee basis, which means you pay no fees unless we recover money for you. Your consultation is free." },
    ],
  },
  {
    slug: "ann-arbor",
    name: "Ann Arbor",
    county: "Washtenaw County",
    localContext: [
      "Ann Arbor's combination of university traffic, downtown congestion, and major highway interchanges makes it a hotspot for accidents. From the I-94/US-23 interchange to busy campus-area streets like State Street and Washtenaw Avenue, the risks are real and the injuries can be serious.",
      "ATLAW serves Ann Arbor's injured residents — including University of Michigan students, faculty, and the broader community — from our Dearborn office, a straight shot down I-94. When Ann Arbor clients need us, we come to them.",
      "Whether you've been hurt in a campus-area pedestrian accident, a freeway crash, or a slip-and-fall at a local business, our team has the experience to handle your claim against Michigan's largest insurers.",
    ],
    localExpertise: [
      "Serving Ann Arbor and Washtenaw County residents from our Dearborn office via I-94",
      "Experience with campus-area accidents involving pedestrians, cyclists, and vehicles",
      "Knowledge of I-94/US-23 interchange and local traffic patterns",
      "Familiarity with 15th District Court and Washtenaw County courts",
      "Relationships with Michigan Medicine (University of Michigan Hospital) and St. Joseph Mercy",
      "Understanding of university community needs — students, faculty, and staff",
    ],
    nearbyLandmarks: ["University of Michigan campus", "Downtown Ann Arbor", "Briarwood Mall", "I-94/US-23 interchange"],
    localCourts: ["15th District Court", "Washtenaw County Circuit Court"],
    hospitals: ["Michigan Medicine (University of Michigan Hospital)", "St. Joseph Mercy Ann Arbor", "VA Ann Arbor Healthcare System"],
    faqs: [
      { question: "Does ATLAW serve clients in Ann Arbor?", answer: "Yes. We serve Ann Arbor and Washtenaw County residents from our Dearborn office, which is a direct drive down I-94. We handle cases in the 15th District Court and Washtenaw County Circuit Court." },
      { question: "I'm a U of M student injured in an accident. Can ATLAW help?", answer: "Absolutely. We regularly help University of Michigan students, faculty, and staff with personal injury claims — from campus-area pedestrian accidents to car crashes on local roads. Your student status doesn't affect your right to recover." },
      { question: "What should I do after a car accident in Ann Arbor?", answer: "Call 911, get medical attention at Michigan Medicine or St. Joseph Mercy, document the scene, and contact ATLAW before talking to any insurance company. We offer free consultations for Ann Arbor residents." },
      { question: "How long do I have to file a personal injury claim in Michigan?", answer: "Three years from the date of injury for most claims. Auto accident PIP benefits must be filed within one year. Contact us promptly — early investigation strengthens your case." },
      { question: "Are pedestrian and bicycle accidents common in Ann Arbor?", answer: "Yes. Ann Arbor's mix of heavy pedestrian traffic around campus, busy cycling routes, and vehicle congestion creates significant collision risks. We handle pedestrian and bicycle injury claims throughout the area." },
      { question: "How much does it cost to hire a personal injury lawyer in Ann Arbor?", answer: "Nothing unless we win. We work on contingency — no upfront fees, no hourly billing. If we don't recover money for you, you owe us nothing." },
    ],
  },
  {
    slug: "wayne-county",
    name: "Wayne County",
    county: "Wayne County",
    localContext: [
      "Wayne County is Michigan's most populous county and home to ATLAW's Dearborn headquarters. From Detroit and Dearborn to Livonia, Westland, Canton, and Downriver communities, we represent injured residents across every corner of the county.",
      "Wayne County's extensive road network — including I-94, I-75, I-96, the Southfield Freeway, and Telegraph Road — carries millions of vehicles daily. High traffic volume means more accidents, more insurance disputes, and more residents who need experienced legal representation.",
      "Our team regularly appears in Wayne County Circuit Court, the 3rd Circuit Court, and district courts throughout the county. We know the local court procedures, the judges, and the defense attorneys the insurance companies hire. That familiarity gives our clients an edge.",
    ],
    localExpertise: [
      "Headquartered in Wayne County (Dearborn) — this is our home turf",
      "Regular appearances in Wayne County Circuit Court (3rd Circuit) and district courts throughout the county",
      "Experience across the county: Detroit, Dearborn, Livonia, Westland, Canton, Downriver, and more",
      "Knowledge of major accident corridors: I-94, I-75, I-96, Southfield Freeway, Telegraph Road",
      "Relationships with hospitals throughout Wayne County",
      "Deep understanding of Wayne County court procedures and local legal community",
    ],
    nearbyLandmarks: ["Wayne County Courthouse (Detroit)", "Metro Detroit area", "Detroit Metropolitan Airport"],
    localCourts: ["Wayne County Circuit Court (3rd Circuit)", "36th District Court", "19th District Court", "20th District Court", "21st District Court"],
    hospitals: ["Corewell Health Dearborn", "Henry Ford Hospital", "Detroit Medical Center", "Beaumont Wayne", "Garden City Hospital"],
    faqs: [
      { question: "Does ATLAW handle cases throughout Wayne County?", answer: "Yes. We're headquartered in Dearborn (Wayne County) and represent clients from across the county — Detroit, Livonia, Westland, Canton, Downriver communities, and everywhere in between." },
      { question: "What courts does ATLAW practice in within Wayne County?", answer: "We regularly appear in Wayne County Circuit Court (3rd Circuit), the 36th District Court (Detroit), the 19th District Court (Dearborn), the 20th District Court (Dearborn Heights), and other district courts throughout the county." },
      { question: "What should I do after an accident in Wayne County?", answer: "Call 911, seek immediate medical attention, document the scene, file a police report, and contact ATLAW for a free case evaluation before speaking with insurance adjusters." },
      { question: "How long do I have to file a personal injury claim in Wayne County?", answer: "The statute of limitations is three years for most personal injury claims in Michigan. Auto accident PIP claims must be filed within one year. These deadlines apply regardless of which county the accident occurred in." },
      { question: "Is ATLAW familiar with Wayne County judges and courts?", answer: "Absolutely. Wayne County is our home turf. We have extensive experience in Wayne County courts and are familiar with local procedures, judges, and the defense attorneys that insurance companies retain in this jurisdiction." },
      { question: "How much does it cost to hire ATLAW for a Wayne County case?", answer: "Nothing up front. We work on a contingency fee basis — you owe us nothing unless we win your case." },
    ],
  },
  {
    slug: "oakland-county",
    name: "Oakland County",
    county: "Oakland County",
    localContext: [
      "Oakland County is Michigan's second most populous county and one of the wealthiest in the nation. With cities like Southfield, Troy, Royal Oak, Pontiac, Farmington Hills, and Bloomfield Hills, the county sees heavy commuter traffic and a significant volume of personal injury claims.",
      "Major corridors including I-75, M-59 (Hall Road), Telegraph Road, Woodward Avenue, and I-696 run through Oakland County. These high-traffic roads are among the most accident-prone in Southeast Michigan. Our firm has handled numerous claims arising from crashes on these corridors.",
      "ATLAW serves Oakland County residents from our Dearborn office, accessible via I-96, the Southfield Freeway, or Telegraph Road. We regularly appear in Oakland County courts and are familiar with local procedures that differ from Wayne County.",
    ],
    localExpertise: [
      "Serving Oakland County residents from our Dearborn office via I-96, Southfield Freeway, and Telegraph Road",
      "Experience with high-volume corridors: I-75, I-696, M-59, Woodward Avenue, Telegraph Road",
      "Knowledge of Oakland County Circuit Court and district courts (46th, 47th, 48th, 50th, 52nd)",
      "Familiarity with Oakland County court procedures and local legal community",
      "Relationships with Beaumont Royal Oak, Corewell Health Troy, and Providence hospitals",
      "Understanding of commuter traffic patterns across Southfield, Troy, Royal Oak, and Pontiac",
    ],
    nearbyLandmarks: ["Southfield", "Troy", "Royal Oak", "Pontiac", "Farmington Hills", "Bloomfield Hills"],
    localCourts: ["Oakland County Circuit Court (6th Circuit)", "46th District Court (Southfield)", "47th District Court (Farmington Hills)", "48th District Court (Bloomfield Hills)", "52nd District Court (Troy)"],
    hospitals: ["Corewell Health Royal Oak (formerly Beaumont)", "Corewell Health Troy", "Ascension Providence Rochester", "Pontiac General Hospital"],
    faqs: [
      { question: "Does ATLAW handle personal injury cases in Oakland County?", answer: "Yes. We serve Oakland County residents from our Dearborn office and regularly handle cases in Oakland County Circuit Court and district courts throughout the county, including Southfield, Troy, and Farmington Hills." },
      { question: "How do I get to ATLAW's office from Oakland County?", answer: "Our Dearborn office is accessible from Oakland County via I-96 South, the Southfield Freeway, or Telegraph Road. The drive is typically 20-40 minutes depending on your location. We also offer phone and video consultations." },
      { question: "What should I do after an accident in Oakland County?", answer: "Call 911, seek medical attention at the nearest hospital (Corewell Health Royal Oak or Troy are both major facilities), document the scene, and contact ATLAW for a free evaluation before giving statements to insurance companies." },
      { question: "How long do I have to file a personal injury claim in Oakland County?", answer: "Michigan's statute of limitations is three years for most personal injury claims and one year for auto accident PIP benefits, regardless of the county. Contact us as soon as possible to preserve evidence." },
      { question: "Does ATLAW practice in Oakland County Circuit Court?", answer: "Yes. We regularly handle matters in Oakland County Circuit Court (6th Circuit) as well as the 46th, 47th, 48th, and 52nd District Courts. We're familiar with local procedures and the Oakland County legal community." },
      { question: "How much does it cost to hire ATLAW for an Oakland County case?", answer: "Nothing up front. We work on a contingency fee — you pay zero unless we recover money for you. The consultation is always free." },
    ],
  },
  {
    slug: "macomb-county",
    name: "Macomb County",
    county: "Macomb County",
    localContext: [
      "Macomb County is Michigan's third most populous county, home to Warren, Sterling Heights, Clinton Township, Shelby Township, and St. Clair Shores. Its mix of residential communities, commercial districts, and industrial zones creates diverse accident patterns and personal injury claims.",
      "Major corridors like I-94, I-696, M-59 (Hall Road), Van Dyke Avenue, and Gratiot Avenue carry heavy traffic volumes through Macomb County daily. The M-59 corridor in particular is known for congestion and collision frequency. Our firm has handled claims from accidents throughout this area.",
      "ATLAW serves Macomb County residents from our Dearborn office, accessible via I-94 East or I-696. We regularly appear in Macomb County courts and understand the procedural differences from Wayne and Oakland counties.",
    ],
    localExpertise: [
      "Serving Macomb County residents from our Dearborn office via I-94 and I-696",
      "Experience with high-traffic corridors: I-94, I-696, M-59 (Hall Road), Gratiot Avenue, Van Dyke Avenue",
      "Knowledge of Macomb County Circuit Court and district courts (37th, 38th, 39th, 40th, 41A, 41B, 42nd)",
      "Familiarity with Macomb County court procedures and local legal community",
      "Relationships with Henry Ford Macomb, Ascension Macomb-Oakland, and McLaren Macomb hospitals",
      "Understanding of traffic patterns across Warren, Sterling Heights, Clinton Township, and Shelby Township",
    ],
    nearbyLandmarks: ["Warren", "Sterling Heights", "Clinton Township", "Shelby Township", "St. Clair Shores"],
    localCourts: ["Macomb County Circuit Court (16th Circuit)", "37th District Court (Warren)", "38th District Court (Eastpointe)", "41A District Court (Sterling Heights)", "42nd District Court (New Baltimore)"],
    hospitals: ["Henry Ford Macomb Hospital", "Ascension Macomb-Oakland Hospital", "McLaren Macomb Hospital"],
    faqs: [
      { question: "Does ATLAW handle personal injury cases in Macomb County?", answer: "Yes. We serve Macomb County residents and regularly handle cases in Macomb County Circuit Court and district courts throughout the county, including Warren, Sterling Heights, and Clinton Township." },
      { question: "How do I get to ATLAW's office from Macomb County?", answer: "Our Dearborn office is accessible from Macomb County via I-94 West or I-696 West. The drive is typically 30-45 minutes depending on your location. We also offer phone and video consultations for convenience." },
      { question: "What should I do after an accident in Macomb County?", answer: "Call 911, get medical attention at the nearest hospital (Henry Ford Macomb, Ascension Macomb-Oakland, or McLaren Macomb), document everything, and contact ATLAW for a free case evaluation before speaking with insurance companies." },
      { question: "How long do I have to file a personal injury claim in Macomb County?", answer: "Michigan's statute of limitations is three years for most personal injury claims and one year for auto accident PIP benefits. These deadlines apply statewide regardless of county. Contact us promptly to protect your rights." },
      { question: "Does ATLAW practice in Macomb County Circuit Court?", answer: "Yes. We regularly handle matters in Macomb County Circuit Court (16th Circuit) and district courts throughout the county. We're familiar with Macomb County procedures and the local legal community." },
      { question: "How much does it cost to hire ATLAW for a Macomb County case?", answer: "Nothing upfront. We work on a contingency fee basis — you pay nothing unless we win your case. Your initial consultation is free with no obligation." },
    ],
  },
];

export const cityBySlug = (slug: string): CityData | undefined =>
  cities.find((c) => c.slug === slug);

export const citySlug = (name: string): string =>
  name.toLowerCase().replace(/\s+/g, "-");
