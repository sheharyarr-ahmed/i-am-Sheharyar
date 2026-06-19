"use server";

import {
  contactSchema,
  type ContactState,
} from "@/lib/contact-schema";
import {
  resend,
  CONTACT_TO_EMAIL,
  CONTACT_FROM_EMAIL,
} from "@/lib/resend";

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name") ?? "",
    company: formData.get("company") || undefined,
    email: formData.get("email") ?? "",
    description: formData.get("description") ?? "",
    interests: formData.getAll("interests").map(String),
    budget: formData.get("budget") || undefined,
    website: formData.get("website") || undefined,
  });

  if (!parsed.success) {
    const tree = parsed.error.flatten();
    // Honeypot ("website") tripped → treat as a bot. Don't reveal it; report success.
    if (tree.fieldErrors.website) {
      return { ok: true };
    }
    return { ok: false, fieldErrors: tree.fieldErrors };
  }

  const data = parsed.data;

  if (!resend) {
    return {
      ok: false,
      error:
        "Email isn't wired up yet. Reach me directly at ping@sherylabs.tech.",
    };
  }

  const lines = [
    `Name: ${data.name}`,
    data.company ? `Company: ${data.company}` : null,
    `Email: ${data.email}`,
    data.interests.length ? `Interested in: ${data.interests.join(", ")}` : null,
    data.budget ? `Budget: ${data.budget}` : null,
    "",
    data.description,
  ]
    .filter((l) => l !== null)
    .join("\n");

  try {
    const { error } = await resend.emails.send({
      from: `Portfolio Contact <${CONTACT_FROM_EMAIL}>`,
      to: CONTACT_TO_EMAIL,
      replyTo: data.email,
      subject: `New project inquiry — ${data.name}`,
      text: lines,
    });

    if (error) {
      return {
        ok: false,
        error: "Something went wrong sending your message. Please try again.",
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "Something went wrong sending your message. Please try again.",
    };
  }
}
