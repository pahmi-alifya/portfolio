"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Download, Briefcase, Code2, Building2 } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const stats = [
  { icon: Briefcase, label: "Years Experience", value: 5, suffix: "+" },
  { icon: Building2, label: "Companies", value: 7, suffix: "" },
  { icon: Code2, label: "Projects Built", value: 15, suffix: "+" },
];

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export function About() {
  const { ref, visible } = useInView();

  return (
    <section
      id="about"
      ref={ref}
      className="section-padding relative"
      style={{ background: "var(--bg-surface)" }}
    >
      {/* Subtle glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, var(--accent-glow) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Avatar + decoration */}
          <div
            className="flex justify-center"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-40px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <div className="relative">
              {/* Orbit rings */}
              <div
                className="absolute inset-0 rounded-full border opacity-30"
                style={{
                  width: "220px",
                  height: "220px",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  borderColor: "var(--primary)",
                  animation: "orbit-reverse 8s linear infinite",
                }}
              />
              <div
                className="absolute rounded-full border opacity-20"
                style={{
                  width: "280px",
                  height: "280px",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  borderColor: "var(--accent)",
                  animation: "orbit 12s linear infinite",
                  borderStyle: "dashed",
                }}
              />

              {/* Orbit dots */}
              <div
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background: "var(--primary)",
                  boxShadow: "0 0 8px var(--primary)",
                  top: "50%",
                  left: "50%",
                  marginTop: "-6px",
                  marginLeft: "-6px",
                  transformOrigin: "6px 6px",
                  animation: "orbit 8s linear infinite",
                  transform: "rotate(0deg) translateX(110px)",
                }}
              />
              <div
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: "var(--accent)",
                  boxShadow: "0 0 6px var(--accent)",
                  top: "50%",
                  left: "50%",
                  marginTop: "-4px",
                  marginLeft: "-4px",
                  transformOrigin: "4px 4px",
                  animation: "orbit-reverse 12s linear infinite",
                  transform: "rotate(180deg) translateX(140px)",
                }}
              />

              {/* Avatar — spinning gradient border + photo + glitch */}
              <div
                style={{
                  padding: "2px",
                  borderRadius: "18px",
                  background:
                    "conic-gradient(from var(--gradient-angle), var(--primary), var(--accent), var(--purple), var(--primary))",
                  animation:
                    "gradient-rotate 4s linear infinite, float 4s ease-in-out infinite",
                  boxShadow: "0 0 40px var(--primary-glow)",
                }}
              >
                <div
                  className="relative w-48 h-56 rounded-2xl overflow-hidden"
                  style={{ background: "var(--bg-card)" }}
                >
                  {/* Main photo */}
                  <Image
                    src="/avatar.png"
                    alt="Pahmi Alifya Bahri"
                    fill
                    className="object-cover object-top"
                    priority
                  />

                  {/* Glitch layer 1 — cyan split */}
                  <img
                    src="/avatar.png"
                    alt=""
                    aria-hidden
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    style={{
                      filter:
                        "saturate(0) sepia(1) hue-rotate(150deg) saturate(6) brightness(1.3)",
                      mixBlendMode: "screen",
                      animation: "photo-glitch-1 9s ease-in-out infinite",
                      opacity: 0,
                    }}
                  />

                  {/* Glitch layer 2 — magenta split */}
                  <img
                    src="/avatar.png"
                    alt=""
                    aria-hidden
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    style={{
                      filter:
                        "saturate(0) sepia(1) hue-rotate(300deg) saturate(6) brightness(1.3)",
                      mixBlendMode: "screen",
                      animation: "photo-glitch-2 9s ease-in-out infinite 0.5s",
                      opacity: 0,
                    }}
                  />

                  {/* Scanline overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(99,102,241,0.04) 2px, rgba(99,102,241,0.04) 4px)",
                    }}
                  />
                </div>
              </div>

              {/* Current company badge */}
              <div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--primary)",
                  color: "var(--primary)",
                  boxShadow: "0 0 12px var(--primary-glow)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-green-400"
                  style={{ boxShadow: "0 0 4px #4ade80" }}
                />
                Frontend Engineer @ Deeeplabs
              </div>
            </div>
          </div>

          {/* Right — text content */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(40px)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
            }}
          >
            <div className="section-badge">
              <span>About Me</span>
            </div>

            <h2
              className="section-title mb-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Crafting{" "}
              <span className="gradient-text">Digital Experiences</span>
            </h2>

            <div
              className="space-y-3 text-base leading-relaxed mb-8"
              style={{ color: "var(--text-muted)" }}
            >
              <p>
                I&apos;m a Frontend Engineer with 5+ years of experience
                building scalable, performant web and mobile applications.
                Currently working at{" "}
                <span style={{ color: "var(--text)", fontWeight: 600 }}>
                  Deeeplabs
                </span>
                , where I craft modern frontend solutions.
              </p>
              <p>
                My expertise spans across{" "}
                <span style={{ color: "var(--accent)" }}>React.js</span>,{" "}
                <span style={{ color: "var(--accent)" }}>Next.js</span>, and{" "}
                <span style={{ color: "var(--accent)" }}>React Native</span> —
                from building micro-frontends at scale to implementing real-time
                features with GraphQL and Firebase.
              </p>
              <p>
                I&apos;ve had the privilege of working at companies like{" "}
                <span style={{ color: "var(--text)", fontWeight: 600 }}>
                  eFishery
                </span>{" "}
                and{" "}
                <span style={{ color: "var(--text)", fontWeight: 600 }}>
                  RCTI+
                </span>
                , contributing to products used by millions across Indonesia.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {stats.map(({ icon: Icon, label, value, suffix }, i) => (
                <div
                  key={label}
                  className="card-surface p-4 text-center"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",
                    transition: `opacity 0.5s ease ${0.4 + i * 0.1}s, transform 0.5s ease ${0.4 + i * 0.1}s`,
                  }}
                >
                  <Icon
                    size={20}
                    className="mx-auto mb-2"
                    style={{ color: "var(--primary)" }}
                  />
                  <div
                    className="text-2xl font-bold"
                    style={{
                      fontFamily: "var(--font-space-grotesk)",
                      color: "var(--text)",
                    }}
                  >
                    <AnimatedCounter value={value} suffix={suffix} />
                  </div>
                  <div
                    className="text-xs mt-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="/cv.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105"
              style={{
                background: "var(--primary)",
                color: "#fff",
                boxShadow: "0 0 16px var(--primary-glow)",
              }}
            >
              <Download size={16} />
              Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
