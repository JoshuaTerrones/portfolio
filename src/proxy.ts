import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["es", "en"];
const DEFAULT_LOCALE = "es";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return NextResponse.next();

  const accept = (request.headers.get("accept-language") || "").toLowerCase();
  const preferred =
    LOCALES.find((l) => {
      const re = new RegExp(`(^|[,\\s])${l}([-;,]|$)`);
      return re.test(accept);
    }) || DEFAULT_LOCALE;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferred}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next|studio|favicon.ico|.*\\..*).*)"],
};
