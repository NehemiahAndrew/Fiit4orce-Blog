import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const pathname = request.nextUrl.pathname;

  if (
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  if (host.startsWith("blog.")) {
    const url = request.nextUrl.clone();

    if (pathname === "/") {
      url.pathname = "/blog";
      return NextResponse.rewrite(url);
    }

    if (pathname.startsWith("/blog")) {
      url.pathname = pathname.replace(/^\/blog/, "") || "/";
      return NextResponse.redirect(url);
    }

    url.pathname = `/blog${pathname}`;
    return NextResponse.rewrite(url);
  }

  if (host.startsWith("admin.") && !pathname.startsWith("/admin")) {
    const url = request.nextUrl.clone();
    url.pathname = `/admin${pathname === "/" ? "" : pathname}`;
    return NextResponse.rewrite(url);
  }

  if (pathname === "/blog" || pathname.startsWith("/blog/")) {
    const url = request.nextUrl.clone();
    url.hostname = `blog.${host.replace(/^www\./, "")}`;
    url.pathname = pathname.replace(/^\/blog/, "") || "/";
    return NextResponse.redirect(url);
  }

  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/landing-home/index.html";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|landing-home).*)"],
};
