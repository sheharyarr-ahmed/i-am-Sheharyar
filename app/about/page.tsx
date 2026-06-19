import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Founder of SheryLabs. Solo-architect engagements across agentic AI, modern full-stack, and native iOS.",
};

export default function About() {
  return (
    <main className="about-main">
      <div className="about-block">
        <h2 className="section-title">Now</h2>
        <p className="para">
          Founding{" "}
          <a
            href="https://sherylabs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bold"
          >
            SheryLabs
          </a>
          , a small studio for founders who have outgrown traditional SaaS. Most
          of what I do there is solo-architect engagements across agentic AI,
          modern full-stack, and native iOS.
        </p>
        <p className="para">
          Completing an <span className="bold">MS in Software Engineering</span> @
          NUST, Islamabad.
        </p>
        <p className="para">
          I take on a small number of senior engagements at a time, because senior
          architecture is not something you parallelize across ten clients.
        </p>

        <h2 className="section-title">Interests</h2>
        <p className="para">
          The shift from SaaS to autonomous software. Systems that execute work
          rather than display it.
        </p>
        <p className="para">
          Agentic architecture. How to give agents enough structure to be reliable
          without eliminating their flexibility.
        </p>
        <p className="para">
          Native iOS as craft. Why Apple-platform engineering still matters in a
          cross-platform world.
        </p>
        <p className="para">
          The economics of solo senior engineering. What one person can ship when
          given the right leverage.
        </p>

        <h2 className="section-title">Background</h2>
        <p className="para">
          <span className="bold">BS in Software Engineering</span>, SZABIST (2024).
          Continued self-directed study in modern full-stack, agentic systems, and
          Apple-platform engineering. Remote / Global.
        </p>
      </div>
    </main>
  );
}
