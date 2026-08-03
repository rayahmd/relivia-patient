import { createClient } from "@/lib/supabase/server";

export type Observation = {
  id: string;
  user_id: string;
  mood: number;
  anxiety_level: number;
  sleep_hours: number;
  sleep_quality: string;
  medication_taken: boolean;
  notes: string | null;
  created_at: string;
};

export async function getObservations(limit = 30): Promise<Observation[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("observations")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("getObservations error:", error.message);
    return [];
  }

  return data ?? [];
}

export async function getObservationsInRange(
  start: string,
  end: string
): Promise<Observation[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("observations")
    .select("*")
    .eq("user_id", user.id)
    .gte("created_at", start)
    .lte("created_at", end)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("getObservationsInRange error:", error.message);
    return [];
  }

  return data ?? [];
}
