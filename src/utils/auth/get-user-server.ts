import { createClient } from "~/utils/supabase/server";

export async function getUserServer() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    throw new Error("Unauthorized");
  }

  return data.user;
}
