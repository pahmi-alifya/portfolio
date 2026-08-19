"use client";

import { useGitHub } from "@/hooks/useGitHub";
import { useInView } from "@/hooks/useInView";
import { GithubIcon } from "@/components/ui/SocialIcons";
import { TiltCard } from "@/components/ui/TiltCard";
import {
  CONTRIBUTION_CELL_GAP,
  CONTRIBUTION_CELL_SIZE,
  CONTRIBUTION_WEEKDAY_LABELS,
} from "@/constants/contributions";
import {
  buildContributionWeeks,
  computeContributionMonthLabels,
  computeContributionStreaks,
  formatContributionDate,
  levelColor,
} from "@/lib/contributions";

function ContributionStat({
  value,
  range,
  caption,
}: {
  value: string;
  range: string;
  caption: string;
}) {
  return (
    <div className="text-center px-2">
      <p
        className="text-xl sm:text-2xl font-bold"
        style={{
          fontFamily: "var(--font-space-grotesk)",
          color: "var(--text)",
        }}
      >
        {value}
      </p>
      <p className="text-xs mt-1" style={{ color: "var(--text-faint)" }}>
        {range}
      </p>
      <p
        className="text-xs font-semibold mt-2 uppercase tracking-wider"
        style={{ color: "var(--text-muted)" }}
      >
        {caption}
      </p>
    </div>
  );
}

function streakRange(
  { start, end }: { start: string | null; end: string | null },
  fallback: string,
) {
  return start && end
    ? `${formatContributionDate(start)} – ${formatContributionDate(end)}`
    : fallback;
}

