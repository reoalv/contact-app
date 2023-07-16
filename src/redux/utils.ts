import axios, {AxiosRequestConfig, Method, ResponseType} from 'axios';
import {requestType} from './types';

export const BASE_URL = 'https://contact.herokuapp.com';

export const checkStatus = (statusCode: number) => {
  return statusCode.toString().includes('20');
};

export const createRequest = (apiConfig: requestType) => {
  const {
    path,
    method,
    headers,
    query = {},
    data = {},
    timeout = 0,
    responseType = 'json',
  } = apiConfig;
  const axiosConfig: AxiosRequestConfig = {
    url: path,
    method: method.toLowerCase() as Method,
    params: query,
    ...(method === 'GET' ? {} : {data}),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    timeout,
    responseType: responseType as ResponseType,
  };
  return new Promise((resolve, reject) => {
    axios(axiosConfig)
      .then((response: any) => {
        return resolve(response);
      })
      .catch((error: any) => {
        return reject({error});
      });
  });
};
