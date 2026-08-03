"use client";

import { useState } from "react";
import { Sparkles, FileText, Printer, Loader2 } from "lucide-react";

type InsightResult = {
  ringkasan_periode: string;
  highlight_tren: string[];
  poin_diskusi: string[];
  observations: { mood: number; sleep_hours: number; medication_taken: boolean }[];
};

export default function ConsultationPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [result, setResult] = useState<InsightResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleGenerate = async () => {
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/ai/insight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ days: 30 }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Terjadi kesalahan.");
        setStatus("error");
        return;
      }

      setResult(data);
      setStatus("done");
    } catch {
      setErrorMsg("Gagal terhubung ke server.");
      setStatus("error");
    }
  };

  const avgMood = result
    ? (
      result.observations.reduce((s, o) => s + o.mood, 0) /
      result.observations.length
    ).toFixed(1)
    : null;
  const avgSleep = result
    ? (
      result.observations.reduce((s, o) => s + o.sleep_hours, 0) /
      result.observations.length
    ).toFixed(1)
    : null;
  const medRate = result
    ? Math.round(
      (result.observations.filter((o) => o.medication_taken).length /
        result.observations.length) *
      100
    )
    : null;

  return (
    <div className="relative min-h-screen isolate print:min-h-0">
      {/* Background gif + overlay — sama pattern dengan Dashboard, disembunyikan saat print */}
      <div className="fixed inset-0 z-0 print:hidden">
        <img src="/image.gif" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-10 md:py-12 print:py-0 print:max-w-none">
        <div className="print:hidden">
          <h1 className="text-2xl font-bold text-white mb-1">
            AI Clinical Insight
          </h1>
          <p className="text-sm text-white/70 mb-8">
            Ringkasan netral dari catatanmu — untuk didiskusikan, bukan diagnosis.
          </p>
        </div>

        {status !== "done" && (
          <div className="print:hidden rounded-3xl bg-white/[0.07] backdrop-blur-xl border border-white/15 p-8 text-center shadow-lg">
            <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <Sparkles size={24} className="text-primary-light" />
            </div>
            <p className="text-sm text-white/70 mb-6 max-w-sm mx-auto leading-relaxed">
              Relivia akan merangkum 30 hari observasi terakhirmu menjadi
              laporan singkat yang siap dibawa ke sesi konsultasi.
            </p>

            {status === "error" && (
              <p className="text-sm text-red-300 mb-4">{errorMsg}</p>
            )}

            <button
              onClick={handleGenerate}
              disabled={status === "loading"}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-white bg-primary hover:bg-primary/90 disabled:opacity-60 transition-colors shadow-lg"
            >
              {status === "loading" ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Sparkles size={16} />
              )}
              {status === "loading"
                ? "Merangkum..."
                : "Generate Ringkasan Konsultasi"}
            </button>
          </div>
        )}

        {status === "done" && result && (
          <>
            <div className="rounded-3xl bg-white/[0.07] backdrop-blur-xl border border-white/15 p-6 md:p-8 shadow-lg print:border-0 print:bg-white print:p-0 print:shadow-none print:backdrop-blur-none">
              <div className="flex items-center gap-2 mb-6 print:mb-4">
                <FileText size={18} className="text-primary-light print:hidden" />
                <p className="font-semibold text-white text-lg print:text-black">
                  Ringkasan Konsultasi — 30 Hari Terakhir
                </p>
              </div>

              <div className="mb-5">
                <p className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-2 print:text-gray-500">
                  Ringkasan Observasi Periode
                </p>
                <p className="text-sm text-white/80 leading-relaxed print:text-black">
                  {result.ringkasan_periode}
                </p>
                <div className="flex gap-4 mt-3 text-xs text-white/60 print:text-gray-600">
                  <span>Rerata mood: {avgMood}/5</span>
                  <span>Rerata tidur: {avgSleep} jam</span>
                  <span>Kepatuhan obat: {medRate}%</span>
                </div>
              </div>

              <div className="mb-5">
                <p className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-2 print:text-gray-500">
                  Highlight Tren
                </p>
                <ul className="space-y-1.5">
                  {result.highlight_tren.map((point, i) => (
                    <li key={i} className="flex gap-2 text-sm text-white/80 leading-relaxed print:text-black">
                      <span className="text-primary-light print:text-black">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <p className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-2 print:text-gray-500">
                  Poin Diskusi untuk Psikolog/Psikiater
                </p>
                <ul className="space-y-1.5">
                  {result.poin_diskusi.map((point, i) => (
                    <li key={i} className="flex gap-2 text-sm text-white/80 leading-relaxed print:text-black">
                      <span className="text-dusk-light print:text-black">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-amber-500/15 border border-amber-300/30 px-4 py-3 print:bg-transparent print:border-amber-600 print:rounded-none">
                <p className="text-xs text-amber-100 leading-relaxed print:text-black">
                  Catatan: laporan ini bersifat observasional, bukan diagnosis
                  medis. Perubahan dosis atau rencana pengobatan tetap
                  ditentukan oleh dokter/psikiater yang menangani Anda.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}