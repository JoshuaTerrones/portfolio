// src/proxy.ts
import { createNextMiddleware } from "gt-next/middleware";

export default createNextMiddleware();

export const config = {
  matcher: ["/((?!api|_next|studio|favicon.ico|.*\\..*).*)"],
};
