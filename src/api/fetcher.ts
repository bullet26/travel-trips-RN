import Config from 'react-native-config';
import {HTTPError} from '../types';
import {getToken, saveToken} from './utils';

export const handleError = (resJson: any): never => {
  const error = new Error(
    resJson?.message?.message ||
      resJson?.message?.join(', ') ||
      'An error occurred while fetching the data.',
  ) as HTTPError;
  error.info = resJson;
  error.status = resJson?.statusCode || 500;
  throw error;
};

type FetcherProps = {
  url: string;
  method?: 'POST' | 'GET' | 'PATCH' | 'DELETE' | 'PUT';
  body?: object;
  formData?: FormData;
  token?: string;
};

export const fetcher = async <T>({
  url,
  method,
  body,
  formData,
  token,
}: FetcherProps): Promise<T> => {
  const {refreshToken, accessToken: ATFromStorage} = await getToken();
  const accessToken = token || ATFromStorage;

  const res = await fetch(`${Config.BACKEND_URL}/${url}`, {
    method: method || 'GET',
    ...(!!body && {body: JSON.stringify(body)}),
    ...(!!formData && {body: formData}),
    //credentials: 'include', // не использ куки из-за react native
    headers: {
      ...(!formData && {'Content-Type': 'application/json'}),
      ...(!!accessToken && {Authorization: `Bearer ${accessToken}`}),
    },
  });

  const resJson = await res.json();

  if (resJson.statusCode === 401 && refreshToken) {
    const response = await fetch(`${Config.BACKEND_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({refreshToken}),
    });

    if (response.ok) {
      const {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        accessTokenExpires,
        refreshTokenExpires,
      } = await response.json();

      if (!!newAccessToken && !!newRefreshToken) {
        saveToken({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
          accessTokenExpires,
          refreshTokenExpires,
        });

        return fetcher({url, method, body, formData, token: newAccessToken});
      }
    }
  }

  if (!res.ok) {
    handleError(resJson);
  }

  return resJson;
};
