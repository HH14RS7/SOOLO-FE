export const PATH_URL = {
  MAIN: '/',
  LOGIN: '/user/login',
  DETAIL: '/detail/:detailId',
  KAKAO: '/kakao/callback',
  NAVER: '/naver/callback',
  PARTY_DETAIL: '/party/detail',
  PARTY_CREATE: '/party/create',
};

export const MEMBER_URL = {
  LOGIN: '/member/login',
  LOGOUT: '/member/logout',
  MYPAGE_GET: '/member/info',
  MYPAGE_PUT: '/member/update',
  TARGET_PAGE_GET: '/member',
};

export const PARTIES_URL = {
  DETAIL: '/party', //상세조회
  PARTIES_STATUS_CHANGE: '/party', //수정, 취소, 삭제 기능 통합 URL

  PARTIES_LIST: '/parties',
  MY_PARTIES_LIST: '/party/my-party-list',
  MY_PARTIES_LIST_WAIT: '/party/my-party-list/await',
  PARTIES_DETAIL: '/party/detail',
  PARTIES_APPLICATION: '/party/join',
  PARTIES_CONDITIONS: '/party/accept',
  PARTIES_MAP_INQUIRY: '/map/parties',
  PARTIES_ADD: '/party/new-party',
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
};
