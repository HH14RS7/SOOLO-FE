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
api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      const { status, data, msg } = error.response.data;
      if (status === 401) {
        // 403 토큰 만료
      } else if (status === 403) {
      } else if (status === 404) {
      } else if (status === 500) {
        alert('Internal Server Error');
      } else {
        alert(msg);
      }
    } else {
      alert('Network Error');
    }
    return Promise.reject(error);
  },
);
