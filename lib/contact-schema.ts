import { z } from "zod";

export const BUDGET_TIERS = ["<$2k", "$2k–$5k", "$5k–$10k", "$10k+"] as const;

export const INTEREST_OPTIONS = [
  "Agentic AI",
  "Full-Stack Product",
  "Native iOS",
  "Marketing Engineering",
  "Not sure yet",
] as const;

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required."),
  company: z.string().optional(),
  email: z.email("Enter a valid email."),
  description: z.string().min(1, "Tell me a little about the project."),
  interests: z.array(z.string()).default([]),
  budget: z.enum(BUDGET_TIERS).optional(),
  website: z.string().max(0).optional(), // honeypot — must be empty
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactState = {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};
