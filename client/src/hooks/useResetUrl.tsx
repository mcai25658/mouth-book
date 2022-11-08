// import { useEffect, useState, Dispatch, SetStateAction } from 'react';
// import { useNavigate, createSearchParams } from 'react-router-dom';

// import { urlParamsKey, getParamsFromUrl, ParamsProps } from '../utils/urlParse';

// type UseResetUrlOptions = 'home' | 'auth' | 'home/buy' | 'home/transfer';

// type UseResetUrlReturn = {
//   setSession: Dispatch<SetStateAction<string>>;
//   setOrderToken: Dispatch<SetStateAction<string>>;
//   session: string;
//   orderToken: string;
// };

// const sessionInit = getParamsFromUrl(urlParamsKey.session_id as ParamsProps);
// const orderTokenInit = getParamsFromUrl(urlParamsKey.buy_token as ParamsProps);

// export const useResetUrl = (rootUrl: UseResetUrlOptions): UseResetUrlReturn => {
//   const sessionIDkey = urlParamsKey.session_id;
//   const buyOrderTokenKey = urlParamsKey.buy_token;

//   const [session, setSession] = useState(sessionInit);
//   const [orderToken, setOrderToken] = useState(orderTokenInit);

//   const navigate = useNavigate();

//   useEffect(() => {
//     navigate({
//       pathname: `/${rootUrl}`,
//       search: createSearchParams({
//         [sessionIDkey]: session,
//         [buyOrderTokenKey]: orderToken,
//       }).toString(),
//     });
//   }, [orderToken, session, sessionIDkey, buyOrderTokenKey, navigate, rootUrl]);
//   return {
//     setSession,
//     setOrderToken,
//     session,
//     orderToken,
//   };
// };

export {};
