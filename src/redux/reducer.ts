import {createReducer} from '@reduxjs/toolkit';
import {baseReducerType} from './types';
import {
  setContactList,
  setContactListLoad,
  setEditContactStatus,
} from './action';
import {getRandomColor} from '../utils';
import {DataUser} from '../component/ListPopupAnimate';

const initialState: baseReducerType = {
  data: [],
  statusEdit: false,
  loadingGetList: false,
};
const contactReducer = createReducer(initialState, builder => {
  builder.addCase(setContactList, (state, {payload}) => {
    let finalData: Array<DataUser> = [];
    finalData = payload.map(v => ({
      firstName: v?.firstName,
      lastName: v?.lastName,
      id: v?.id,
      age: v?.age,
      color: getRandomColor(),
      photo: v?.photo,
    }));
    return {...state, data: finalData};
  });

  builder.addCase(setEditContactStatus, (state, {payload}) => {
    return {...state, statusEdit: payload};
  });
  builder.addCase(setContactListLoad, (state, {payload}) => {
    return {...state, loadingGetList: payload};
  });
});

export default contactReducer;
