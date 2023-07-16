import {Method} from 'axios';
import {DataUser} from '../component/ListPopupAnimate';
import {store} from './store';

export type RootState = ReturnType<typeof store.getState>;

export type requestType = {
  path: string;
  method: Method;
  headers?: object;
  query?: object;
  data?: object;
  timeout?: number;
  responseType?: string;
};

export type baseReducerType = {
  data: Array<DataUser>;
  statusEdit: boolean;
  loadingGetList: boolean;
};

export type resListContact = {
  status: number;
  data: {
    data: Array<DataUser>;
  };
};

export type resEditContact = {
  status: number;
};

export type payloadEditContact = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  photo: string;
};

export type payloadAddNewContact = {
  firstName: string;
  lastName: string;
  age: number;
  photo?: string;
};
