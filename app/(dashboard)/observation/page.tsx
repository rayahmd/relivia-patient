"use client";

import { useState, useTransition } from "react";
import { createObservation } from "@/actions/observations";
import { Check, Leaf } from "lucide-react";

const MOODS = [
  { v: 1, e: "😔", label: "Berat" },
  { v: 2, e: "🙁", label: "Kurang baik" },
  { v: 3, e: "😐", label: "Biasa saja" },
  { v: 4, e: "🙂", label: "Cukup baik" },
  { v: 5, e: "😄", label: "Sangat baik" },
];

const SLEEP_QUALITY = ["Buruk", "Cukup", "Baik", "Sangat Baik"];

import PageTransition from "@/components/motion/page-transition";
import ScrollReveal from "@/components/motion/scroll-reveal";

export default function ObservationPage() {
  const [mood, setMood] = useState(3);
  const [anxiety, setAnxiety] = useState(3);
  const [quality, setQuality] = useState("Baik");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    formData.set("mood", String(mood));
    formData.set("anxiety_level", String(anxiety));
    formData.set("sleep_quality", quality);

    startTransition(async () => {
      const result = await createObservation(formData);
      if (result?.error) {
        setError(result.error);
      } else {
        setSaved(true);
        setError("");
        setTimeout(() => setSaved(false), 2400);
      }
    });
  };

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
          <h1 className="text-2xl font-bold text-foreground mb-1">
            Check-in Harian
          </h1>
          <p className="text-sm text-foreground/60 mb-8">
            Tidak perlu sempurna — cukup jujur dengan dirimu hari ini.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <form action={handleSubmit} className="rounded-[2rem] bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 md:p-8 space-y-8 shadow-[0_8px_32px_rgba(0,0,0,0.37)]">
        <div>
          <p className="text-sm font-semibold text-foreground mb-3">
            Bagaimana perasaanmu hari ini?
          </p>
          <div className="grid grid-cols-5 gap-1 md:gap-2.5">
            {MOODS.map((m) => (
              <button
                key={m.v}
                type="button"
                onClick={() => setMood(m.v)}
                className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-2xl border transition-all duration-300 ${
                  mood === m.v
                    ? "border-primary bg-primary/15 scale-105 shadow-[0_0_15px_rgba(42,175,212,0.15)] text-primary-light font-medium"
                    : "border-white/10 bg-white/[0.02] text-foreground/75 hover:bg-white/[0.05] hover:border-white/20 hover:text-white"
                }`}
              >
                <span className="text-2xl">{m.e}</span>
                <span className="text-[10px] text-foreground/60">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-semibold text-foreground">Tingkat kecemasan</p>
            <span className="text-sm text-primary font-semibold">{anxiety}/5</span>
          </div>
          <input
            type="range"
            min={1}
            max={5}
            value={anxiety}
            onChange={(e) => setAnxiety(Number(e.target.value))}
            className="w-full accent-primary"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-semibold text-foreground mb-2">Durasi tidur (jam)</p>
            <input
              name="sleep_hours"
              type="number"
              step="0.5"
              min={0}
              max={14}
              defaultValue={7}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-foreground outline-none focus:border-primary focus:bg-white/[0.06] transition-colors"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground mb-2">Kualitas tidur</p>
            <div className="flex flex-wrap gap-2">
              {SLEEP_QUALITY.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setQuality(q)}
                  className={`px-4 py-2 rounded-full text-xs font-medium border transition-all duration-200 ${
                    quality === q
                      ? "bg-primary/15 border-primary text-primary shadow-[0_0_12px_rgba(42,175,212,0.1)]"
                      : "border-white/10 text-foreground/60 bg-white/[0.02] hover:bg-white/[0.05] hover:text-foreground"
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>

        <label className="flex items-center gap-3 cursor-pointer select-none text-foreground/80 hover:text-foreground transition-colors">
          <input
            name="medication_taken"
            type="checkbox"
            defaultChecked
            className="w-5 h-5 rounded accent-primary bg-white/[0.03] border border-white/10 cursor-pointer"
          />
          <span className="text-sm">
            Saya minum obat sesuai jadwal hari ini
          </span>
        </label>

        <div>
          <p className="text-sm font-semibold text-foreground mb-2">Catatan harian</p>
          <textarea
            name="notes"
            rows={3}
            placeholder="Ceritakan hal kecil yang terjadi hari ini..."
            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-foreground placeholder:text-foreground/30 outline-none focus:border-primary focus:bg-white/[0.06] transition-all resize-none"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-background bg-primary hover:bg-primary/95 disabled:opacity-60 transition-all hover:scale-[1.02] shadow-lg shadow-primary/20 cursor-pointer"
          >
            <Leaf size={16} />
            {isPending ? "Menyimpan..." : "Simpan Observasi"}
          </button>
          {saved && (
            <span className="text-sm text-emerald-400 flex items-center gap-1.5 animate-fade-in font-medium">
              <Check size={15} className="text-emerald-400" /> Tersimpan
            </span>
          )}
        </div>
      </form>
      </ScrollReveal>
      </div>
    </div>
    </PageTransition>
  );
}
