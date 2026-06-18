// TODO(content): owner to confirm/replace service line-items below.
// Seeded from the CLAUDE.md stack (agentic AI, full-stack, native iOS, marketing eng).
const SERVICES = [
  {
    title: "Agentic AI Systems",
    desc: "Autonomous agents and LLM pipelines that execute work end-to-end — built on Claude, LangGraph, and typed tool interfaces.",
  },
  {
    title: "Full-Stack Products",
    desc: "Production web apps on the MERN and Next.js App Router stack — server actions, typed data layers, shipped to Vercel.",
  },
  {
    title: "Native iOS",
    desc: "Native Swift / SwiftUI applications for iPhone and iPad — Apple-platform craft, no cross-platform shortcuts.",
  },
  {
    title: "Marketing Engineering",
    desc: "Technical marketing systems — landing pages, analytics, and conversion infrastructure that compounds over time.",
  },
];

export default function Services() {
  return (
    <main className="about-main">
      <div className="about-block">
        <div className="list-intro">
          <h1 className="list-heading">what i build.</h1>
          <p className="list-sub">
            Solo-architect engagements for founders who have outgrown traditional
            SaaS — systems that execute work rather than display it.
          </p>
        </div>

        {SERVICES.map((s) => (
          <div key={s.title} className="list-item">
            <h2 className="item-title">{s.title}</h2>
            <p className="item-desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
