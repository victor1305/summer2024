import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');

  // Aquí puedes añadir la lógica para manejar el login,
  // como validar las credenciales y generar un token de sesión.

  console.log('Received email:', email);
  console.log('Received password:', password);

  return new Response(JSON.stringify({ email, password }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};