import {Alert} from 'react-native';
import RNSecureStorage from 'rn-secure-storage';

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
    (Date.now() + accessTokenExpires).toString(),
    {},
  );
  await RNSecureStorage.setItem(
    'refreshTokenExpires',
    (Date.now() + refreshTokenExpires).toString(),
    {},
  );
};

export const getToken = async () => {
  const atExist = await RNSecureStorage.exist('accessToken');
  const rtExist = await RNSecureStorage.exist('accessToken');
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
  const rtExist = await RNSecureStorage.exist('accessToken');

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
    return false;
  }

  return true;
};

export const handleDeepLink = (event: {url: string}) => {
  const {url} = event;

  console.log(url);

  if (url.startsWith('myapp://auth-success')) {
    const params = new URLSearchParams(url.split('?')[1]);
    const accessToken = params.get('accessToken');
    const accessTokenExpires = Number(params.get('accessTokenExpires') || 1);
    const refreshToken = params.get('refreshToken');
    const refreshTokenExpires = Number(params.get('refreshTokenExpires') || 1);

    if (accessToken && refreshToken)
      saveToken({
        accessToken,
        accessTokenExpires,
        refreshToken,
        refreshTokenExpires,
      });
  } else if (url.startsWith('myapp://error')) {
    const errorMessage = decodeURIComponent(url.split('=')[1]);
    Alert.alert('Error', errorMessage);
  }
};
