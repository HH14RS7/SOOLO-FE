import axios from 'axios';
import Cookies from 'js-cookie';
import { PATH_URL } from '../shared/constants';

const API_URL = process.env.REACT_APP_SERVER_URL;

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  config => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.ACCESS_KEY = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const {
      config,
      config: { url, method },
      response: {
        data: { errorCode, message },
      },
    } = error;

    if (errorCode === 'EXPIRED_ACCESS_TOKEN') {
      const refresh = Cookies.get('refreshToken');
      const originReq = config;
      const { headers } = await api({
        url: url,
        method: method,
        headers: { REFRESH_KEY: refresh },
      });

      const { ACCESS_KEY: newAccessToken, REFRESH_KEY: newRefreshToken } = headers;
      Cookies.set('token', newAccessToken);
      Cookies.set('refreshToken', newRefreshToken);

      originReq.headers.ACCESS_KEY = `Bearer ${newAccessToken}`;

      return axios(originReq);
    } else if (errorCode === 'EXPIRED_REFRESH_TOKEN') {
      alert('만료시간이 다 되어 재로그인이 필요합니다');
      window.location.replace(PATH_URL.LOGIN);
    } else if (errorCode === 'DUPLICATED_MEMBER') {
      alert(message);
      return Promise.reject(error);
    } else if (errorCode === 'DUPLICATED_EMAIL') {
      alert(message);
      return Promise.reject(error);
    } else if (errorCode === 'MEMBER_NOT_FOUND') {
      alert(message);
      return Promise.reject(error);
    } else if (errorCode === 'INACTIVE_MEMBER') {
      alert(message);
      return Promise.reject(error);
    } else if (errorCode === 'INTERNAL_SERVER_ERROR') {
      alert(message);
      return Promise.reject(error);
    } else if (errorCode === 'IO_EXCEPTION') {
      alert(message);
      return Promise.reject(error);
    } else if (errorCode === 'INVALID_REQUEST_PARAMETER') {
      alert(message);
      return Promise.reject(error);
    } else if (errorCode === 'INVALID_PASSWORD') {
      alert(message);
      return Promise.reject(error);
    } else if (errorCode === 'RESOURCE_NOT_FOUND') {
      alert(message);
      return Promise.reject(error);
    }
  },
);
