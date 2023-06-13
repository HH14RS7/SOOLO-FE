import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = `${process.env.REACT_APP_SERVER_URL}`;

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  config => {
    //cookie에 access_token,refresh_token을 어떤 이름으로 저장했는지?
    const accesskey = Cookies.get('Access_key');
    const refreshkey = Cookies.get('Refresh_key');

    if (accesskey) {
      config.headers['Access_key'] = `Bearer ${accesskey}`;
      config.headers['Refresh_key'] = `Bearer ${refreshkey}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      const { status, data, msg } = error.response.data;
      // 401 토큰 만료
      if (status === 401) {
        throw new Error('Internal Server Error 501', msg);
      } else if (status === 403) {
        throw new Error('Internal Server Error 403', msg);
      } else if (status === 404) {
        throw new Error('Internal Server Error 404', msg);
      } else if (status === 410) {
        throw new Error('Internal Server Error 410 로그아웃한 토큰', msg);
      } else if (status === 500) {
        throw new Error('Internal Server Error 500', msg);
      } else {
        throw new Error(msg);
      }
    } else {
      throw new Error('Network Error');
    }
  },
);

export async function postAPI(url, data) {
  return await api.post(API_URL + url, data);
}

export async function putAPI(url, data) {
  return await api.put(API_URL + url, data);
}

export async function getAPI(url) {
  return await api.get(API_URL + url);
}

export async function deleteAPI(url) {
  return await api.delete(API_URL + url);
}

export async function patchAPI(url, data) {
  return await api.patch(API_URL + url, data);
}

export async function postImageAPI(url, formData) {
  return await api.post(API_URL + url, formData, {
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

export async function putUpdateAPI(url, formData) {
  return await api.put(API_URL + url, formData, {
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
