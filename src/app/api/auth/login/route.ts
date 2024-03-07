import { cookies } from 'next/headers';

export const POST = async (request: Request): Promise<Response> => {
  const body = await request.json();
  const { password } = body;

  if (!password || password.trim().length < 1) {
    return Response.json(
      { data: null, message: 'Elegí una "clave" válida' },
      { status: 400 }
    );
  }

  const { AUTH_PASSWORD } = process.env;

  if (!(password === AUTH_PASSWORD)) {
    return Response.json(
      { data: null, message: 'Clave incorrecta' },
      { status: 400 }
    );
  }

  cookies().set('auth', 'true', {
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
  });
  return Response.json({ data: null, message: 'OK' });
};
