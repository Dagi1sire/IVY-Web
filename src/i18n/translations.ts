export interface TranslationSchema {
  nav: {
    home: string;
    daycare: string;
    therapy: string;
    visit: string;
    callUs: string;
    bookVisit: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    title: string;
    intro: string;
    bookVisit: string;
    seePrograms: string;
  };
  programsPreview: {
    heading: string;
    daycareTitle: string;
    daycareDesc: string;
    daycarePrice: string;
    daycareButton: string;
    therapyTitle: string;
    therapyDesc: string;
    therapyPrice: string;
    therapyButton: string;
  };
  reporting: {
    heading: string;
    dailyTitle: string;
    dailyDesc: string;
    fridayTitle: string;
    fridayDesc: string;
    continuity: string;
  };
  gallery: {
    heading: string;
    note: string;
    tiles: {
      classroom: string;
      therapy: string;
      outdoor: string;
      team: string;
    };
  };
  faq: {
    heading: string;
    q1: string;
    a1: string;
    q2: string;
    a2: string;
    q3: string;
    a3: string;
    q4: string;
    a4: string;
    q5: string;
    a5: string;
    q6: string;
    a6: string;
  };
  daycarePage: {
    title: string;
    intro: string;
    calculatorTitle: string;
    ageLabel: string;
    scheduleLabel: string;
    schedules: {
      full: string;
      half: string;
      three: string;
      dropIn: string;
    };
    priceMonthly: string;
    priceTerm: string;
    priceDay: string;
    feesNote: string;
    hoursTitle: string;
    monFriTitle: string;
    monFriTime: string;
    monFriLocal: string;
    satTitle: string;
    satTime: string;
    satLocal: string;
    callToRegister: string;
    bookVisit: string;
  };
  therapyPage: {
    title: string;
    intro: string;
    bookAssessment: string;
    programsTitle: string;
    registrationNote: string;
    timelineTitle: string;
    steps: Array<{
      step: number;
      title: string;
      description: string;
    }>;
    closingLine: string;
  };
  visitSection: {
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    phoneHelp: string;
    ageGroupLabel: string;
    ageUnder1: string;
    age1to2: string;
    ageAbove2: string;
    programLabel: string;
    programDaycare: string;
    programTherapy: string;
    programNotSure: string;
    dayLabel: string;
    days: {
      mon: string;
      tue: string;
      wed: string;
      thu: string;
      fri: string;
      sat: string;
    };
    messageLabel: string;
    messagePlaceholder: string;
    consentText: string;
    submitButton: string;
    submitting: string;
    successMessage: string;
    fallbackCall: string;
    errorMessage: string;
    validation: {
      nameRequired: string;
      phoneInvalid: string;
      consentRequired: string;
    };
  };
  footer: {
    name: string;
    phone: string;
    registrationNote: string;
    photoConsent: string;
    privacyLink: string;
    address: string;
    allRightsReserved: string;
  };
  privacyPage: {
    title: string;
    intro: string;
    whatWeCollectTitle: string;
    whatWeCollectText: string;
    whyWeCollectTitle: string;
    whyWeCollectText: string;
    whoCanSeeTitle: string;
    whoCanSeeText: string;
    deletionTitle: string;
    deletionText: string;
    backHome: string;
  };
  guideHelper: {
    title: string;
    subtitle: string;
    promptPlaceholder: string;
    button: string;
    thinking: string;
    disclaimer: string;
    resultsTitle: string;
  };
}

