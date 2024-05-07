import { createClient } from "~/utils/supabase/client";

export async function getUserClient() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    throw new Error("Unauthorized");
  }

  return data.user;
}
