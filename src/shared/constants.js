export const PATH_URL = {
  MAIN: '/',
  LOGIN: '/user/login',
  DETAIL: '/detail/:detailId',
  PARTY_DETAIL: '/partyDetail',
};

export const MEMBER_URL = {
  LOGIN: '/api/member/login',
  LOGOUT: '/api/member/logout',
  MYPAGE_GET: '/api/member/:memberId',
  MYPAGE_PUT: '/api/member/:memberId',
  TARGET_PAGE_GET: '/api/member/target/:memberId',
};

export const PARTIES_URL = {
  PARTIES_LIST: '/api/parties',
  MY_PARTIES_LIST: '/api/member/parties/:memberId',
  PARTIES_DETAIL: 'api/parties/party/:partyId',
  PARTIES_APPLICATION: '',
  PARTIES_CANCLE: 'api/party/:partyId',
  PARTIES_ADD: 'api/parties/newparty',
  PARTIES_UPDATE: 'api/party/:partyId',
  PARTIES_DELETE: 'api/party/:partyId',
  MAP_LIST: 'api/map/parties',
};

export const CHATING_URL = {
  CHAT_LIST_SUB: 'sub/chat/chatList/:memberId',
  CHAT_LIST_PUB: 'pub/chat/chatList/:memberId',
  CHAT_APPROVE: 'api/party/approve/:memberId',
  CHAT_ROOM_SUB: 'sub/chat/room/:chatRoomId',
  CHAT_ROOM_PUB: 'pub/chat/room/:chatRoomId',
  CHAT_MESSAGE_SUB: 'sub/chat/message/:chatRoomId',
  CHAT_MESSAGE_PUB: 'pub/chat/message/:chatRoomId',
};
