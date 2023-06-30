import SockJS from 'sockjs-client';
import * as StompJs from '@stomp/stompjs';
import Cookies from 'js-cookie';

export const socketConnect = (subscribe, publish) => {
  const accesskey = Cookies.get('Access_key');
  const client = new StompJs.Client({
    brokerURL: 'ws://222.102.175.141:8081/ws-stomp',
    connectHeaders: {
      Access_key: `Bearer ${accesskey}`,
    },
    debug: function (str) {
      // console.log('str ::', str);
    },
    onConnect: () => {
      subscribe();
      publish();
    },
  });

  client.webSocketFactory = function () {
    return new SockJS('http://222.102.175.141:8081/ws-stomp');
  };

  client.activate();

  return () => client.deactivate();
};
