// components/landing/navbar.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Fitur", href: "#fitur" },
  { label: "Cara Kerja", href: "#cara-kerja" },
  { label: "Tentang", href: "#tentang" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-background/20 backdrop-blur-md border-b border-white/10 shadow-sm"
          : "bg-transparent border-b border-transparent"
        }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-28 flex items-center justify-center">
            <Image src="/logo.png" alt="Logo" width={120} height={40} />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/85 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <Link
            href="/login"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-medium text-white bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-sm transition-colors shadow-lg"
          >
            Daftar Sekarang
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 -mr-2 text-white transition-colors"
          aria-label={open ? "Tutup menu" : "Buka menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Navigation Dropdown */}
      {open && (
        <div className="md:hidden px-6 pt-2 pb-6 flex flex-col gap-5 bg-transparent backdrop-blur-md transition-all duration-300">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm text-white/90 hover:text-white transition-colors py-1 font-medium"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-full text-sm font-medium text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm transition-colors mt-2"
          >
            Daftar Sekarang
          </Link>
        </div>
      )}
    </header>
  );
}