import Axios, { AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';

import { errorMessage } from '@/config/error-message';
import storage from '@/utils/storage';

const authRequestInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
  if (!config.headers) return config;

  const token = storage.getToken();

  if (token) {
    return {
      ...config,
      headers: { ...config.headers, Authorization: `Bearer ${token}` },
    };
  }

  return {
    ...config,
    headers: { ...config.headers, Accept: 'application/json' },
  };
};

export const axios = Axios.create({
  baseURL: '/api',
});

axios.interceptors.request.use(authRequestInterceptor);

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.cnMsg || error.message;
    const code = error.response?.data?.code;
    const customMessage = errorMessage[`${code}`];
    const responseMessage = customMessage || message;
    toast.error(`${responseMessage} - [${code}]`);
    return Promise.reject(error);
  },
);
