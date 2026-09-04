import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SpeakerAgendaAppearance } from "@/lib/types";

const KIND_LABEL: Record<string, string> = {
  panel: "Panel",
  keynote: "Keynote",
  fireside: "Fireside",
  performance: "Performance",
  host: "Program",
  break: "Break",
  lunch: "Lunch",
};

function kindClass(kind: string) {
  if (kind === "keynote") return "bg-gold/15 text-gold border-gold/20";
  if (kind === "performance") return "bg-un-blue/15 text-un-blue border-un-blue/25";
  if (kind === "panel" || kind === "fireside") return "bg-white/8 text-white/75 border-white/10";
  return "bg-white/5 text-white/50 border-white/8";
}

function formatClock(value: string) {
  const [hRaw, mRaw] = value.split(":").map(Number);
  const hours = hRaw === 24 ? 24 : hRaw;
  const minutes = mRaw || 0;
  if (hours === 24) {
    return { primary: "12:00", period: "AM" };
  }
  const period = hours >= 12 ? "PM" : "AM";
  const h12 = hours % 12 || 12;
  return {
    primary: `${h12}:${minutes.toString().padStart(2, "0")}`,
    period,
  };
}

function SessionTime({ start, end }: { start: string; end: string }) {
  const from = formatClock(start);
  const to = formatClock(end);

  return (
    <div className="min-w-0 font-variant-numeric tabular-nums sm:min-w-[6.25rem]">
      <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
        <span className="text-base font-semibold tracking-tight text-white sm:text-lg">{from.primary}</span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-un-blue">{from.period}</span>
        <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/35 sm:hidden">–</span>
        <span className="text-sm font-medium tracking-tight text-white/55 sm:hidden">
          {to.primary}
          <span className="ml-1 text-[10px] font-semibold uppercase tracking-[0.14em]">{to.period}</span>
        </span>
      </div>
      <div className="mt-0.5 hidden items-baseline gap-1.5 text-white/40 sm:flex">
        <span className="text-[10px] font-medium uppercase tracking-[0.16em]">to</span>
        <span className="text-sm font-medium tracking-tight">{to.primary}</span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em]">{to.period}</span>
      </div>
    </div>
  );
}

function AppearanceCard({ appearance }: { appearance: SpeakerAgendaAppearance }) {
  const dayLabel =
    appearance.dayId === "palooza"
      ? `BitcoinPalooza · ${appearance.dateLabel}`
      : appearance.dayLabel;

  return (
    <Link
      href={`/program#session-${appearance.sessionId}`}
      className="group block min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-un-blue/40 hover:bg-un-blue/[0.06] sm:p-5"
    >
      <div className="flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:gap-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">{dayLabel}</p>
        <p className="inline-flex min-w-0 items-start gap-1.5 text-xs text-white/45">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-un-blue/80" />
          <span className="min-w-0 break-words sm:line-clamp-1">{appearance.venue}</span>
        </p>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-[6.5rem_1fr] sm:gap-5 lg:grid-cols-[7rem_1fr]">
        <SessionTime start={appearance.start} end={appearance.end} />

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em]",
                kindClass(appearance.kind)
              )}
            >
              {KIND_LABEL[appearance.kind] ?? appearance.kind}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35 transition group-hover:text-un-blue">
              View on program
              <ArrowUpRight className="h-3 w-3" />
            </span>
          </div>
          <h3 className="mt-2 break-words text-base font-semibold leading-snug text-white sm:text-lg">
            {appearance.title}
          </h3>
          {appearance.description ? (
            <p className="mt-2 text-sm leading-relaxed text-white/55 line-clamp-4 sm:line-clamp-3">
              {appearance.description}
            </p>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

export function SpeakerSessions({ appearances }: { appearances: SpeakerAgendaAppearance[] }) {
  if (appearances.length === 0) return null;

  return (
    <div className="mt-10 border-t border-white/10 pt-10 sm:mt-12 sm:pt-12">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3 sm:mb-6">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Run of show</p>
          <h2 className="heading-font mt-2 text-2xl text-white sm:text-3xl">Appearing at</h2>
        </div>
        <Link
          href="/program"
          className="shrink-0 text-sm font-medium text-un-blue transition hover:text-un-blue/80 hover:underline"
        >
          Full program
        </Link>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {appearances.map((appearance) => (
          <AppearanceCard key={appearance.sessionId} appearance={appearance} />
        ))}
      </div>
    </div>
  );
}
