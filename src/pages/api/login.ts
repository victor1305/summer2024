import { type APIRoute } from "astro";

interface LoginResTypes {
  token: string;
  exp: string;
}

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const apiSummer = import.meta.env.API_SUMMER_URL;

  console.log('PRERES')
  const res: Response = await fetch("https://api-tt.onrender.com/api/summer/iniciar-sesion", {
    method: "POST", // Asegúrate de que el método es POST
    headers: {
      "Content-Type": "application/json", // Establece el tipo de contenido
    },
    body: JSON.stringify({ email, password }),
  });
  console.log('RES', res)
  const item = (await res.json()) as LoginResTypes;
  console.log('ITEM', item)
  const expDate = item.exp
    ? new Date(item.exp)
    : new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000);

  const headers: Record<string, string> = {
    Location: "/",
  };
  if (res.status === 200) {
    headers[
      "Set-Cookie"
    ] = `sessionToken=${item.token}; Path=/; Expires=${expDate}; HttpOnly; Secure; SameSite=Strict`;
  }
  return new Response(null, {
    status: 302,
    headers: {
      'Location': '/',
      'Set-Cookie': `sessionToken=${item.token}; Path=/; HttpOnly; Secure; Expires=${expDate.toUTCString()}`,
    }
  });
};
