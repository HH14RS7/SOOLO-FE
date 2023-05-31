// import SockJS from 'sockjs-client';
// import Stomp from 'stompjs';

// let stompClient = null;

// export const connect = () => {
//   const socket = new SockJS('http://222.102.175.141:8081/ws-stomp'); // 스프링 WebSocket 엔드포인트 URL로 변경
//   console.log('socket :: ', socket);
//   stompClient = Stomp.over(socket);
//   console.log('stompClient :: ', stompClient);
//   stompClient.connect({}, () => {
//     console.log('Connected');
//   });
// };

// export const disconnect = () => {
//   if (stompClient !== null) {
//     stompClient.disconnect();
//   }
//   console.log('Disconnected');
// };

// export const sendMessage = message => {
//   if (stompClient && stompClient.connected) {
//     stompClient.send('/app/message', {}, JSON.stringify({ message: message }));
//   } else {
//     // 연결이 수립되지 않은 경우 연결 완료 후 다시 시도하거나 오류 처리
//     console.log('WebSocket connection not established yet.');
//   }
// };

// export const subscribe = callback => {
//   if (stompClient && stompClient.connected) {
//     stompClient.subscribe('/topic/messages', message => {
//       callback(JSON.parse(message.body));
//     });
//   } else {
//     // 연결이 수립되지 않은 경우 연결 완료 후 다시 시도하거나 오류 처리
//     console.log('WebSocket connection not established yet.');
//   }
// };
