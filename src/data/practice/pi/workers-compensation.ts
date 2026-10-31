import type { PracticeAreaPI } from "./types";

export const workersCompensationData: PracticeAreaPI = {
  slug: "workers-compensation",
  title: "Workers' Compensation",
  heroTitle: "Michigan Workers' Compensation Lawyer",
  heroImage: "/assets/practice/workers-compensation.jpg",
  heroImageAlt: "Injured worker in Michigan workers' compensation case",
  tagline: "You got hurt on the job. We make the insurer cover what it's supposed to.",
  seoTitle: "Workers' Compensation Attorney | Dearborn & Detroit | ATLAW",
  seoDescription: "Hurt at work in Michigan? ATLAW handles denied claims, lost wages, and disability benefits. Free consultation. No fee unless we win your case.",
  overview: [
    "You got hurt doing your job. The law says your employer's insurance should cover your medical treatment and part of your lost pay while you recover. That's how it's supposed to work.",
    "In practice, claims get delayed, doctors get picked by the insurer, benefits get cut off early, and people get pushed back to work before they're ready. You don't have to take that.",
  ],
  whyChooseUs: [
    "Workers' compensation cases in Michigan involve a separate administrative system with its own rules, its own courts, and its own deadlines. The insurer's adjusters and lawyers know these rules inside out. You should have someone on your side who does too.",
    "Attorney Dewnya Bazzi handles workers' comp claims from the initial filing through contested hearings before the Michigan Workers' Disability Compensation Agency. She deals with the insurer and the claims process so you can focus on healing.",
    "We work on contingency. You pay nothing unless we recover benefits or a settlement for you.",
  ],
  caseResults: [], // firm-approved results only (none supplied yet)
  steps: [
    { number: 1, title: "Contact ATLAW", description: "Call us for a free consultation. We'll review your situation and explain your rights under Michigan workers' comp law." },
    { number: 2, title: "Report the Injury", description: "Notify your employer in writing within 90 days. We help you document the report properly to protect your claim." },
    { number: 3, title: "Get Proper Treatment", description: "After 28 days, you have the right to choose your own doctor. We help you access the medical care you actually need." },
    { number: 4, title: "Let Us Handle the Rest", description: "We deal with the insurer, challenge denials, and fight for the full benefits and compensation you deserve." },
  ],
  michiganLaw: [
    {
      heading: "Michigan Workers' Compensation Basics",
      paragraphs: [
        "Michigan's Workers' Disability Compensation Act requires most employers to carry workers' compensation insurance. If you are injured in the course of your employment, you are entitled to benefits regardless of who was at fault for the injury.",
        "Benefits include payment of all reasonable and necessary medical treatment, wage loss benefits (80% of your after-tax average weekly wage), vocational rehabilitation if you cannot return to your previous job, and specific loss benefits for permanent impairments like loss of a limb, hearing, or vision.",
        "Workers' comp is a no-fault system — you don't have to prove your employer was negligent. But the trade-off is that you generally cannot sue your employer in court for a workplace injury. Third-party claims against non-employer parties (equipment manufacturers, property owners, subcontractors) are a separate matter.",
      ],
    },
    {
      heading: "Common Reasons Claims Are Denied",
      paragraphs: [
        "Insurance companies deny workers' comp claims for many reasons: they dispute that the injury happened at work, they argue the injury was pre-existing, they claim you didn't report it on time, or they say your medical treatment isn't necessary.",
        "A denial is not the end of your case. You have the right to appeal and request a hearing before a magistrate at the Michigan Workers' Disability Compensation Agency. We handle the appeal process and present the medical evidence needed to overturn the denial.",
      ],
    },
    {
      heading: "Employer Retaliation Protections",
      paragraphs: [
        "Michigan law prohibits employers from retaliating against employees who file workers' compensation claims. This includes firing, demoting, reducing hours, or any other adverse action taken because you exercised your right to file a claim.",
        "If your employer retaliates against you for filing a workers' comp claim, you may have a separate retaliation claim in addition to your workers' compensation case. We help you identify and pursue both claims when applicable.",
      ],
    },
  ],
  testimonials: [], // pages use the shared Google reviews (data/testimonials.ts)
  faqs: [
    { question: "Can I sue my employer for a workplace injury?", answer: "Generally no. Michigan's workers' compensation system is the exclusive remedy for workplace injuries, meaning you receive benefits in exchange for giving up the right to sue your employer. However, if a third party (a subcontractor, equipment manufacturer, or property owner) contributed to your injury, you may have a separate lawsuit against them." },
    { question: "What benefits am I entitled to under workers' comp?", answer: "You may be entitled to payment of all reasonable medical treatment, wage loss benefits (80% of your after-tax average weekly wage), vocational rehabilitation, specific loss benefits for permanent impairments, and in fatal cases, survivor benefits for your dependents." },
    { question: "What if my workers' comp claim is denied?", answer: "A denial is not final. You can file a petition with the Michigan Workers' Disability Compensation Agency to request a hearing before a magistrate. We handle the appeal process and present the medical evidence needed to overturn the denial." },
    { question: "How long do I have to report a workplace injury?", answer: "You must report the injury to your employer within 90 days. Failure to report within this window can jeopardize your claim. We recommend reporting immediately and in writing to create a clear record." },
    { question: "Can I choose my own doctor?", answer: "For the first 28 days, your employer can direct your medical care. After 28 days, you have the right to choose your own treating physician. Choosing a doctor who understands workers' comp cases can make a significant difference in your treatment and your claim." },
    { question: "What if I can't return to my previous job?", answer: "If your injury prevents you from returning to your previous position, you may be entitled to vocational rehabilitation to help you retrain for a new job. You may also receive wage loss benefits reflecting the difference between your pre-injury wages and your current earning capacity." },
    { question: "Can my employer fire me for filing a workers' comp claim?", answer: "No. Michigan law prohibits employer retaliation for filing a workers' compensation claim. If your employer fires, demotes, or otherwise punishes you for exercising your legal rights, you may have a separate retaliation claim." },
    { question: "What are third-party claims?", answer: "If someone other than your employer contributed to your workplace injury — such as a subcontractor, equipment manufacturer, or property owner — you may have a separate personal injury lawsuit against that third party. These claims can provide compensation beyond what workers' comp covers, including pain and suffering." },
    { question: "How long does a workers' compensation case take?", answer: "It depends on whether the claim is accepted or contested. Accepted claims begin paying benefits relatively quickly. Contested claims that require a hearing can take several months to over a year. We work to resolve cases as efficiently as possible." },
    { question: "How much does a workers' comp lawyer cost?", answer: "Nothing up front. We work on contingency and only get paid if we recover benefits or a settlement for you. There is no financial risk." },
    { question: "What if my injury developed over time?", answer: "Repetitive stress injuries, occupational illnesses, and conditions that develop gradually from job duties are covered by workers' compensation. The key is connecting the condition to your work activities through proper medical documentation." },
    { question: "Can I receive workers' comp and Social Security disability at the same time?", answer: "Yes, but there may be an offset. If your combined workers' comp and Social Security disability benefits exceed 80% of your pre-injury earnings, your Social Security benefits may be reduced. We help you navigate the interaction between these two systems." },
  ],
  relatedAreas: [
    { slug: "auto-accidents", title: "Auto Accident & No-Fault Claims" },
    { slug: "premises-liability", title: "Premises Liability / Slip & Fall" },
    { slug: "wrongful-death", title: "Wrongful Death" },
  ],
  relatedCases: [], // firm-approved results only (none supplied yet)
  resources: [
    { title: "Michigan Personal Injury Overview", href: "/personal-injury" },
    { title: "Auto Accident & No-Fault Claims", href: "/personal-injury/auto-accidents" },
    { title: "Premises Liability / Slip & Fall", href: "/personal-injury/premises-liability" },
    { title: "Wrongful Death Claims", href: "/personal-injury/wrongful-death" },
    { title: "Medical Malpractice Claims", href: "/personal-injury/medical-malpractice" },
    { title: "Dog Bite Injuries", href: "/personal-injury/dog-bites" },
  ],
  keywords: ["workers compensation lawyer Michigan", "workplace injury attorney Dearborn", "denied workers comp claim Detroit", "work injury lawyer Michigan"],
  cities: ["Dearborn", "Detroit", "Dearborn Heights", "Ann Arbor", "Wayne County", "Oakland County", "Macomb County"],
};
