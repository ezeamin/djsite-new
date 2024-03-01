import env from 'env-var';

export const ENVS = {
  API_BASE_URL: env.get('API_BASE_URL').required().asString(),
};
