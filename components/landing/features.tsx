// components/landing/features.tsx
import { CalendarClock, Sparkles, FileText } from "lucide-react";

const FEATURES = [
  {
    icon: CalendarClock,
    title: "Daily Check-in ≤ 2 Menit",
    desc: "Cukup beberapa sentuhan untuk mencatat mood, tingkat kecemasan, tidur, dan kepatuhan minum obat harianmu.",
    tint: "primary" as const,
  },
  {
    icon: Sparkles,
    title: "AI Clinical Insight",
    desc: "Relivia merangkum pola dari catatanmu jadi insight yang netral dan mudah dipahami — tanpa diagnosis.",
    tint: "dusk" as const,
  },
  {
    icon: FileText,
    title: "Laporan Siap Konsultasi",
    desc: "Satu halaman ringkas untuk dibawa ke dokter atau psikolog, tanpa perlu menjelaskan ulang dari awal.",
    tint: "primary" as const,
  },
];

export default function Features() {
  return (
    <section id="fitur" className="max-w-6xl mx-auto px-6 py-20 md:py-28">
      <div className="text-center max-w-xl mx-auto mb-16">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
          Fitur Utama
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
          Semua yang Anda butuhkan, satu tempat tenang
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-10 md:gap-14">
        {FEATURES.map((f) => (
          <div className="text-center md:text-left">
            <f.icon
              size={26}
              strokeWidth={1.75}
              className={`mx-auto md:mx-0 ${f.tint === "primary" ? "text-primary" : "text-dusk"
                }`}
            />
            <h3 className="font-bold text-lg text-foreground mt-4 mb-2">
              {f.title}
            </h3>
            <p className="text-sm text-foreground/65 leading-relaxed">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}