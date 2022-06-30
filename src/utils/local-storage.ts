const ACCESS_TOKEN = 'accessToken';

export const setAccessToken = (tokenValue: string) => localStorage.setItem(ACCESS_TOKEN, tokenValue);

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN);

const REFRESH_TOKEN = 'refreshToken';

export const setRefreshToken = (tokenValue: string) => localStorage.setItem(REFRESH_TOKEN, tokenValue);

export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN);

export const clearTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};
