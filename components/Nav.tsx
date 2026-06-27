"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const INTERNAL = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/services", label: "services" },
  { href: "/portfolio", label: "portfolio" },
  { href: "/contact", label: "contact" },
];

const EXTERNAL = [
  {
    href: "https://www.upwork.com/freelancers/~01b873b895635d79b6",
    label: "upwork",
  },
  { href: "https://github.com/sheharyarr-ahmed", label: "github" },
  {
    href: "https://www.linkedin.com/in/sheharyar-ahmed-89598b226/",
    label: "linkedin",
  },
  { href: "https://x.com/real_sheharyar", label: "twitter" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <div className="nav-wrap">
      <nav className="hero-nav">
        {INTERNAL.filter((item) => item.href !== pathname).map((item) => (
          <Link key={item.href} href={item.href} className="nav-item">
            [ {item.label} ]
          </Link>
        ))}
        {EXTERNAL.map((item) => (
          <a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-item"
          >
            [ {item.label} ]
          </a>
        ))}
      </nav>
    </div>
  );
}
