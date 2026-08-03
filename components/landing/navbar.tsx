// components/landing/navbar.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
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
          {NAV_LINKS.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="text-sm text-white/85 hover:text-white transition-colors"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.06, duration: 0.35, ease: "easeOut" }}
              whileHover={{ y: -1 }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        <div className="hidden md:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.35, ease: "easeOut" }}
          >
            <Link
              href="/login"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-medium text-white bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-sm transition-colors shadow-lg"
            >
              Daftar Sekarang
            </Link>
          </motion.div>
        </div>

        {/* Mobile Toggle Button */}
        <motion.button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 -mr-2 text-white transition-colors"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          whileTap={{ scale: 0.97 }}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </motion.button>
      </nav>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden px-6"
          >
            <div className="pt-2 pb-6 flex flex-col gap-5 bg-transparent backdrop-blur-md">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm text-white/90 hover:text-white transition-colors py-1 font-medium"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.2 }}
              >
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-full text-sm font-medium text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm transition-colors mt-2"
                >
                  Daftar Sekarang
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}