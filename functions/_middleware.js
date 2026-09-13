export async function onRequest(context) {
  const auth = context.request.headers.get('Authorization');
  const user = context.env.BASIC_AUTH_USER;
  const pass = context.env.BASIC_AUTH_PASS;
  const expected = 'Basic ' + btoa(`${user}:${pass}`);

  if (auth !== expected) {
    return new Response('Acceso restringido. Ingresá usuario y contraseña.', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Cheques"' },
    });
  }

  return context.next();
}
