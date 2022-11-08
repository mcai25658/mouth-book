import { axios } from '@/lib/axios';

export type RegisterCredentialsDTO = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const registerReq = (data: RegisterCredentialsDTO): Promise<any> => {
  return axios.post('/auth/register', data);
};