export const en: TranslationSchema = {
  nav: {
    home: "Home",
    daycare: "Daycare",
    therapy: "Therapy & Support",
    visit: "Book a visit",
    callUs: "Call 0917 730 032",
    bookVisit: "Book a visit",
    openMenu: "Open navigation menu",
    closeMenu: "Close navigation menu",
  },
  hero: {
    title: "Every child grows at their own pace. We make room for that.",
    intro: "Daycare and therapeutic early-intervention programs in Addis Ababa. Parents get a written report every day and a video update every Friday.",
    bookVisit: "Book a visit",
    seePrograms: "See our programs",
  },
  programsPreview: {
    heading: "Choose the program that fits your child",
    daycareTitle: "Daycare",
    daycareDesc: "Full-time, half-day, three days a week, or a single day. For children from 6 months old.",
    daycarePrice: "Drop-in from 450 ETB / day",
    daycareButton: "See daycare fees",
    therapyTitle: "Therapy & Special Support",
    therapyDesc: "An individual assessment, a plan built around your child, and daily therapy with professionals.",
    therapyPrice: "Therapy 1,000 ETB / hour",
    therapyButton: "See how it works",
  },
  reporting: {
    heading: "You always know how your child's day went",
    dailyTitle: "Every day",
    dailyDesc: "A written report on what your child did and how they responded.",
    fridayTitle: "Every Friday",
    fridayDesc: "A short video showing your child's progress that week.",
    continuity: "We connect therapy at school with therapy at home and in the community, so progress carries over into everyday life.",
  },
  gallery: {
    heading: "Our space",
    note: "Photos show our space and activities. Children appear only with their parents' written consent.",
    tiles: {
      classroom: "Classroom and play area",
      therapy: "Therapy room",
      outdoor: "Outdoor play",
      team: "Our team",
    },
  },
  faq: {
    heading: "Frequently asked questions",
    q1: "What ages do you take?",
    a1: "Daycare is open to children from 6 months old. Therapy programs start with an individual assessment.",
    q2: "What are your opening hours?",
    a2: "Daycare: Monday to Friday 7:00 AM to 6:00 PM, and Saturday 7:00 AM to 4:00 PM. The therapy full-day program runs 7:00 AM to 3:00 PM.",
    q3: "Can my child come for just one day?",
    a3: "Yes. Daycare drop-in is 450 to 650 ETB per day, depending on your child's age.",
    q4: "How do I register?",
    a4: "Call us or send a visit request. Registration is a one-time fee of 1,500 ETB.",
    q5: "How will I know how my child's day went?",
    a5: "You receive a written report every day and a video update every Friday.",
    q6: "What if I'm late for pickup?",
    a6: "Daycare pickup after closing time costs 300 ETB per day.",
  },
  daycarePage: {
    title: "Daycare",
    intro: "A safe, caring day for children from 6 months old. Pick your child's age and schedule to see what it costs.",
    calculatorTitle: "Interactive fee calculator",
    ageLabel: "Child's age group",
    scheduleLabel: "Schedule",
    schedules: {
      full: "Full-time",
      half: "Half-day",
      three: "Three days a week",
      dropIn: "Drop-in",
    },
    priceMonthly: "per month",
    priceTerm: "per term (2.5 months)",
    priceDay: "per day",
    feesNote: "One-time registration fee: 1,500 ETB. Late pickup after closing is 300 ETB per day.",
    hoursTitle: "Opening hours",
    monFriTitle: "Monday to Friday",
    monFriTime: "7:00 AM to 6:00 PM",
    monFriLocal: "1:00 to 12:00 local time",
    satTitle: "Saturday",
    satTime: "7:00 AM to 4:00 PM",
    satLocal: "1:00 to 10:00 local time",
    callToRegister: "Call to register",
    bookVisit: "Book a visit",
  },
  therapyPage: {
    title: "Therapy & Special Support",
    intro: "Every child starts with an individual assessment. From it we build a plan, and the plan guides everything we do.",
    bookAssessment: "Book an assessment",
    programsTitle: "Programs and fees",
    registrationNote: "One-time registration fee: 1,500 ETB.",
    timelineTitle: "How we work with your child",
    steps: [
      {
        step: 1,
        title: "Individual assessment",
        description: "A professional works directly with your child and talks with you as parents or guardians.",
      },
      {
        step: 2,
        title: "Individual plan",
        description: "We prepare a plan from everything we learn in the assessment.",
      },
      {
        step: 3,
        title: "Intervention",
        description: "Therapy begins, guided by the plan.",
      },
      {
        step: 4,
        title: "Daily written report",
        description: "You receive what we observed through the day.",
      },
      {
        step: 5,
        title: "Friday video report",
        description: "A weekly video shows your child's progress.",
      },
    ],
    closingLine: "We want school therapy, home therapy, and community therapy to work together for a better outcome.",
  },
  visitSection: {
    title: "Book a visit",
    subtitle: "Come see our space, meet our staff, and ask any questions about your child.",
    nameLabel: "Parent or guardian name",
    namePlaceholder: "Abebe Bikila",
    phoneLabel: "Phone number",
    phonePlaceholder: "0911 234 567 or 07...",
    phoneHelp: "Accepts 09..., 07..., or +251...",
    ageGroupLabel: "Child's age group",
    ageUnder1: "Under 1 year",
    age1to2: "1 to 2 years",
    ageAbove2: "Above 2 years",
    programLabel: "Interested in",
    programDaycare: "Daycare",
    programTherapy: "Therapy & Special Support",
    programNotSure: "Not sure yet",
    dayLabel: "Best day to visit",
    days: {
      mon: "Monday",
      tue: "Tuesday",
      wed: "Wednesday",
      thu: "Thursday",
      fri: "Friday",
      sat: "Saturday",
    },
    messageLabel: "Message (optional)",
    messagePlaceholder: "Share anything helpful about your schedule or questions...",
    consentText: "I agree that IVY may contact me about this request.",
    submitButton: "Send visit request",
    submitting: "Sending request...",
    successMessage: "Thank you. We received your request and will call you soon.",
    fallbackCall: "You can also call us directly at 0917 730 032.",
    errorMessage: "We couldn't send that. Please try again or call 0917 730 032.",
    validation: {
      nameRequired: "Please enter your name (2 to 80 characters).",
      phoneInvalid: "Please enter a valid Ethiopian phone number (e.g. 0911234567, 0711234567, or +251...).",
      consentRequired: "Please agree to be contacted to proceed.",
    },
  },
  footer: {
    name: "IVY Childcare Services",
    phone: "0917 730 032",
    registrationNote: "Registration fee: 1,500 ETB (one-time)",
    photoConsent: "Photos of children are shared only with written parent consent.",
    privacyLink: "Privacy notice",
    address: "Addis Ababa, Ethiopia",
    allRightsReserved: "All rights reserved.",
  },
  privacyPage: {
    title: "Privacy Notice",
    intro: "We believe privacy and calm transparency are essential when caring for families and young children.",
    whatWeCollectTitle: "What we collect",
    whatWeCollectText: "When you book a visit, we collect only your name, phone number, your child's age group, your preferred program, preferred visit day, and any optional message you provide. We never ask for your child's name, birth date, or medical history through our public website.",
    whyWeCollectTitle: "Why we collect it",
    whyWeCollectText: "We use this information exclusively to call you back, arrange your visit or assessment, and ensure we have age-appropriate resources ready when you arrive.",
    whoCanSeeTitle: "Who can see it",
    whoCanSeeText: "Only authorized IVY Childcare staff can view your request. We do not use third-party tracking scripts, advertising trackers, or sell data to anyone.",
    deletionTitle: "How to request deletion",
    deletionText: "If you would like your visit request or contact details permanently removed from our records at any time, please call us directly at 0917 730 032 and our team will erase it immediately.",
    backHome: "Back to Home",
  },
  guideHelper: {
    title: "Visit Preparation & Milestone Questions Helper",
    subtitle: "Share any developmental curiosity or questions you have before your visit. We will prepare structured, thoughtful questions you can ask during your in-person conversation with our team.",
    promptPlaceholder: "For example: 'My 18-month-old is saying few words and prefers solitary play. What should I observe or ask during our visit?'",
    button: "Generate visit questions",
    thinking: "Preparing questions for your visit...",
    disclaimer: "Every child grows at their own pace. This guide helps organize questions for your in-person visit and is not a medical or clinical diagnosis.",
    resultsTitle: "Recommended questions for your visit",
  },
};
