import { type APIRoute } from "astro";
import type { Events } from "../../types";

export const POST: APIRoute = async ({ request }) => {
  const requestBody = await request.json();
  const res: Response = await fetch(
    "https://api-tt.onrender.com/api/summer/crear-evento",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }
  );
  const resParsed = (await res.json()) as Events;

  return new Response(JSON.stringify(resParsed), {
    status: res.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const PUT: APIRoute = async ({ request }) => {
  const requestBody = await request.json();
  const res: Response = await fetch(
    `https://api-tt.onrender.com/api/summer/actualizar-evento/${requestBody._id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }
  );
  const resParsed = (await res.json()) as Events;

  return new Response(JSON.stringify(resParsed), {
    status: res.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const DELETE: APIRoute = async ({ request }) => {
  const requestBody = await request.json();
  const res: Response = await fetch(
    `https://api-tt.onrender.com/api/summer/borrar-evento/${requestBody.userId}/${requestBody.dayId}/${requestBody.eventId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    return new Response(null, {
      status: res.status,
      statusText: res.statusText,
    });
  }

  return new Response(null, {
    status: 204,
  });
};