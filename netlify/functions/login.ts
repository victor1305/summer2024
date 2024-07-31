import type { Handler } from '@netlify/functions';

interface LoginResTypes {
  token: string;
  exp: string;
}

const handler: Handler = async (event, context) => {
  const { email, password } = JSON.parse(event.body || '{}');
  const apiSummer = "http://localhost:3030/api/summer/";

  console.log('PRERES');
  console.log(`${apiSummer}iniciar-sesion`);
  
  const res = await fetch(`${apiSummer}iniciar-sesion`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  
  const item = await res.json() as LoginResTypes;
  console.log(item);
  
  const expDate = item.exp ? new Date(item.exp) : new Date(Date.now() + 10 * 24 * 60 * 60 * 1000);

  const headers: Record<string, string> = {
    Location: "/",
  };
  if (res.status === 200) {
    headers["Set-Cookie"] = `sessionToken=${item.token}; Path=/; Expires=${expDate.toUTCString()}; HttpOnly; Secure; SameSite=Strict`;
  }

  return {
    statusCode: 302,
    headers: headers,
  };
};

export { handler };