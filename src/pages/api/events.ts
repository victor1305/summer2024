import { type APIRoute } from "astro";
import type { DayEvents, Events } from "../../types";

export const GET: APIRoute = async () => {
  const apiSummer = import.meta.env.API_SUMMER_URL;

  console.log('PRERES')
  console.log(apiSummer)

  const res: Response = await fetch("https://api-tt.onrender.com/api/summer/cargar-eventos");
  const resParsed = (await res.json()) as DayEvents[];

  return new Response(JSON.stringify(resParsed), {
    status: res.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const POST: APIRoute = async ({ request }) => {
  const apiSummer = import.meta.env.API_SUMMER_URL;

  const requestBody = await request.json();
  const res: Response = await fetch("https://api-tt.onrender.com/api/summer/crear-evento", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
  const resParsed = (await res.json()) as Events;

  return new Response(JSON.stringify(resParsed), {
    status: res.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const PUT: APIRoute = async ({ request }) => {
  const apiSummer = import.meta.env.API_SUMMER_URL;

  const requestBody = await request.json();
  const res: Response = await fetch(`https://api-tt.onrender.com/api/summer/actualizar-evento/${requestBody._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
  const resParsed = (await res.json()) as Events;

  return new Response(JSON.stringify(resParsed), {
    status: res.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
