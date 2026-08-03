// components/landing/hero.tsx
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] md:min-h-[110vh] overflow-hidden flex flex-col justify-center">
      {/* Latar Belakang gif Seamless Loop */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <img
          src="/image.gif"
          alt="Relivia"
          className="w-full h-full object-cover"
          style={{ objectPosition: "center 20%" }}
        />
      </div>

      {/* Gradien transisi halus ke background di bawahnya */}
      <div
        className="absolute inset-x-0 bottom-0 h-[65%] -z-10 pointer-events-none"
        style={{
          background: `linear-gradient(180deg,
      rgba(12,16,48,0) 0%,
      rgba(12,16,48,0) 8%,
      rgba(12,16,48,0.15) 28%,
      rgba(12,16,48,0.38) 44%,
      rgba(12,16,48,0.60) 56%,
      rgba(12,16,48,0.78) 67%,
      rgba(12,16,48,0.90) 77%,
      rgba(12,16,48,0.97) 87%,
      var(--background) 100%)`,
        }}
      />

      {/* Konten Utama Hero */}
      <div className="relative max-w-4xl mx-auto px-6 pt-32 pb-16 flex flex-col items-center text-center">
        {/* Brand Logo */}
        <div className="mb-8">
          <Image
            src="/logo.png"
            alt="Relivia"
            width={160}
            height={160}
            priority
            className="w-32 md:w-40 h-auto drop-shadow-lg"
          />
        </div>

        {/* Headline & Subheadline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight max-w-3xl leading-[1.15] mb-6 drop-shadow-md">
          Temukan Ketenangan dalam Setiap Catatan
        </h1>
        <p className="text-base md:text-lg text-foreground/80 max-w-xl leading-relaxed mb-10 drop-shadow-sm">
          Dokumentasikan perjalanan kesehatan mentalmu dalam 2 menit sehari. Relivia merangkum catatan harian menjadi insight siap pakai untuk sesi konsultasi psikiater dan psikolog Anda.
        </p>

        {/* CTA Button */}
        <div>
          <Link
            href="/login"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-medium text-foreground bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-sm transition-colors shadow-lg"
          >
            Daftar Sekarang
          </Link>
        </div>
      </div>
    </section>
  );
}