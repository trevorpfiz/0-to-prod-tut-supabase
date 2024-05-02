import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import {
  DEFAULT_LOGIN_REDIRECT,
  authRoutes,
  protectedRoutes,
} from "~/config/routes";
import { env } from "~/env";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    },
  );

  // Get user
  const { data, error } = await supabase.auth.getUser();

  // Check if protected route
  const isProtectedRoute = protectedRoutes.includes(request.nextUrl.pathname);

  if (isProtectedRoute && (error ?? !data.user)) {
    const url = new URL("/signin", request.url);
    return NextResponse.redirect(url);
  }

  // Forward authed user to dashboard
  const isAuthRoute = authRoutes.includes(request.nextUrl.pathname);

  if (isAuthRoute && data.user) {
    const url = new URL(DEFAULT_LOGIN_REDIRECT, request.url);
    return NextResponse.redirect(url);
  }

  // If user is authenticated, proceed as normal
  return response;
}
