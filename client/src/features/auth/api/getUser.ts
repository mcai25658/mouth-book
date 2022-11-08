import { axios } from '@/lib/axios';

export const getUser = (): Promise<any> => {
  return axios.get('/user/my/status');
};
