"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowDown, MapPin, Briefcase } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "@/components/ui/SocialIcons";

const ParticleField = dynamic(
  () => import("@/components/three/ParticleField").then((m) => m.ParticleField),
  { ssr: false },
);

const ROLES = [
  "Frontend Engineer",
  "React Native Developer",
  "Next.js Specialist",
  "Mobile Developer",
  "UI/UX Implementer",
];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [nameVisible, setNameVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Typewriter effect
  useEffect(() => {
    const current = ROLES[roleIndex];
    const speed = isDeleting ? 40 : 80;
    const pause = isDeleting ? 500 : 2000;

    if (!isDeleting && displayed === current) {
      timeoutRef.current = setTimeout(() => setIsDeleting(true), pause);
      return;
    }

    if (isDeleting && displayed === "") {
      setIsDeleting(false);
      setRoleIndex((i) => (i + 1) % ROLES.length);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setDisplayed(
        isDeleting
          ? current.slice(0, displayed.length - 1)
          : current.slice(0, displayed.length + 1),
      );
    }, speed);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayed, isDeleting, roleIndex]);

  // Name appear animation
  useEffect(() => {
    const t = setTimeout(() => setNameVisible(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Particle background */}
      <ParticleField />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, var(--primary-glow) 0%, transparent 70%)",
        }}
      />

      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-8"
          style={{
            background: "var(--primary-glow)",
            border: "1px solid var(--primary)",
            color: "var(--primary)",
          }}
          aria-hidden
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{
              background: "#4ade80",
              boxShadow: "0 0 6px #4ade80",
              animation: "glow-pulse 2s ease infinite",
            }}
          />
          Available for opportunities
        </div>

        {/* Greeting */}
        <p
          className="text-base sm:text-lg font-medium mb-2"
          style={{
            color: "var(--text-muted)",
            animation: "badge-reveal 0.6s ease 0.2s both",
          }}
        >
          Hi, I&apos;m
        </p>

        {/* Name with glitch */}
        <div className="relative mb-4" style={{ minHeight: "1.1em" }}>
          <h1
            className="section-title gradient-text relative inline-block"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 5rem)",
              opacity: nameVisible ? 1 : 0,
              transform: nameVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            Pahmi Alifya Bahri
          </h1>
          {/* Glitch layers */}
          {nameVisible && (
            <>
              <span
                aria-hidden
                className="absolute inset-0 flex items-center justify-center section-title"
                style={{
                  fontSize: "clamp(2.5rem, 8vw, 5rem)",
                  color: "var(--accent)",
                  opacity: 0,
                  animation: "glitch-1 4s ease-in-out 1s infinite",
                  clipPath: "inset(30% 0 40% 0)",
                  left: "2px",
                }}
              >
                Pahmi Alifya Bahri
              </span>
              <span
                aria-hidden
                className="absolute inset-0 flex items-center justify-center section-title"
                style={{
                  fontSize: "clamp(2.5rem, 8vw, 5rem)",
                  color: "var(--purple)",
                  opacity: 0,
                  animation: "glitch-2 4s ease-in-out 1.5s infinite",
                  clipPath: "inset(60% 0 10% 0)",
                  left: "-2px",
                }}
              >
                Pahmi Alifya Bahri
              </span>
            </>
          )}
        </div>

        {/* Typewriter role */}
        <div
          className="text-xl sm:text-2xl font-semibold mb-6 h-8 flex items-center justify-center gap-2"
          style={{
            color: "var(--accent)",
            fontFamily: "var(--font-space-grotesk)",
            animation: "badge-reveal 0.6s ease 0.8s both",
            opacity: 0,
          }}
        >
          <span>{displayed}</span>
          <span
            style={{
              animation: "blink 1s step-end infinite",
              color: "var(--accent)",
            }}
          >
            |
          </span>
        </div>

        {/* Bio */}
        <p
          className="text-base sm:text-lg max-w-2xl mx-auto mb-4 leading-relaxed"
          style={{
            color: "var(--text-muted)",
            animation: "badge-reveal 0.6s ease 1s both",
            opacity: 0,
          }}
        >
          Building scalable web & mobile experiences with React, Next.js, and
          React Native. 5+ years crafting products that millions use.
        </p>

        {/* Meta */}
        <div
          className="flex items-center justify-center gap-4 mb-8 text-sm"
          style={{
            color: "var(--text-faint)",
            animation: "badge-reveal 0.6s ease 1.1s both",
            opacity: 0,
          }}
        >
          <span className="flex items-center gap-1">
            <MapPin size={14} />
            Bogor, Indonesia
          </span>
          <span className="flex items-center gap-1">
            <Briefcase size={14} />
            Deeeplabs
          </span>
        </div>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          style={{ animation: "badge-reveal 0.6s ease 1.2s both", opacity: 0 }}
        >
          <Link
            href="/works"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold transition-all duration-300 hover:scale-105 hover:-translate-y-1"
            style={{
              background: "var(--primary)",
              color: "#fff",
              boxShadow: "0 0 24px var(--primary-glow)",
            }}
          >
            View My Work
          </Link>
          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold transition-all duration-300 hover:scale-105 hover:-translate-y-1 glow-border"
            style={{ color: "var(--text)" }}
          >
            Get In Touch
          </a>
        </div>

        {/* Social links */}
        <div
          className="flex items-center justify-center gap-4"
          style={{ animation: "badge-reveal 0.6s ease 1.4s both", opacity: 0 }}
        >
          {[
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
              className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border)",
                color: "var(--text-muted)",
              }}
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity hover:opacity-80"
        style={{
          color: "var(--text-faint)",
          animation: "badge-reveal 0.6s ease 1.8s both",
          opacity: 0,
        }}
      >
        <span className="text-xs font-medium tracking-widest uppercase">
          Scroll
        </span>
        <ArrowDown
          size={16}
          style={{ animation: "float 2s ease-in-out infinite" }}
        />
      </a>
    </section>
  );
}
