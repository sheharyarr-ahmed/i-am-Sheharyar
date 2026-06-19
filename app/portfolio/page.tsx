import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected shipped work, built in the open: ReelMind, AuditDoc, FocusFrame.",
};

// Real, shipped, public work. Anti-fabrication: only repos that exist on GitHub.
const PROJECTS: { name: string; desc: string; url: string }[] = [
  {
    name: "ReelMind",
    desc: "Agentic video production pipeline. A 7 node LangGraph.js state machine with conditional retry edges, Claude Haiku and Opus, Zod tool-use validation, and Remotion rendering across three aspect ratios. Next.js, React, Supabase, Drizzle.",
    url: "https://github.com/sheharyarr-ahmed/reelmind",
  },
  {
    name: "AuditDoc",
    desc: "AI compliance document evaluator. Next.js and FastAPI with Claude, mandatory page-citation enforcement, PyMuPDF extraction, and verified government-data citations with SHA-256 checks.",
    url: "https://github.com/sheharyarr-ahmed/auditdoc-app",
  },
  {
    name: "FocusFrame",
    desc: "Native iOS focus app. Swift 6, SwiftUI, SwiftData, ActivityKit Live Activities, Swift Charts, and Claude-coached reflections, on a strict five-layer architecture.",
    url: "https://github.com/sheharyarr-ahmed/focusframe",
  },
];

export default function Portfolio() {
  return (
    <main className="about-main">
      <div className="about-block">
        <div className="list-intro">
          <h1 className="list-heading">selected work.</h1>
          <p className="list-sub">
            I ship most of what I build in the open. Source and architecture both,
            so the work speaks before I do. The full profile lives on{" "}
            <a
              href="https://github.com/sheharyarr-ahmed"
              target="_blank"
              rel="noopener noreferrer"
              className="item-link"
            >
              GitHub
            </a>
            .
          </p>
        </div>

        {PROJECTS.map((p) => (
          <div key={p.url} className="list-entry">
            <h2 className="item-title">
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="item-link"
              >
                {p.name}
              </a>
            </h2>
            <p className="item-desc">{p.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
