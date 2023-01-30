import {useCallback} from 'react';
import {io, Socket} from 'socket.io-client';
// import Config from 'react-native-config';

let socket: Socket | undefined;

const useSocket = (): [typeof socket, () => void] => {
  const disconnect = useCallback(() => {
    if (!socket) return;
    socket.disconnect();
    socket = undefined;
  }, []);

  if (!socket) {
    socket = io('http://localhost:3105', {
      transports: ['websocket'],
    });
  }

  return [socket, disconnect];
};

export default useSocket;
