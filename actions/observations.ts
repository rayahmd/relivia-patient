"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createObservation(formData: FormData) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  const { error } = await supabase.from("observations").insert({
    user_id: user.id,
    mood: Number(formData.get("mood")),
    anxiety_level: Number(formData.get("anxiety_level")),
    sleep_hours: Number(formData.get("sleep_hours")),
    sleep_quality: formData.get("sleep_quality") as string,
    medication_taken: formData.get("medication_taken") === "on",
    notes: formData.get("notes") as string,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  revalidatePath("/timeline");
  return { success: true };
}
