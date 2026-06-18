// TODO(content): owner supplies the curated repo list (anti-fabrication: only real
// repos that exist on GitHub). Each entry renders as a row below the intro.
// Shape: { name: string; desc: string; url: string }
const PROJECTS: { name: string; desc: string; url: string }[] = [];

export default function Portfolio() {
  return (
    <main className="about-main">
      <div className="about-block">
        <div className="list-intro">
          <h1 className="list-heading">selected work.</h1>
          <p className="list-sub">
            I ship most of what I build in the open. The curated work lives on
            GitHub —{" "}
            <a
              href="https://github.com/sheharyarr-ahmed"
              target="_blank"
              rel="noopener noreferrer"
              className="item-link"
            >
              github.com/sheharyarr-ahmed
            </a>
            .
          </p>
        </div>

        {PROJECTS.map((p) => (
          <div key={p.url} className="list-item">
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
