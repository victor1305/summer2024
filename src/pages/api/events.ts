import { type APIRoute } from "astro";
import type { DayEvents, Events } from "../../types";

export const get: APIRoute = async () => {
  const apiSummer = import.meta.env.API_SUMMER_URL;

  console.log('PRERES')
  console.log(apiSummer)

  const res: Response = await fetch(`${apiSummer}cargar-eventos`);
  const resParsed = (await res.json()) as DayEvents[];

  return new Response(JSON.stringify(resParsed), {
    status: res.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const post: APIRoute = async ({ request }) => {
  const apiSummer = import.meta.env.API_SUMMER_URL;

  const requestBody = await request.json();
  const res: Response = await fetch(`${apiSummer}crear-evento`, {
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

export const put: APIRoute = async ({ request }) => {
  const apiSummer = import.meta.env.API_SUMMER_URL;

  const requestBody = await request.json();
  const res: Response = await fetch(`${apiSummer}actualizar-evento/${requestBody._id}`, {
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
