"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type DayEntry = {
  date: string;
  mood: number;
  anxietyLevel: number;
};

const WEEKDAYS = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
const MONTH_NAMES = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

export default function MoodCalendar({
  year,
  month,
  entries,
}: {
  year: number;
  month: number;
  entries: DayEntry[];
}) {
  const entriesByDate = useMemo(() => {
    const map = new Map<string, DayEntry>();
    entries.forEach((e) => map.set(e.date, e));
    return map;
  }, [entries]);

  const { cells, todayStr } = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const startOffset = firstDay.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: (number | null)[] = [
      ...Array(startOffset).fill(null),
      ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];

    const today = new Date();
    const todayStr =
      today.getFullYear() === year && today.getMonth() === month
        ? String(today.getDate())
        : "";

    return { cells, todayStr };
  }, [year, month]);

  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;

  return (
    <div className="rounded-3xl bg-white/[0.07] backdrop-blur-xl border border-white/15 p-6 md:p-7 shadow-lg">
      <div className="flex items-center justify-between mb-5">
        <p className="font-semibold text-white">
          {MONTH_NAMES[month]} {year}
        </p>
        <div className="flex items-center gap-1">
          <Link
            href={`?year=${prevYear}&month=${prevMonth}`}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Bulan sebelumnya"
          >
            <ChevronLeft size={16} />
          </Link>
          <Link
            href={`?year=${nextYear}&month=${nextMonth}`}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Bulan berikutnya"
          >
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1.5 mb-2">
        {WEEKDAYS.map((d) => (
          <div key={d} className="text-center text-[11px] font-medium text-white/40 py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {cells.map((day, i) => {
          if (day === null) return <div key={`empty-${i}`} />;

          const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const entry = entriesByDate.get(dateKey);
          const isToday = String(day) === todayStr;
          const needsAttention = entry && (entry.mood <= 2 || entry.anxietyLevel >= 4);
          const hasEntry = !!entry;

          return (
            <div
              key={dateKey}
              className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-1 text-xs transition-colors ${
                isToday
                  ? "bg-primary/25 border border-primary/50 text-white font-semibold"
                  : "text-white/70 hover:bg-white/[0.05]"
              }`}
            >
              <span>{day}</span>
              {hasEntry && (
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    needsAttention ? "bg-dusk-light" : "bg-primary-light"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-4 mt-5 pt-4 border-t border-white/10 text-[11px] text-white/50">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-light" /> Check-in tercatat
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-dusk-light" /> Perlu dicermati
        </span>
      </div>
    </div>
  );
}
