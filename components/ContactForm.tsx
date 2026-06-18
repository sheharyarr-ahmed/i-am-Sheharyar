"use client";

import { useActionState, useState } from "react";
import { submitContact } from "@/app/contact/actions";
import {
  BUDGET_TIERS,
  INTEREST_OPTIONS,
  type ContactState,
} from "@/lib/contact-schema";

const INITIAL: ContactState = { ok: false };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, INITIAL);
  const [interests, setInterests] = useState<string[]>([]);
  const [budget, setBudget] = useState<string>("");

  const toggleInterest = (value: string) =>
    setInterests((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value],
    );

  const fieldError = (key: string) => state.fieldErrors?.[key]?.[0];

  if (state.ok) {
    return (
      <p className="form-status">
        Thanks — your message is on its way. I&apos;ll be in touch shortly.
      </p>
    );
  }

  return (
    <form action={formAction} className="contact-form">
      {/* honeypot — bots fill this; humans never see it */}
      <div className="honeypot" aria-hidden="true">
        <label>
          Website
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <div>
        <label className="field-label" htmlFor="name">
          name
        </label>
        <input id="name" name="name" type="text" className="field-input" />
        {fieldError("name") && (
          <p className="field-error">{fieldError("name")}</p>
        )}
      </div>

      <div>
        <label className="field-label" htmlFor="company">
          company (optional)
        </label>
        <input
          id="company"
          name="company"
          type="text"
          className="field-input"
        />
      </div>

      <div>
        <label className="field-label" htmlFor="email">
          email
        </label>
        <input id="email" name="email" type="email" className="field-input" />
        {fieldError("email") && (
          <p className="field-error">{fieldError("email")}</p>
        )}
      </div>

      <div>
        <span className="field-label">i&apos;m interested in…</span>
        <div className="chip-row">
          {INTEREST_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              className="chip"
              aria-pressed={interests.includes(opt)}
              onClick={() => toggleInterest(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
        {interests.map((value) => (
          <input key={value} type="hidden" name="interests" value={value} />
        ))}
      </div>

      <div>
        <span className="field-label">budget</span>
        <div className="chip-row">
          {BUDGET_TIERS.map((tier) => (
            <button
              key={tier}
              type="button"
              className="chip"
              aria-pressed={budget === tier}
              onClick={() => setBudget((prev) => (prev === tier ? "" : tier))}
            >
              {tier}
            </button>
          ))}
        </div>
        {budget && <input type="hidden" name="budget" value={budget} />}
      </div>

      <div>
        <label className="field-label" htmlFor="description">
          tell me about the project
        </label>
        <textarea
          id="description"
          name="description"
          className="field-textarea"
        />
        {fieldError("description") && (
          <p className="field-error">{fieldError("description")}</p>
        )}
      </div>

      {state.error && <p className="field-error">{state.error}</p>}

      <button type="submit" className="submit-btn" disabled={pending}>
        {pending ? "sending…" : "request a quote"}
      </button>
    </form>
  );
}
