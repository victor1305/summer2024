import { type APIRoute } from "astro";

interface LoginResTypes {
  token: string;
  exp: string;
}

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    const res: Response = await fetch("https://api-tt.onrender.com/api/summer/iniciar-sesion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      console.error('Error from API:', res.status, res.statusText);
      return new Response(null, {
        status: res.status,
        statusText: res.statusText,
      });
    }

    const item = (await res.json()) as LoginResTypes;
    const expDate = item.exp
      ? new Date(item.exp)
      : new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000);

    const headers: Record<string, string> = {
      Location: "/",
    };

    if (res.status === 200) {
      headers[
        "Set-Cookie"
      ] = `sessionToken=${item.token}; Path=/; Expires=${expDate.toUTCString()}; HttpOnly; Secure; SameSite=Strict`;
    }

    return new Response(null, {
      status: 302,
      headers: headers,
    });
  } catch (error) {
    console.error('Fetch failed:', error);
    return new Response(null, {
      status: 500,
      statusText: 'Internal Server Error',
    });
  }
};
