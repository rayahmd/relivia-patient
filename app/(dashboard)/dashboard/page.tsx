// app/(dashboard)/dashboard/page.tsx
import { getObservations, getObservationsInRange } from "@/services/observations";
import { createClient } from "@/lib/supabase/server";
import { Moon, Pill, TrendingUp, ArrowRight, Sparkles } from "lucide-react";
import TrendChart from "@/components/dashboard/trend-chart";
import MoodCalendar from "@/components/dashboard/mood-calendar";
import Link from "next/link";

const MOODS = [
  { v: 1, e: "😔", label: "Berat" },
  { v: 2, e: "🙁", label: "Kurang baik" },
  { v: 3, e: "😐", label: "Biasa saja" },
  { v: 4, e: "🙂", label: "Cukup baik" },
  { v: 5, e: "😄", label: "Sangat baik" },
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 11) return "Selamat pagi";
  if (hour < 15) return "Selamat siang";
  if (hour < 18) return "Selamat sore";
  return "Selamat malam";
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ year?: string; month?: string }>;
}) {
  const params = await searchParams;
  const now = new Date();
  const year = params.year ? Number(params.year) : now.getFullYear();
  const month = params.month ? Number(params.month) : now.getMonth();

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const firstName = (user?.user_metadata?.full_name as string | undefined)?.split(" ")[0];

  const observations = await getObservations(7);
  const latest = observations[0];

  const monthStart = new Date(year, month, 1).toISOString();
  const monthEnd = new Date(year, month + 1, 0, 23, 59, 59).toISOString();
  const monthObservations = await getObservationsInRange(monthStart, monthEnd);

  const calendarEntries = monthObservations.map((o) => {
    const d = new Date(o.created_at);
    return {
      date: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
      mood: o.mood,
      anxietyLevel: o.anxiety_level,
    };
  });

  if (!observations.length) {
    return (
      <div className="relative min-h-screen isolate">
        <div className="fixed inset-0 z-0">
          <img src="/image.gif" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-16">
          <div className="rounded-[2rem] bg-white/[0.06] backdrop-blur-xl border border-white/15 p-10 md:p-14 text-center shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-5">
              <Sparkles size={24} className="text-primary animate-pulse" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              {getGreeting()}{firstName ? `, ${firstName}` : ""}
            </h1>
            <p className="text-sm text-white/70 mb-7 max-w-sm mx-auto leading-relaxed">
              Belum ada catatan di sini. Mulai dari check-in pertamamu untuk
              melihat tren mood dan tidurmu dari waktu ke waktu.
            </p>
            <Link
              href="/observation"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-background bg-primary hover:bg-primary/95 transition-all hover:scale-[1.02] shadow-lg shadow-primary/20"
            >
              Isi Check-in Pertama
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const chartData = [...observations].reverse().map((o) => ({
    day: new Date(o.created_at).toLocaleDateString("id-ID", { weekday: "short" }),
    Mood: o.mood,
    Tidur: o.sleep_hours,
  }));

  const moodInfo = MOODS.find((m) => m.v === latest.mood);
  const avgMood = (
    observations.reduce((s, o) => s + o.mood, 0) / observations.length
  ).toFixed(1);

  return (
    <div className="relative min-h-screen isolate">
      {/* Background gif + overlay — SATU wrapper aja, nggak duplikat lagi */}
      <div className="fixed inset-0 z-0">
        <img src="/image.gif" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-10 md:py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-sm text-primary-light font-medium mb-1.5">
              {getGreeting()}{firstName ? `, ${firstName}` : ""}
            </p>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight drop-shadow-sm">
              Semoga harimu terasa ringan 🌿
            </h1>
          </div>
          <Link
            href="/observation"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-white bg-primary hover:bg-primary/90 transition-colors shrink-0 shadow-lg"
          >
            Check-in Hari Ini
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Hero mood card + 2 stat cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="md:col-span-1 rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-6 text-background shadow-lg shadow-primary/25 flex flex-col justify-between hover:scale-[1.01] transition-transform duration-300">
            <p className="text-xs text-background/75 font-semibold mb-3">Mood Hari Ini</p>
            <div>
              <span className="text-5xl block mb-2">{moodInfo?.e}</span>
              <span className="text-sm font-bold text-background">{moodInfo?.label}</span>
            </div>
            <p className="text-[11px] text-background/60 mt-4 font-medium">
              Rerata 7 hari: {avgMood}/5
            </p>
          </div>

          <div className="rounded-3xl bg-white/[0.07] backdrop-blur-xl border border-white/15 p-6 hover:border-primary/40 hover:bg-white/[0.1] transition-all duration-300 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center mb-3">
              <Moon size={18} className="text-primary-light" />
            </div>
            <p className="text-xs text-white/60 mb-1.5 font-medium">Tidur Semalam</p>
            <p className="text-2xl font-bold text-white">
              {latest.sleep_hours}
              <span className="text-sm font-normal text-white/50"> jam</span>
            </p>
            <p className="text-xs text-white/70 mt-1 font-medium">{latest.sleep_quality}</p>
          </div>

          <div className="rounded-3xl bg-white/[0.07] backdrop-blur-xl border border-white/15 p-6 hover:border-dusk/40 hover:bg-white/[0.1] transition-all duration-300 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-dusk/20 flex items-center justify-center mb-3">
              <Pill size={18} className="text-dusk-light" />
            </div>
            <p className="text-xs text-white/60 mb-1.5 font-medium">Kepatuhan Obat</p>
            <p className="text-lg font-bold text-white">
              {latest.medication_taken ? "Diminum" : "Belum tercatat"}
            </p>
            <p className="text-xs text-white/70 mt-1 font-medium">Hari ini</p>
          </div>
        </div>

        {/* Kalender + Chart, sejajar di desktop */}
        <div className="grid lg:grid-cols-2 gap-4 mb-6">
          <MoodCalendar year={year} month={month} entries={calendarEntries} />

          <div className="rounded-3xl bg-white/[0.07] backdrop-blur-xl border border-white/15 p-6 md:p-7 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center">
                  <TrendingUp size={16} className="text-primary-light" />
                </div>
                <p className="font-semibold text-white">Tren 7 Hari Terakhir</p>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-xs text-white/60">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary" /> Mood
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-dusk" /> Tidur
                </span>
              </div>
            </div>
            <TrendChart data={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
}