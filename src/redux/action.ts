import {createAction} from '@reduxjs/toolkit';
import {CONTACT_ADD_NEW, CONTACT_EDIT, CONTACT_LIST} from './actionList';
import {
  baseReducerType,
  payloadAddNewContact,
  payloadEditContact,
} from './types';

export const getContactList = createAction(CONTACT_LIST.GET);
export const setContactList = createAction<baseReducerType['data']>(
  CONTACT_LIST.SET,
);
export const setContactListLoad = createAction<boolean>(CONTACT_LIST.SET_LOAD);

export const getEditContact = createAction<payloadEditContact>(
  CONTACT_EDIT.GET,
);
export const getAddNewContact = createAction<payloadAddNewContact>(
  CONTACT_ADD_NEW.GET,
);
export const setEditContactStatus = createAction<boolean>(CONTACT_EDIT.SET);
