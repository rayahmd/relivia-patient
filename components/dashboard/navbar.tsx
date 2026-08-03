// components/dashboard/navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { User, Menu, X } from "lucide-react";

const NAV = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/observation", label: "Check-in" },
  { href: "/consultation", label: "Konsultasi" },
  { href: "/timeline", label: "Timeline" },
];

export default function DashboardNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-white/10 bg-white/[0.02] backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 group"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo.png"
            alt="Relivia"
            width={100}
            height={100}
            priority
            className="object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1.5">
          <nav className="flex items-center gap-1">
            {NAV.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? "bg-white/10 text-white font-semibold shadow-sm"
                      : "text-foreground/75 hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <Link
            href="/profile"
            className={`p-2 rounded-full transition-all ${
              pathname === "/profile"
                ? "bg-white/10 text-white shadow-sm"
                : "text-foreground/75 hover:text-white hover:bg-white/[0.05]"
            }`}
          >
            <User size={18} />
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 -mr-2 text-white hover:bg-white/5 rounded-lg transition-colors"
          aria-label={open ? "Tutup menu" : "Buka menu"}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {open && (
        <div className="md:hidden px-6 pt-2 pb-6 flex flex-col gap-4 bg-white/[0.03] border-b border-white/10 backdrop-blur-2xl transition-all duration-300">
          {NAV.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-white/10 text-white font-semibold"
                    : "text-foreground/80 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              pathname === "/profile"
                ? "bg-white/10 text-white font-semibold"
                : "text-foreground/80 hover:text-white hover:bg-white/5"
            }`}
          >
            <User size={16} />
            <span>Profile</span>
          </Link>
        </div>
      )}
    </header>
  );
}