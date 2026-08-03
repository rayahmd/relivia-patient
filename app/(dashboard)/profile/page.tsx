// app/(dashboard)/profile/page.tsx
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { logout } from "@/actions/auth";
import Image from "next/image";
import { LogOut } from "lucide-react";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const fullName = user.user_metadata?.full_name as string | undefined;
  const email = user.email as string | undefined;

  return (
    <div className="relative min-h-screen isolate">
      <div className="fixed inset-0 z-0">
        <img
          src="/image.gif"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-10 md:py-12">
        <h1 className="text-2xl font-bold text-white mb-8">Profil</h1>

        <div className="rounded-3xl bg-white/[0.07] backdrop-blur-xl border border-white/15 p-6 md:p-8 shadow-lg mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-2xl text-primary font-bold">
              {fullName ? fullName.charAt(0).toUpperCase() : (email ? email.charAt(0).toUpperCase() : "?")}
            </div>
            <div>
              <p className="text-lg font-semibold text-white">{fullName || "Pengguna"}</p>
              <p className="text-sm text-white/60">{email}</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white/[0.07] backdrop-blur-xl border border-white/15 p-6 md:p-8 shadow-lg">
          <h2 className="text-lg font-semibold text-white mb-4">Akun</h2>
          <form action={logout}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white bg-red-500/20 border border-red-400/30 hover:bg-red-500/30 transition-colors"
            >
              <LogOut size={16} />
              Keluar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
