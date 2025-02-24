import {Alert} from 'react-native';
import RNSecureStorage from 'rn-secure-storage';
import queryString from 'query-string';

type Tokens = {
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: number;
  refreshTokenExpires: number;
};

export const saveToken = async ({
  accessToken,
  refreshToken,
  accessTokenExpires,
  refreshTokenExpires,
}: Tokens) => {
  await RNSecureStorage.setItem('accessToken', accessToken, {});
  await RNSecureStorage.setItem('refreshToken', refreshToken, {});
  await RNSecureStorage.setItem(
    'accessTokenExpires',
    (Date.now() + accessTokenExpires * 1000).toString(),
    {},
  );
  await RNSecureStorage.setItem(
    'refreshTokenExpires',
    (Date.now() + refreshTokenExpires * 1000).toString(),
    {},
  );
};

export const getToken = async () => {
  const atExist = await RNSecureStorage.exist('accessToken');
  const rtExist = await RNSecureStorage.exist('refreshToken');
  let accessToken = null;
  let refreshToken = null;

  if (atExist) {
    accessToken = await RNSecureStorage.getItem('accessToken');
  }
  if (rtExist) {
    refreshToken = await RNSecureStorage.getItem('refreshToken');
  }

  return {accessToken, refreshToken};
};

export const checkTokenValidity = async () => {
  const atExist = await RNSecureStorage.exist('accessToken');
  const rtExist = await RNSecureStorage.exist('refreshToken');

  const accessTokenExpires = await RNSecureStorage.getItem(
    'accessTokenExpires',
  );

  const refreshTokenExpires = await RNSecureStorage.getItem(
    'refreshTokenExpires',
  );

  if (
    !rtExist ||
    !refreshTokenExpires ||
    Date.now() >= Number(refreshTokenExpires)
  ) {
    await RNSecureStorage.removeItem('refreshToken');
    return false;
  }

  if (
    !atExist ||
    !accessTokenExpires ||
    Date.now() >= Number(accessTokenExpires)
  ) {
    await RNSecureStorage.removeItem('accessToken');
  }

  return true;
};

export const handleDeepLink = (
  event: {url: string},
  setAuthStatus: (value: boolean) => void,
) => {
  const {url} = event;

  if (url.startsWith('myapp://auth-success')) {
    const queryParams = queryString.parse(url.split('?')[1]);
    const accessToken = queryParams.accessToken as string;
    const accessTokenExpires = Number(queryParams.accessTokenExpires || 1);
    const refreshToken = queryParams.refreshToken as string;
    const refreshTokenExpires = Number(queryParams.refreshTokenExpires || 1);

    if (accessToken && refreshToken)
      saveToken({
        accessToken,
        accessTokenExpires,
        refreshToken,
        refreshTokenExpires,
      });
    setAuthStatus(true);
  } else if (url.startsWith('myapp://error')) {
    const errorMessage = decodeURIComponent(url.split('=')[1]);
    Alert.alert('Error', errorMessage);
  }
};
