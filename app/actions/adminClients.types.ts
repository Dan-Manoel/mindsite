export interface ProjectInputDTO {
  id?: string;
  name: string;
  domain?: string;
  description?: string;
  setupAmount: number;
  installments: Array<{
    id?: string;
    amount: number;
    scheduledDate: string;
    description: string;
  }>;
  sustainabilityPlan: "NONE" | "ESSENTIAL" | "DEVELOPMENT" | "ADVANCED" | "CUSTOM";
  customPlanAmount?: number;
  sustainabilityStartDate?: string;
}

export interface ClientDTO {
  fullName: string;
  primaryEmail: string;
  secondaryEmail?: string;
  password?: string;
  phone?: string;
  document?: string;
  companyName?: string;
  address?: string;
  autentiqueDocId?: string;
  projects: ProjectInputDTO[];
}
