import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import Axios from 'axios';

import { getCookies, setCookies } from '@/lib/action';

import { refreshToken as refreshTokenApi } from '@/api';

import { Token } from '@/types';
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const axios = Axios.create({
  baseURL: API_URL,
});

const onResponseSuccess = (response: AxiosResponse) => {
  return response.data;
};

const onResponseError = async (error: AxiosError) => {
  if (error.response) {
    return Promise.reject(error.response);
  }
  return Promise.reject(error);
};

axios.interceptors.response.use(onResponseSuccess, onResponseError);

axios.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = (await getCookies('token')) as Token;
    if (token) {
      config.headers.Authorization = `Bearer ${token.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      (error.status === 401 || error.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const token = (await getCookies('token')) as Token | undefined;
      const refreshToken = token?.refreshToken;
      if (refreshToken) {
        const result = await refreshTokenApi(refreshToken);
        const { token, refreshToken: newRefreshToken } = result;
        setCookies('token', { token, refreshToken: newRefreshToken });
        originalRequest.headers = {
          Authorization: 'Bearer ' + result.token,
        };
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
