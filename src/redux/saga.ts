import {call, put, takeLatest} from 'redux-saga/effects';
import {
  payloadAddNewContact,
  payloadEditContact,
  requestType,
  resEditContact,
  resListContact,
} from './types';
import {BASE_URL, checkStatus, createRequest} from './utils';
import {
  getAddNewContact,
  getContactList,
  getEditContact,
  setContactList,
  setContactListLoad,
  setEditContactStatus,
} from './action';

export function* fetchContactList() {
  try {
    yield put(setContactListLoad(true));
    const objRequest: requestType = {
      path: `${BASE_URL}/contact`,
      method: 'GET',
    };
    const res: resListContact = yield call(createRequest, objRequest);
    if (checkStatus(res?.status)) {
      yield put(setContactList(res?.data?.data));
      yield put(setContactListLoad(false));
    } else {
      throw Error;
    }
  } catch (responseFailed) {
    yield put(setContactListLoad(false));
    //handle error
  }
}

export function* fetchEditContact({payload}: {payload: payloadEditContact}) {
  try {
    const objRequest: requestType = {
      path: `${BASE_URL}/contact/${payload.id}`,
      method: 'PUT',
      data: {
        firstName: payload.firstName,
        lastName: payload.lastName,
        age: payload.age,
        photo: payload.photo,
      },
    };
    const res: resEditContact = yield call(createRequest, objRequest);
    if (checkStatus(res?.status)) {
      yield put(getContactList());
      yield put(setEditContactStatus(true));
    } else {
      throw Error;
    }
  } catch (responseFailed) {
    //handle error
  }
}

export function* fetchAddNewContact({
  payload,
}: {
  payload: payloadAddNewContact;
}) {
  try {
    const objRequest: requestType = {
      path: `${BASE_URL}/contact`,
      method: 'POST',
      data: {
        firstName: payload.firstName,
        lastName: payload.lastName,
        age: payload.age,
      },
    };
    const res: resEditContact = yield call(createRequest, objRequest);
    if (checkStatus(res?.status)) {
      yield put(getContactList());
      yield put(setEditContactStatus(true));
    } else {
      throw Error;
    }
  } catch (responseFailed) {
    //handle error
  }
}

export default function* contactSaga() {
  yield takeLatest(getContactList, fetchContactList);
  yield takeLatest(getEditContact, fetchEditContact);
  yield takeLatest(getAddNewContact, fetchAddNewContact);
}
