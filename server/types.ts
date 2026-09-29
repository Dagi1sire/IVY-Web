export type ChildAgeGroup = "under_1" | "1_to_2" | "above_2";
export type ProgramInterest = "daycare" | "therapy" | "not_sure";
export type PreferredDay = "mon" | "tue" | "wed" | "thu" | "fri" | "sat";
export type VisitStatus =
  | "new"
  | "contacted"
  | "visit_scheduled"
  | "enrolled"
  | "not_proceeding";

export interface VisitRequestDoc {
  id?: string;
  createdAt: string; // ISO string / server timestamp
  parentName: string;
  phone: string; // +251...
  childAgeGroup: ChildAgeGroup;
  program: ProgramInterest;
  preferredDay: PreferredDay;
  message: string;
  status: VisitStatus;
  notes: string;
  assignedTo: string;
  contactedAt: string | null;
  updatedAt: string;
  updatedBy: string;
  source: "website";
  language: "en" | "am";
  notify: {
    telegram: "sent" | "failed" | "skipped";
    email: "sent" | "failed" | "skipped";
    errors: string;
  };
}
