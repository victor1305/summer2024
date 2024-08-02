import { defineMiddleware } from "astro:middleware";
import { jwtDecode } from "jwt-decode";

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

  if (!isValidToken) {
    if (cookieSessionToken) {
      // Eliminar la cookie
      const headers = new Headers();
      headers.append(
        "Set-Cookie",
        "sessionToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict"
      );

      if (pathName !== "/login" && !pathName.startsWith("/api")) {
        headers.append("Location", "/login");
        return new Response(null, {
          status: 302,
          headers: headers,
        });
      }

      return new Response(null, { headers: headers });
    }

    if (pathName !== "/login" && !pathName.startsWith("/api")) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/login",
        },
      });
    }
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
