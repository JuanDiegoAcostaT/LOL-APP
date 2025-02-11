import {AUTH_API_KEY, BASE_URL_AUTH, mainEndpoint} from './constants';

export const createUser = async (
  email: string,
  password: string,
): Promise<any> => {
  const res = await mainEndpoint(BASE_URL_AUTH + AUTH_API_KEY, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: {
      email,
      password,
      returnSecureToken: true,
    },
  });
  console.log('RES', res);
  return res;
};
