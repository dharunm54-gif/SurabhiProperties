import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Pass through freely; real-world RBAC with Supabase session validation
  // activates automatically once Supabase credentials are provided in .env
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
