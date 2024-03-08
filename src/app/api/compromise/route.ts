import { postCompromise } from '@/utilities';

export const POST = async (req: Request): Promise<Response> => {
  const body = await req.json();
  await postCompromise(body);
  return Response.json({});
};
