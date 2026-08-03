import Link from "next/link";

export default function Footer() {
  return (
    <footer id="tentang" className="border-t border-fog/60">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-foreground/60 text-center md:text-left">
          © {new Date().getFullYear()} Relivia. Teman pendamping observasi,
          bukan pengganti tenaga profesional.
        </p>
        <div className="flex gap-6 text-sm text-foreground/60">
          <Link href="/privacy" className="hover:text-foreground">
            Privasi
          </Link>
          <Link href="/terms" className="hover:text-foreground">
            Ketentuan
          </Link>
        </div>
      </div>
    </footer>
  );
}