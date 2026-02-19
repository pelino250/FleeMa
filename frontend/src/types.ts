/** Shared TypeScript types for the FleeMa frontend. */

export type Role = "superadmin" | "tenant_admin" | "manager" | "employee" | "driver";

export interface Tenant {
  id: number;
  name: string;
  subdomain: string;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: Role;
  tenant: Tenant | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  company_name: string;
}
