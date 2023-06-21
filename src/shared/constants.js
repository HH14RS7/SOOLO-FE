export const PATH_URL = {
  NOT_FOUND: '/*',
  WALK_THROUGH: '/',
  MAIN: '/home',
  LOGIN: '/user/login',
  DETAIL: '/detail/:detailId',
  MYPAGE: '/mypage',
  KAKAO: '/kakao/callback',
  NAVER: '/naver/callback',
  PARTY_DETAIL: '/party/detail',
  PARTY_CREATE: '/party/create',
  PARTY_APPROVE: '/party/approve',
  PARTY_CHAT: '/party/chat',
  PARTY_CHATROOM: '/party/chat/room',
  PARTY_LIST_MAP: '/party/list/map',
  PARTY_REQUEST_APPROVE: '/party/request/approve',
  MY_REQUEST_PARTY: '/mypage/party/request',
  MY_CREATE_PARTY: '/mypage/party/create',
  PARTY_MAP_CREATE: '/party/map/create',
  PARTY_PLACE_CREATE: '/party/place/create',
  MYPAGE_UPDATE: '/member/update',
  MY_ACCOUNT_DETAILS: '/mypage/account',
  USER_REPORT: '/user/report',
};

export const MEMBER_URL = {
  LOGIN: '/member/login',
  LOGOUT: '/member/logout',
  MYPAGE_GET: '/member/info',
  MYPAGE_PUT: '/member/update',
  TARGET_PAGE_GET: '/member',
  USER_REPORT_POST: '/report',
};

export const PARTIES_URL = {
  DETAIL: '/party', //상세조회
  PARTIES_STATUS_CHANGE: '/party', //수정, 취소, 삭제 기능 통합 URL
  PARTIES_LIST: '/parties',
  MY_PARTIES_LIST: '/party/my-party-list',
  PARTIES_DETAIL: '/party/detail',
  PARTIES_APPLICATION: '/party/join',
  PARTIES_CONDITIONS: '/party/accept',
  PARTIES_MAP_INQUIRY: '/map/parties',
  PARTIES_ADD: '/party/new-party',
  PARTY_MY_REQUEST_PARTY: '/party/request',
  MY_APPROVE_LIST: '/party/approve',
  MY_HOST_LIST: '/party/host-party-list',
  ACCEPT: '/party/accept',
  PARTIES_LIST_SEARCH: '/parties/search',
};

export const CHATING_URL = {
  CHAT_LIST_SUB: 'sub/chat/chatList',
  CHAT_LIST_PUB: 'pub/chat/chatList',
  CHAT_APPROVE: '/party/approve',
  CHAT_ROOM_SUB: 'sub/chat/room',
  CHAT_ROOM_PUB: 'pub/chat/room',
  CHAT_ROOM_SUBS: 'sub/chat/message',
  BEFORE_CHAT_LIST: 'PUB/chat/room',
  CHAT_INPUT: 'pub/chat/message',
  MESSAGE_LIST_GET: '/chat/messageList',
};
