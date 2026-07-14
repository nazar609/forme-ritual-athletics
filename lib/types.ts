export type LeadStatus = "new" | "contacted" | "booked" | "archived";

export interface TrialLead {
  id: string;
  name: string;
  phone: string;
  email: string;
  program: string;
  preferredTime: string;
  consent: boolean;
  status: LeadStatus;
  createdAt: string;
}

export interface ClassSession {
  id: string;
  day: number;
  time: string;
  title: string;
  coach: string;
  category: "strength" | "pilates" | "conditioning" | "recovery";
  duration: number;
  spots: number;
}
