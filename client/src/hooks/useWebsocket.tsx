import useWebSocket, { ReadyState } from 'react-use-websocket';

const DEFAULT_URL = `${import.meta.env.VITE_APP_SOCKET}/transaction`;

type Websocket = {
  options?: any;
  BASE_URL?: string;
};

export const useWebsocket = ({ options, BASE_URL = DEFAULT_URL }: Websocket) => {
  const { readyState, sendMessage, lastJsonMessage, getWebSocket } = useWebSocket(`${BASE_URL}`, {
    ...options,
    shouldReconnect: () => true,
    reconnectAttempts: 10,
    reconnectInterval: 3000,
    // onReconnectStop: (e) => console.log('==== websocket reconnect stop ====', e),
  });

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return { connectionStatus, sendMessage, lastJsonMessage, getWebSocket };
};
