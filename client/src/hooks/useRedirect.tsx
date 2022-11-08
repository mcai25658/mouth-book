// import { useCallback, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// import { getParamsFromUrl, urlParamsKey } from '../utils/urlParse';

// type RedirectProps = {
//   location: '/home' | '/auth';
// };

// export const useRedirect = ({ location }: RedirectProps) => {
//   const navigate = useNavigate();
//   const [sessionIDFromUrl, setSessionId] = useState(getParamsFromUrl(urlParamsKey.session_id));
//   const [buyOrderTokenFromUrl, setBuyOrderTokenFromUrl] = useState(
//     getParamsFromUrl(urlParamsKey.buy_token),
//   );

//   const redirect = useCallback(
//     (params?: 'buy' | 'transfer') => {
//       if (params) {
//         navigate(`${location}/${params}?${urlParamsKey.session_id}=${sessionIDFromUrl}`);
//       } else {
//         navigate(`${location}?${urlParamsKey.session_id}=${sessionIDFromUrl}`);
//       }
//     },
//     [sessionIDFromUrl, location, navigate],
//   );

//   return {
//     redirect,
//     sessionID: sessionIDFromUrl,
//     buyOrderToken: buyOrderTokenFromUrl,
//     setSessionId,
//     setBuyOrderTokenFromUrl,
//   };
// };

export {};
