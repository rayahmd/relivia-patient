import { getObservations } from "@/services/observations";
import { Moon, Pill, Wind } from "lucide-react";

const MOODS = [
  { v: 1, e: "😔" }, { v: 2, e: "🙁" }, { v: 3, e: "😐" },
  { v: 4, e: "🙂" }, { v: 5, e: "😄" },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

import PageTransition from "@/components/motion/page-transition";
import ScrollReveal from "@/components/motion/scroll-reveal";

export default async function TimelinePage() {
  const observations = await getObservations();

  return (
    <PageTransition>
      <div className="relative min-h-screen isolate">
      {/* Background layer */}
      <div className="fixed inset-0 z-0">
        <img
          src="/image.gif"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative max-w-2xl mx-auto px-6 py-10 z-10">
        <ScrollReveal>
          <h1 className="text-2xl font-bold text-white mb-1 drop-shadow-sm">Timeline</h1>
          <p className="text-sm text-white/60 mb-8">
            Jejak langkah harianmu, dari hari ke hari.
          </p>
        </ScrollReveal>

        {observations.length === 0 ? (
          <ScrollReveal delay={0.1}>
            <div className="rounded-[2rem] bg-white/[0.03] backdrop-blur-xl border border-white/10 p-10 text-center shadow-lg">
              <p className="text-sm text-white/60">
                Belum ada catatan. Yuk isi check-in pertamamu.
              </p>
            </div>
          </ScrollReveal>
        ) : (
          <ScrollReveal delay={0.1}>
            <div className="relative pl-6 border-l-2 border-white/10 space-y-5">
            {observations.map((o) => (
              <div key={o.id} className="relative">
                <span className="absolute -left-[31px] top-2 w-3.5 h-3.5 rounded-full bg-primary ring-4 ring-[#0C1030]" />
                <div className="rounded-3xl bg-white/[0.07] backdrop-blur-xl border border-white/15 p-5 shadow-lg hover:bg-white/[0.1] hover:border-primary/40 transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-white">
                      {formatDate(o.created_at)}
                    </p>
                    <span className="text-2xl">
                      {MOODS.find((m) => m.v === o.mood)?.e}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs text-white/60 mb-2">
                    <span className="flex items-center gap-1">
                      <Moon size={13} className="text-primary-light" /> {o.sleep_hours} jam · {o.sleep_quality}
                    </span>
                    <span className="flex items-center gap-1">
                      <Pill size={13} className="text-dusk-light" /> {o.medication_taken ? "Obat diminum" : "Belum tercatat"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Wind size={13} className="text-primary-light" /> Cemas {o.anxiety_level}/5
                    </span>
                  </div>
                  {o.notes && (
                    <p className="text-sm text-white/80 italic leading-relaxed pl-2 border-l border-white/15">
                      &ldquo;{o.notes}&rdquo;
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          </ScrollReveal>
        )}
      </div>
    </div>
    </PageTransition>
  );
}
