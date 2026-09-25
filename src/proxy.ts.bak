import { createNextMiddleware } from "gt-next/middleware";

const gtMiddleware = createNextMiddleware();

export function proxy(request: Parameters<typeof gtMiddleware>[0]) {
  return gtMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|studio|favicon.ico|.*\\..*).*)"],
};
