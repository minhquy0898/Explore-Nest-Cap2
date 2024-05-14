import axios from 'axios';
import queryString from 'query-string';
import requiresToken from '../utils/requiresToken';
import { getToken } from '../utils/tokenUtils';
// import { env } from '../configs/envConfig';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8888/api/v1',
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
  async (config) => {
    if (requiresToken(config.url!.trim())) {
      const token = getToken();
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);
export default axiosClient;
