// app/layout.tsx
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Relivia — AI Mental Health Consultation Companion",
  description:
    "Dokumentasikan perjalanan kesehatan mentalmu dengan tenang. Relivia membantu merangkum observasi harian menjadi ringkasan yang siap dibawa ke sesi konsultasi.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={jakarta.variable}>
      <body className="font-sans bg-parchment text-ink antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}