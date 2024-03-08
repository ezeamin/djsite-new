import { postEvent } from '@/utilities/db';

export const POST = async (req: Request): Promise<Response> => {
  const body = await req.json();
  await postEvent(body);
  return Response.json({});
};
