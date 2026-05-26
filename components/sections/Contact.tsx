"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, Send, MapPin, Phone } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "@/components/ui/SocialIcons";

function useInView(threshold = 0.15) {
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

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "pahmi1998@gmail.com",
    href: "mailto:pahmi1998@gmail.com",
    color: "var(--primary)",
    glow: "var(--primary-glow)",
  },
  {
    icon: GithubIcon,
    label: "GitHub",
    value: "github.com/pahmi-alifya",
    href: "https://github.com/pahmi-alifya",
    color: "var(--accent)",
    glow: "var(--accent-glow)",
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: "pahmi-alifya-bahri",
    href: "https://www.linkedin.com/in/pahmi-alifya-bahri-479a0919a/",
    color: "var(--purple)",
    glow: "var(--purple-glow)",
  },
];

export function Contact() {
  const { ref, visible } = useInView();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  return (
    <section
      id="contact"
      ref={ref}
      className="section-padding"
      style={{ background: "var(--bg)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, var(--primary-glow) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div
          className="text-center mb-12"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div className="section-badge mx-auto inline-flex">Contact</div>
          <h2
            className="section-title"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Let&apos;s <span className="gradient-text">Work Together</span>
          </h2>
          <p
            className="mt-3 max-w-xl mx-auto text-base"
            style={{ color: "var(--text-muted)" }}
          >
            Have a project in mind or want to chat? I&apos;m always open to new
            opportunities.
          </p>
        </div>

        <div className="grid lg:grid-cols-1 gap-10 items-start">
          {/* Left — contact info */}
          <div
            className="space-y-5"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-30px)",
              transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
            }}
          >
            <div className="space-y-4">
              {contactLinks.map(
                ({ icon: Icon, label, value, href, color, glow }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group glow-border"
                    style={{ background: "var(--bg-card)" }}
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                      style={{ background: glow, border: `1px solid ${color}` }}
                    >
                      <Icon size={20} style={{ color }} />
                    </div>
                    <div>
                      <div
                        className="text-xs font-semibold uppercase tracking-wider mb-0.5"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {label}
                      </div>
                      <div
                        className="text-sm font-medium"
                        style={{ color: "var(--text)" }}
                      >
                        {value}
                      </div>
                    </div>
                  </a>
                ),
              )}
            </div>

            {/* Location + Phone */}
            <div className="card-surface p-4 space-y-3">
              <div
                className="flex items-center gap-3 text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                <MapPin
                  size={16}
                  style={{ color: "var(--primary)", flexShrink: 0 }}
                />
                Bogor, West Java, Indonesia
              </div>
              <div
                className="flex items-center gap-3 text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                <Phone
                  size={16}
                  style={{ color: "var(--primary)", flexShrink: 0 }}
                />
                +62 858-1397-3559
              </div>
            </div>
          </div>

          {/* Right — form */}
          {/* <div
            className="card-surface p-6"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(30px)',
              transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
            }}
          >
            <h3 className="text-base font-semibold mb-5" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text)' }}>
              Send a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                { id: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
              ].map(({ id, label, type, placeholder }) => (
                <div key={id}>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-muted)' }}>
                    {label}
                  </label>
                  <input
                    type={type}
                    value={form[id as 'name' | 'email']}
                    onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
                    placeholder={placeholder}
                    required
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-200"
                    style={{
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                    }}
                    onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; e.target.style.boxShadow = '0 0 0 3px var(--primary-glow)' }}
                    onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
                  />
                </div>
              ))}

              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-muted)' }}>
                  Message
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Tell me about your project..."
                  required
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none transition-all duration-200"
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; e.target.style.boxShadow = '0 0 0 3px var(--primary-glow)' }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-300 disabled:opacity-70"
                style={{
                  background: status === 'sent' ? '#4ade80' : 'var(--primary)',
                  color: '#fff',
                  boxShadow: '0 0 16px var(--primary-glow)',
                }}
              >
                {status === 'sending' ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : status === 'sent' ? (
                  '✓ Message Sent!'
                ) : (
                  <>
                    <Send size={15} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div> */}
        </div>
      </div>
    </section>
  );
}
