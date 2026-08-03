// components/landing/cta-section.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CtaSection() {
  return (
    <section id="cara-kerja" className="px-6 py-20 md:py-28">
      <div className="max-w-4xl mx-auto rounded-[2.5rem] bg-violet/95 px-8 py-16 md:py-20 text-center relative overflow-hidden shadow-2xl shadow-violet/20">
        <div
          className="absolute inset-0 opacity-25 blur-sm"
          style={{
            background:
              "radial-gradient(circle at 15% 15%, var(--color-violet-light) 0%, transparent 55%), radial-gradient(circle at 85% 85%, var(--color-dusk) 0%, transparent 55%)",
          }}
        />
        <div className="relative flex flex-col items-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white max-w-lg leading-snug tracking-tight">
            Mulai dokumentasikan perjalanan Anda hari ini
          </h2>
          <p className="mt-4 text-white/85 max-w-md text-sm md:text-base leading-relaxed">
            Dua menit sehari, untuk sesi konsultasi yang lebih terarah dan bermakna esok hari.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4">
            <Link
              href="/login"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-medium text-violet bg-white hover:bg-white/95 hover:scale-[1.02] transition-all duration-200 shadow-xl"
            >
              Daftar Sekarang
              <ArrowRight size={17} className="ml-1" />
            </Link>
            <span className="text-xs text-white/60 max-w-xs leading-relaxed">
              *Teman pendamping observasi, bukan pengganti tenaga profesional.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}