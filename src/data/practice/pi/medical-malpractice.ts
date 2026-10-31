import type { PracticeAreaPI } from "./types";

export const medicalMalpracticeData: PracticeAreaPI = {
  slug: "medical-malpractice",
  title: "Medical Malpractice",
  heroTitle: "Michigan Medical Malpractice Lawyer",
  heroImage: "/assets/practice/medical-malpractice.webp",
  heroImageAlt: "Medical malpractice case representation in Michigan",
  tagline: "When the care that was supposed to help you causes harm, we hold the provider accountable.",
  seoTitle: "Medical Malpractice Lawyer | Dearborn & Detroit | ATLAW",
  seoDescription: "Harmed by a medical error in Michigan? ATLAW handles the records, experts, and deadlines. Surgical errors, misdiagnosis, birth injuries. Free case review.",
  overview: [
    "You go to a doctor or a hospital to get better, not worse. Most of the time that’s what happens. But when a provider cuts corners, misses something a careful professional wouldn’t, or makes a mistake during treatment, the damage can follow you for years.",
    "These cases are hard, and hospitals know it. They have insurers and lawyers who fight every claim. Proving what went wrong takes medical records, independent expert review, and someone willing to do the work. We handle that.",
  ],
  whyChooseUs: [
    "Medical malpractice cases require a higher level of proof than most personal injury claims. Michigan law demands that you file a Notice of Intent and obtain an Affidavit of Merit from a qualified medical expert before you can even file suit. Missing a step means your case is dismissed.",
    "We bring in the right medical specialists to review your records, identify exactly what went wrong, and explain it in terms a jury can understand. Attorney Dewnya Bazzi works directly with these experts because the medical details drive the case.",
    "We work on contingency. You pay nothing unless we recover compensation for you. We advance all costs for expert review, record retrieval, and filing fees.",
  ],
  caseResults: [], // firm-approved results only (none supplied yet)
  steps: [
    { number: 1, title: "Contact ATLAW", description: "Call us for a free consultation. We’ll review what happened and tell you honestly whether you have a case." },
    { number: 2, title: "Get Medical Attention", description: "Continue treating with a provider you trust. Your ongoing medical records are critical evidence." },
    { number: 3, title: "Document Everything", description: "Keep records of every appointment, medication, and symptom. We request the complete medical file from the facility." },
    { number: 4, title: "Let Us Handle the Rest", description: "We retain medical experts, file the Notice of Intent, and build the case to hold the provider accountable." },
  ],
  michiganLaw: [
    {
      heading: "What Constitutes Medical Malpractice in Michigan",
      paragraphs: [
        "Medical malpractice occurs when a healthcare provider fails to meet the accepted standard of care and that failure causes injury to the patient. The standard of care is what a reasonably competent provider in the same specialty would have done under similar circumstances.",
        "It is not enough to show that a bad outcome occurred. Medicine involves risk, and not every complication is malpractice. The key question is whether the provider deviated from the standard of care and whether that deviation directly caused your injury.",
      ],
    },
    {
      heading: "Notice of Intent and Affidavit of Merit",
      paragraphs: [
        "Before filing a medical malpractice lawsuit in Michigan, you must send a Notice of Intent (NOI) to the healthcare provider at least 182 days before filing suit. This notice must include specific details about the claim, including the standard of care, how the provider breached it, and how that breach caused your injury.",
        "When you file the lawsuit, you must also include an Affidavit of Merit signed by a qualified medical expert who has reviewed your case and confirms that the provider fell below the standard of care. Without this affidavit, the court will dismiss your case.",
        "These requirements exist to filter out frivolous claims, but they also create traps for people who try to handle malpractice cases without experienced counsel. The timelines are strict and the documentation requirements are specific.",
      ],
    },
    {
      heading: "Statute of Limitations",
      paragraphs: [
        "Michigan’s statute of limitations for medical malpractice is two years from the date the malpractice occurred, or six months from when you discovered (or should have discovered) the injury, whichever is later. The absolute outer limit is six years from the date of the act.",
        "For minors, the deadline is extended: a claim can be filed until the child’s eighth birthday for injuries occurring before age six, or within two years of the injury for older children. These exceptions are narrow and courts enforce them strictly.",
      ],
    },
  ],
  testimonials: [], // pages use the shared Google reviews (data/testimonials.ts)
  faqs: [
    { question: "How do I know if I have a medical malpractice case?", answer: "You may have a case if a healthcare provider’s error caused you harm. The key elements are: the provider owed you a duty of care, they breached the accepted standard of care, and that breach directly caused your injury. A free consultation with our team can help you understand whether your situation qualifies." },
    { question: "What is the statute of limitations for medical malpractice in Michigan?", answer: "Generally two years from the date the malpractice occurred, or six months from when you discovered the injury, whichever is later. The absolute deadline is six years from the act. Different rules apply for minors. These deadlines are strictly enforced." },
    { question: "What damages can I recover in a malpractice case?", answer: "You may recover past and future medical expenses, lost wages and earning capacity, pain and suffering, loss of quality of life, and in some cases, loss of consortium for your spouse. Michigan caps noneconomic damages in malpractice cases, with the cap amount adjusted annually for inflation." },
    { question: "What is a Notice of Intent?", answer: "A formal notice you must send to the healthcare provider at least 182 days before filing a malpractice lawsuit. It must describe the standard of care, how the provider breached it, the injuries caused, and the factual basis for each claim. This is a mandatory pre-suit requirement under Michigan law." },
    { question: "Do I need a medical expert to file a malpractice case?", answer: "Yes. Michigan requires an Affidavit of Merit from a qualified medical expert who has reviewed your case and confirmed that the provider fell below the standard of care. We retain and work with the right specialists for your specific type of case." },
    { question: "How long does a medical malpractice case take?", answer: "These cases are typically longer than other injury claims due to the Notice of Intent waiting period, expert review process, and complexity of medical evidence. Many cases take one to three years. We keep you informed at every stage." },
    { question: "What types of medical errors qualify as malpractice?", answer: "Surgical errors, misdiagnosis or delayed diagnosis, medication errors, anesthesia mistakes, birth injuries, hospital-acquired infections, emergency room negligence, and nursing home abuse or neglect can all qualify if they result from a breach of the standard of care." },
    { question: "Can I sue a hospital or just the individual doctor?", answer: "You may be able to sue both. Hospitals can be liable for the actions of their employees and sometimes for independent contractors who work at their facility. We identify all potentially liable parties to maximize your recovery." },
    { question: "What if I signed a consent form before the procedure?", answer: "A consent form acknowledges that you understood the general risks of a procedure. It does not give a doctor permission to be negligent. If the provider made an error that fell below the standard of care, the consent form does not shield them from liability." },
    { question: "How much does it cost to hire a medical malpractice lawyer?", answer: "Nothing up front. We work on contingency and advance all case costs, including expert fees, medical record retrieval, and filing fees. You pay nothing unless we recover money for you." },
  ],
  relatedAreas: [
    { slug: "auto-accidents", title: "Auto Accident & No-Fault Claims" },
    { slug: "wrongful-death", title: "Wrongful Death" },
    { slug: "workers-compensation", title: "Workers’ Compensation" },
  ],
  relatedCases: [], // firm-approved results only (none supplied yet)
  resources: [
    { title: "Michigan Personal Injury Overview", href: "/personal-injury" },
    { title: "Auto Accident & No-Fault Claims", href: "/personal-injury/auto-accidents" },
    { title: "Wrongful Death Claims", href: "/personal-injury/wrongful-death" },
    { title: "Workers’ Compensation", href: "/personal-injury/workers-compensation" },
    { title: "Premises Liability / Slip & Fall", href: "/personal-injury/premises-liability" },
    { title: "Dog Bite Injuries", href: "/personal-injury/dog-bites" },
  ],
  keywords: ["medical malpractice lawyer Michigan", "surgical error attorney Dearborn", "birth injury lawyer Detroit", "misdiagnosis attorney Michigan"],
  cities: ["Dearborn", "Detroit", "Dearborn Heights", "Ann Arbor", "Wayne County", "Oakland County", "Macomb County"],
};
