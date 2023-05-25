import axios from 'axios';
import Cookies from 'js-cookie';
import { PATH_URL } from '../shared/constants';

const API_URL = `${process.env.REACT_APP_SERVER_URL}`;

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  config => {
    //cookie에 access_token,refresh_token을 어떤 이름으로 저장했는지?
    const accesskey = Cookies.get('Access_key');
    //const refreshkey = Cookies.get('Refresh_key');

    if (accesskey) {
      config.headers['Access_key'] = `Bearer ${accesskey}`;
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
    console.log('api.js / error => ', error);
    console.log('api.js / errorCode => ', errorCode);
    if (errorCode === 'EXPIRED_ACCESS_TOKEN') {
      const refreshkey = Cookies.get('Refresh_key');
      const originReq = config;
      const { headers } = await api({
        url: url,
        method: method,
        headers: { REFRESH_KEY: refreshkey },
      });

      const { ACCESS_KEY: newAccessToken, REFRESH_KEY: newRefreshToken } = headers;
      Cookies.set('Access_key', newAccessToken);
      Cookies.set('Refresh_key', newRefreshToken);

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

export function postAPI(url, data) {
  return api.post(API_URL + url, data);
}

export function putAPI(url, data) {
  return api.put(API_URL + url, data);
}

export function getAPI(url) {
  return api.get(API_URL + url);
}

export function deleteAPI(url) {
  return api.delete(API_URL + url);
}

export function patchAPI(url, data) {
  return api.patch(API_URL + url, data);
}

export function postImageAPI(url, formData) {
  return axios.post(API_URL + url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    transformRequest: [
      function () {
        return formData;
      },
    ],
  });
}
