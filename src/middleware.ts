import { defineMiddleware } from "astro:middleware";
import { jwtDecode } from "jwt-decode";

import type { Locals } from "./types";

interface TokenExtendedProps {
  [key: string]: string;
}

const validateToken = (cookieSessionToken: string | undefined) => {
  if (cookieSessionToken) {
    const tokenDecoded = jwtDecode(cookieSessionToken);
    const { exp } = tokenDecoded;
    const now = Math.floor(Date.now() / 1000);

    return exp ? now < exp : false;
  }

  return false;
};

const getTokenData = (cookieSessionToken: string, field: string) => {
  const tokenDecoded: TokenExtendedProps = jwtDecode(cookieSessionToken);
  return tokenDecoded[field] as string;
};

export const onRequest = defineMiddleware((context, next) => {
  const pathName = context.url.pathname;
  const cookieSessionToken = context.cookies.get("sessionToken")?.value;
  const isValidToken = cookieSessionToken
    ? validateToken(cookieSessionToken)
    : false;

  if (!isValidToken && pathName !== "/login" && !pathName.startsWith("/api")) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/login",
      },
    });
  }

  if (isValidToken && pathName == "/login") {
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  }

  if (isValidToken && cookieSessionToken) {
    context.locals = {
      ...(context.locals || {}),
      sessionToken: cookieSessionToken,
      userName: getTokenData(cookieSessionToken, "name"),
      userId: getTokenData(cookieSessionToken, "id"),
    };
  }
  return next();
});
