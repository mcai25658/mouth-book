const storagePrefix = '88U_MVQuHm_';

const storage = {
  getToken: () => {
    return JSON.parse(window.localStorage.getItem(`${storagePrefix}token`) as string);
  },
  setToken: (token: string) => {
    window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}token`);
  },

  // getSession: () => {
  //   return JSON.parse(window.localStorage.getItem(`${storagePrefix}session`) as string);
  // },
  // setSession: (token: string) => {
  //   window.localStorage.setItem(`${storagePrefix}session`, JSON.stringify(token));
  // },
  // clearSession: () => {
  //   window.localStorage.removeItem(`${storagePrefix}session`);
  // },
};

export default storage;
