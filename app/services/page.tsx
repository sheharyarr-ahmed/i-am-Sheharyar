const SERVICES = [
  {
    title: "Agentic AI systems",
    desc: "Autonomous agents that reason, plan, and execute. Built on LangGraph, the Claude API, and MCP, with tool-use validation, bounded retry, and full per-node observability. Not chatbots.",
  },
  {
    title: "Modern full-stack web",
    desc: "Production SaaS, MVPs, and internal platforms on Next.js, React, and strict TypeScript, with Supabase and Drizzle. From zero to launch, shipped in the open.",
  },
  {
    title: "Native iOS engineering",
    desc: "Native Swift and SwiftUI for iPhone and iPad. SwiftData, ActivityKit, and Core ML. iOS only, never React Native or Flutter.",
  },
  {
    title: "Marketing engineering",
    desc: "Programmatic SEO, automated content pipelines, and programmatic video production. Growth infrastructure that keeps running after you log off.",
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
            SaaS. Systems that execute work rather than display it.
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
