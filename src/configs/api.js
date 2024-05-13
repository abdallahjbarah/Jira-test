import axios from 'axios';
import {
  getAuthToken,
} from '@utils/functions'; // Adjust according to your utility functions

const api = axios.create({
  baseURL: process.env.REACT_APP_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const accessToken = getAuthToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

async function request(
  method,
  url,
  { data = null, params = {}, headers = {}, isPrivate = true } = {},
) {
  try {
    const config = { method, url, headers, params, ...(data && { data }) };

    if (isPrivate) {
      const authToken = getAuthToken();
      if (authToken) {
        config.headers['Authorization'] = `Bearer ${authToken}`;
      }
    }

    const response = await api(config);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const get = (url, params, isPrivate = true, headers) =>
  request('get', url, { params, headers, isPrivate });
export const post = (url, data, isPrivate = true, headers) =>
  request('post', url, { data, headers, isPrivate });
export const put = (url, data, isPrivate = true, headers) =>
  request('put', url, { data, headers, isPrivate });
export const patch = (url, data, isPrivate = true, headers) =>
  request('patch', url, { data, headers, isPrivate });
export const del = (url, isPrivate = true, headers) =>
  request('delete', url, { headers, isPrivate });

export default api;
