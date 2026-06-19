import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <Reveal>
      <main className="hero-main">
        <div className="hero-block">
          <p className="line">
            i am <span className="name">SHEHARYAR AHMED</span>.
          </p>
          <p className="line">
            i build systems that execute work: autonomous agents, full-stack
            products, and native iOS.
          </p>
          <p className="line">
            i ship most of my work{" "}
            <a
              href="https://github.com/sheharyarr-ahmed"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              here
            </a>{" "}
            and{" "}
            <a
              href="https://www.linkedin.com/in/sheharyar-ahmed-89598b226/"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              here
            </a>
            .
          </p>
          <p className="line">
            reach out at{" "}
            <a href="mailto:ping@sherylabs.tech" className="mono-accent">
              ping@sherylabs.tech
            </a>
            ; i like hearing from people building things that matter.
          </p>
        </div>
      </main>
    </Reveal>
  );
}
