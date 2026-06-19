import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project. Share what you are building and request a quote.",
};

export default function Contact() {
  return (
    <main className="about-main">
      <div className="about-block">
        <div className="list-intro">
          <h1 className="list-heading">let&apos;s talk.</h1>
          <p className="list-sub">
            Building something that matters? See what we build at{" "}
            <a
              href="https://sherylabs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="item-link"
            >
              sherylabs.com
            </a>
            . Reach me directly at{" "}
            <a href="mailto:ping@sherylabs.tech" className="item-link">
              ping@sherylabs.tech
            </a>
            , book a call on{" "}
            <a
              href="https://cal.com/sheharyar-ahmed"
              target="_blank"
              rel="noopener noreferrer"
              className="item-link"
            >
              Cal.com
            </a>
            , or request a quote below.
          </p>
        </div>

        <ContactForm />
      </div>
    </main>
  );
}
