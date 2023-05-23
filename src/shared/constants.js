export const PATH_URL = {
  MAIN: '/',
  LOGIN: '/user/login',
  DETAIL: '/detail/:detailId',
  KAKAO: '/kakao/callback',
  PARTY_DETAIL: '/partyDetail',
  PARTY_MODIFY: '/partyModify',
  PARTY_CREATE: '/partyCreate',
};

export const MEMBER_URL = {
  LOGIN: '/member/login',
  LOGOUT: '/member/logout',
  MYPAGE_GET: '/member/info',
  MYPAGE_PUT: '/member/update',
  TARGET_PAGE_GET: '/member/:memberId',
};

export const PARTIES_URL = {
  PARTIES_LIST: '/parties',
  MY_PARTIES_LIST: '/party/my-party-list',
  MY_PARTIES_LIST_WAIT: '/party/my-party-list/await',
  PARTIES_DETAIL: '/party/detail',
  PARTIES_APPLICATION: '/party/join/:partyId',
  PARTIES_CANCLE: '/party/:partyId',
  PARTIES_CONDITIONS: '/party/accept/:joinId',
  PARTIES_MAP_INQUIRY: '/map/parties',
  PARTIES_ADD: '/party/new-party',
  PARTIES_UPDATE: '/party/:partyId',
  PARTIES_DELETE: '/party/:partyId',
};

export const CHATING_URL = {
  CHAT_LIST_SUB: 'sub/chat/chatList/:memberId',
  CHAT_LIST_PUB: 'pub/chat/chatList/:memberId',
  CHAT_APPROVE: '/party/approve/:memberId',
  CHAT_ROOM_SUB: 'sub/chat/room/:chatRoomId',
  CHAT_ROOM_PUB: 'pub/chat/room/:chatRoomId',
  CHAT_ROOM_SUBS: 'sub/chat/message/:chatRoomId',
  BEFORE_CHAT_LIST: 'PUB/chat/room/:chatRoomId',
  CHAT_INPUT: 'pub/chat/message/:chatRoomId',
};
