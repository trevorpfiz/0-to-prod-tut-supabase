"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { action } from "~/lib/safe-action";
import { SignInSchema, SignUpSchema } from "~/lib/validators";
import { createClient } from "~/utils/supabase/server";

export const signInWithPassword = action(
  SignInSchema,
  async ({ email, password }) => {
    const supabase = createClient();

    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }
    return data.user;
  },
);

export const signUp = action(SignUpSchema, async ({ email, password }) => {
  const supabase = createClient();
  const origin = headers().get("origin");

  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/confirm`,
    },
  });

  if (error) {
    throw error;
  }
  return data.user;
});

export const signInWithGithub = async () => {
  const origin = headers().get("origin");
  const supabase = createClient();

  const res = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: { redirectTo: `${origin}/auth/callback` },
  });

  if (res.data.url) {
    redirect(res.data.url);
  }
  throw res.error;
};

export const signInWithGoogle = async () => {
  const origin = headers().get("origin");
  const supabase = createClient();

  const res = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${origin}/auth/callback` },
  });

  if (res.data.url) {
    redirect(res.data.url);
  }
  throw res.error;
};

export const signOut = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/");
};
