/**
 * Site content and fee structure for IVY Childcare Services.
 * Centralized in this file so it can later be moved to Firestore if desired.
 */

export interface FeeData {
  registration: number;
  latePickupPerDay: number;
  ageGroups: [string, string, string];
  full: [[number, number], [number, number], [number, number]];
  half: [[number, number], [number, number], [number, number]];
  three: [[number, number], [number, number], [number, number]];
  dropIn: [number, number, number];
}

export const feeData: FeeData = {
  registration: 1500,
  latePickupPerDay: 300,
  ageGroups: ["Above 2 years", "1 to 2 years", "6 months to 1 year"],
  full: [
    [8500, 21250],
    [10500, 25250],
    [12500, 31500],
  ],
  half: [
    [5500, 12500],
    [6800, 16500],
    [8150, 20000],
  ],
  three: [
    [6000, 14875],
    [7500, 17500],
    [9000, 21500],
  ],
  dropIn: [450, 550, 650],
};

export const therapyPrograms = [
  {
    id: "full-day",
    title: "Full-day program",
    schedule: "Monday to Friday, 7:00 AM to 3:00 PM (1:00 to 9:00 local time)",
    price: 30000,
    priceUnit: "ETB / month",
    features: [
      "Individual therapy sessions integrated into daily routine",
      "Daily written observation report",
      "Friday progress video",
      "Structured socialization and communication practice",
    ],
  },
  {
    id: "after-school",
    title: "After-school program",
    schedule: "Monday to Friday, 3:00 PM to 6:00 PM (9:00 to 12:00 local time)",
    price: 8000,
    priceUnit: "ETB / month, therapy included",
    features: [
      "Therapy included in program",
      "Targeted early intervention exercises",
      "Daily written summary",
    ],
  },
  {
    id: "saturday",
    title: "Saturday sessions",
    schedule: "Saturday morning sessions (1:00 to 6:00 local time)",
    price: 2000,
    priceUnit: "ETB / month",
    features: [
      "Focused developmental support",
      "Parent consultation and guidance",
      "Weekly observation summary",
    ],
  },
  {
    id: "one-hour",
    title: "One-hour therapy",
    schedule: "Scheduled individually with therapist",
    price: 1000,
    priceUnit: "ETB / hour",
    features: [
      "Direct individual session with a professional",
      "Personalized focus area",
      "Post-session parent debrief",
    ],
  },
];

export const contactInfo = {
  phoneDisplay: "0917 730 032",
  phoneTel: "+251917730032",
  city: "Addis Ababa, Ethiopia",
  streetAddressPlaceholder: "Bole Sub-City (contact for exact directions)",
  emailPlaceholder: "info@ivychildcare.et",
};
