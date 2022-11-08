import { axios } from '@/lib/axios';

export type LoginCredentialsDTO = {
  phone: string;
  phonePrefix?: string;
  password: string;
};

export const loginReq = (data: LoginCredentialsDTO): Promise<any> => {
  return axios.post('/auth/login', data);
};