export function Projects() {
  const { data, isLoading } = useGitHub();
  const { ref, visible } = useInView();

  const days = data?.contributions.days ?? [];
  const total = data?.contributions.total ?? 0;
  const weeks = buildContributionWeeks(days);
  const monthLabels = computeContributionMonthLabels(weeks);
  const { longest, current } = computeContributionStreaks(days);

  return (
    <section
      id="contributions"
      ref={ref}
      className="section-padding"
      style={{ background: "var(--bg)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 50%, var(--purple-glow) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div
          className="text-center mb-12"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div className="section-badge mx-auto inline-flex">Activity</div>
          <h2
            className="section-title"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            GitHub <span className="gradient-text">Contributions</span>
          </h2>
          <p
            className="mt-3 max-w-xl mx-auto text-base"
            style={{ color: "var(--text-muted)" }}
          >
            My contribution activity over the last year — hover a day to see
            details.
          </p>
        </div>

        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          }}
        >
          <TiltCard maxTilt={4} radius="12px">
            <div className="card-surface p-6 lg:w-max w-full justify-self-center">
              {isLoading ? (
                <div
                  className="h-48"
                  style={{ animation: "glow-pulse 1.5s ease infinite" }}
                />
              ) : !days.length ? (
                <p
                  className="text-center py-10 text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  No contribution activity found.
                </p>
              ) : (
                <>
                  <div className="pb-1">
                    <p
                      className="text-sm font-medium mb-4"
                      style={{ color: "var(--text)" }}
                    >
                      {total.toLocaleString()} contributions in the last year
                    </p>

                    <div className="flex gap-2 overflow-x-auto -mx-6 px-6 pb-1 lg:overflow-visible lg:mx-0 lg:px-0 lg:pb-0">
                      {/* Weekday labels */}
                      <div
                        className="flex flex-col shrink-0"
                        style={{ gap: CONTRIBUTION_CELL_GAP, marginTop: 16 }}
                      >
                        {CONTRIBUTION_WEEKDAY_LABELS.map((label, i) => (
                          <span
                            key={i}
                            className="text-[12px] leading-none"
                            style={{
                              height: CONTRIBUTION_CELL_SIZE,
                              color: "var(--text-faint)",
                            }}
                          >
                            {label}
                          </span>
                        ))}
                      </div>

                      <div className="shrink-0">
                        {/* Month labels */}
                        <div
                          className="flex"
                          style={{ gap: CONTRIBUTION_CELL_GAP, height: 14 }}
                        >
                          {monthLabels.map((label, i) => (
                            <span
                              key={i}
                              className="text-[12px] leading-none"
                              style={{
                                width: CONTRIBUTION_CELL_SIZE,
                                color: "var(--text-faint)",
                              }}
                            >
                              {label}
                            </span>
                          ))}
                        </div>

                        {/* Grid */}
                        <div
                          className="flex"
                          style={{ gap: CONTRIBUTION_CELL_GAP }}
                        >
                          {weeks.map((week, wi) => (
                            <div
                              key={wi}
                              className="flex flex-col"
                              style={{ gap: CONTRIBUTION_CELL_GAP }}
                            >
                              {week.map((day, di) => (
                                <div
                                  key={di}
                                  className="group relative"
                                  style={{
                                    width: CONTRIBUTION_CELL_SIZE,
                                    height: CONTRIBUTION_CELL_SIZE,
                                  }}
                                  aria-label={
                                    day
                                      ? `${day.count} contribution${day.count === 1 ? "" : "s"} on ${formatContributionDate(day.date)}`
                                      : undefined
                                  }
                                >
                                  <div
                                    className="w-full h-full rounded-xs transition-transform duration-150 group-hover:scale-125"
                                    style={{
                                      background: levelColor(day?.level),
                                    }}
                                  />
                                  {day && (
                                    <div className="pointer-events-none absolute left-1/2 bottom-full z-20 mb-2 -translate-x-1/2 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                                      <div
                                        className="whitespace-nowrap rounded-md px-2.5 py-1.5 text-xs font-medium shadow-lg"
                                        style={{
                                          background: "var(--text)",
                                          color: "var(--bg)",
                                        }}
                                      >
                                        <strong>{day.count}</strong>{" "}
                                        contribution
                                        {day.count === 1 ? "" : "s"} on{" "}
                                        {formatContributionDate(day.date)}
                                      </div>
                                      <div
                                        className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent"
                                        style={{
                                          borderTopColor: "var(--text)",
                                        }}
                                      />
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>

                        {/* Legend */}
                        <div
                          className="flex items-center justify-end gap-1.5 mt-3 text-[10px]"
                          style={{ color: "var(--text-faint)" }}
                        >
                          <span>Less</span>
                          {[0, 1, 2, 3, 4].map((level) => (
                            <div
                              key={level}
                              style={{
                                width: CONTRIBUTION_CELL_SIZE,
                                height: CONTRIBUTION_CELL_SIZE,
                                borderRadius: 2,
                                background: levelColor(level),
                              }}
                            />
                          ))}
                          <span>More</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Streak stats */}
                  <div
                    className="grid grid-cols-3 gap-2 mt-6 pt-6 border-t"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <ContributionStat
                      value={`${total.toLocaleString()} Total`}
                      range={streakRange(
                        {
                          start: days[0]?.date ?? null,
                          end: days[days.length - 1]?.date ?? null,
                        },
                        "",
                      )}
                      caption="Year of Contributions"
                    />
                    <ContributionStat
                      value={`${longest.length} ${longest.length === 1 ? "day" : "days"}`}
                      range={streakRange(longest, "No streak yet")}
                      caption="Longest Streak"
                    />
                    <ContributionStat
                      value={`${current.length} ${current.length === 1 ? "day" : "days"}`}
                      range={streakRange(current, "No active streak")}
                      caption="Current Streak"
                    />
                  </div>
                </>
              )}
            </div>
          </TiltCard>
        </div>

        {/* View all */}
        <div className="text-center mt-10">
          <a
            href="https://github.com/pahmi-alifya"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 glow-border"
            style={{ color: "var(--text)" }}
          >
            <GithubIcon size={16} />
            View All on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
