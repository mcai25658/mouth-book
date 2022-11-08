/* eslint-disable @typescript-eslint/naming-convention */
import { isEmpty } from 'lodash';
import { initReactQueryAuth } from 'react-query-auth';

import { Spinner } from '@/components/Elements/Spinner';
import {
  getUser,
  loginReq,
  registerReq,
  RegisterCredentialsDTO,
  LoginCredentialsDTO,
} from '@/features/auth';
import storage from '@/utils/storage';

export type AuthUser = any;

const handleUserResponse = async (data: any) => {
  const { result } = data;
  storage.setToken(result.id);
  return result;
};

const loginFn = async (data: LoginCredentialsDTO) => {
  const response = await loginReq(data);
  const user = await handleUserResponse(response);
  return user;
};

const registerFn = async (registerData: RegisterCredentialsDTO) => {
  await registerReq(registerData);
  // const user = await handleUserResponse(response);
  return null;
};

const loadUser = async () => {
  try {
    const id = storage.getToken();
    if (!id) return null;

    const data = await getUser();

    if (isEmpty(data)) {
      localStorage.clear();
      return null;
    }
    return { ...data.result };
  } catch (error) {
    localStorage.clear();
    return null;
  }
};

const logoutFn = async () => {
  storage.clearToken();
  // window.location.assign(window.location.origin as unknown as string);
  // window.location.reload();
};

const authConfig = {
  loginFn,
  loadUser,
  logoutFn,
  registerFn,
  LoaderComponent() {
    return <Spinner />;
  },
  ErrorComponent() {
    return <div>Error</div>;
  },
};

export const { AuthProvider, useAuth } = initReactQueryAuth<
  AuthUser | null,
  unknown,
  LoginCredentialsDTO,
  RegisterCredentialsDTO
>(authConfig);
