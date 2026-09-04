import { ProgramAgendaSection } from "@/components/program/ProgramAgendaSection";
import type { ProgramAgenda } from "@/lib/types";

interface ProgramScheduleProps {
  agenda: ProgramAgenda;
}

export function ProgramSchedule({ agenda }: ProgramScheduleProps) {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0d1b2a] via-[#0a1628] to-[#0a0a0f] py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(0,158,219,0.12),_transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(201,162,39,0.08),_transparent_50%)]" />

        <div className="relative mx-auto max-w-5xl px-4 text-center lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold sm:text-sm">Run of show</p>
          <h1 className="heading-font mt-3 text-3xl leading-tight text-runway-white sm:mt-4 sm:text-5xl lg:text-6xl">
            {agenda.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/75 sm:mt-5 sm:text-xl">
            {agenda.summary}
          </p>
        </div>
      </section>

      <ProgramAgendaSection agenda={agenda} />
    </>
  );
}
