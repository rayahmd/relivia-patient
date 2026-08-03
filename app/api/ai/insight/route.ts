import { createClient } from "@/lib/supabase/server";
import { ai } from "@/lib/gemini";
import { NextResponse } from "next/server";

const SYSTEM_INSTRUCTION = `Kamu adalah asisten yang membantu merangkum data observasi kesehatan mental harian menjadi ringkasan yang netral dan terstruktur, untuk dibawa ke sesi konsultasi dengan psikolog/psikiater.

ATURAN KETAT — JANGAN PERNAH:
- Mendiagnosis kondisi apa pun (contoh: jangan sebut "depresi", "anxiety disorder", dsb)
- Menyatakan atau menyiratkan pasien mengalami relapse
- Menyarankan perubahan dosis obat atau jenis obat
- Menggantikan peran psikolog/psikiater dalam pengambilan keputusan klinis
- Menggunakan bahasa yang menghakimi atau alarming

YANG BOLEH DILAKUKAN:
- Merangkum pola dari data (tren mood, tidur, kecemasan, kepatuhan obat)
- Membandingkan periode (misal minggu pertama vs kedua)
- Menyoroti perubahan yang signifikan secara observasional
- Menyusun poin diskusi netral untuk dibawa ke sesi konsultasi

GAYA BAHASA:
Gunakan kalimat observasional seperti "Terlihat penurunan durasi tidur rerata pada minggu kedua" atau "Poin ini dapat menjadi bahan diskusi bersama dokter/psikolog Anda." Bahasa Indonesia, formal tapi hangat.

FORMAT OUTPUT — WAJIB JSON, tanpa markdown/backtick, dengan struktur persis:
{
  "ringkasan_periode": "string, 2-3 kalimat",
  "highlight_tren": ["string poin 1", "string poin 2", ...],
  "poin_diskusi": ["string poin 1", "string poin 2", ...]
}`;

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { days = 30 } = await request.json().catch(() => ({}));

  const since = new Date();
  since.setDate(since.getDate() - days);

  const { data: observations, error: fetchError } = await supabase
    .from("observations")
    .select("*")
    .eq("user_id", user.id)
    .gte("created_at", since.toISOString())
    .order("created_at", { ascending: true });

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  if (!observations || observations.length === 0) {
    return NextResponse.json(
      { error: "Belum ada data observasi pada periode ini." },
      { status: 400 }
    );
  }

  const dataSummary = observations
    .map(
      (o) =>
        `${new Date(o.created_at).toLocaleDateString("id-ID")}: mood ${o.mood}/5, kecemasan ${o.anxiety_level}/5, tidur ${o.sleep_hours} jam (${o.sleep_quality}), obat ${o.medication_taken ? "diminum" : "tidak tercatat"}${o.notes ? `, catatan: "${o.notes}"` : ""}`
    )
    .join("\n");

  const prompt = `Berikut data observasi harian pasien selama ${days} hari terakhir:\n\n${dataSummary}\n\nBuatkan ringkasan sesuai format yang ditentukan.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.4,
        responseMimeType: "application/json",
      },
    });

    const text = response.text ?? "";
    const parsed = JSON.parse(text);

    const { data: insight, error: insertError } = await supabase
      .from("clinical_insights")
      .insert({
        user_id: user.id,
        summary: parsed.ringkasan_periode,
        recommendation: JSON.stringify({
          highlight_tren: parsed.highlight_tren,
          poin_diskusi: parsed.poin_diskusi,
        }),
        period_start: since.toISOString().split("T")[0],
        period_end: new Date().toISOString().split("T")[0],
      })
      .select()
      .single();

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({
      ringkasan_periode: parsed.ringkasan_periode,
      highlight_tren: parsed.highlight_tren,
      poin_diskusi: parsed.poin_diskusi,
      observations,
      insightId: insight.id,
    });
  } catch (err) {
    console.error("Gemini insight error:", err);
    return NextResponse.json(
      { error: "Gagal menghasilkan ringkasan. Coba lagi." },
      { status: 500 }
    );
  }
}
