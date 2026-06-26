"use client";

import { Mail, Code2, Heart } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "@/components/ui/SocialIcons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "var(--bg-surface)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: "var(--primary-glow)",
                border: "1px solid var(--primary)",
              }}
            >
              <Code2 size={16} style={{ color: "var(--primary)" }} />
            </div>
            <span
              className="font-bold gradient-text"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Pahmi Alifya Bahri
            </span>
          </div>

          {/* Copyright */}
          <p
            className="text-xs flex items-center gap-1"
            style={{ color: "var(--text-faint)" }}
          >
            © {year} · Built by
            <Heart size={12} style={{ color: "#f43f5e", fill: "#f43f5e" }} />
            Pahmi Alifya Bahri
          </p>

          {/* Social */}
          <div className="flex items-center gap-3">
            {[
              {
                href: "mailto:pahmi1998@gmail.com",
                icon: Mail,
                label: "Email",
              },
              {
                href: "https://github.com/pahmi-alifya",
                icon: GithubIcon,
                label: "GitHub",
              },
              {
                href: "https://www.linkedin.com/in/pahmi-alifya-bahri-479a0919a/",
                icon: LinkedinIcon,
                label: "LinkedIn",
              },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  color: "var(--text-muted)",
                }}
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
