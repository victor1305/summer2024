import { type APIRoute } from "astro";

interface LoginResTypes {
  token: string;
  exp: string;
}

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const apiSummer = import.meta.env.API_SUMMER_URL;

  console.log('PRERES')
  console.log(`${apiSummer}iniciar-sesion`)
  const res: Response = await fetch(`${apiSummer}iniciar-sesion`, {
    method: "POST", // Asegúrate de que el método es POST
    headers: {
      "Content-Type": "application/json", // Establece el tipo de contenido
    },
    body: JSON.stringify({ email, password }),
  });
  const item = (await res.json()) as LoginResTypes;
  console.log(item)
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
    headers: headers,
  });
};
