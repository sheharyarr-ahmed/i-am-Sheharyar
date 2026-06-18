import { Resend } from "resend";

// Null when RESEND_API_KEY is unset so the contact action can degrade gracefully
// instead of throwing at module load.
export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export const CONTACT_TO_EMAIL =
  process.env.CONTACT_TO_EMAIL ?? "sheryahmedme1@gmail.com";

// Resend's onboarding sender works without a verified domain.
export const CONTACT_FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";
