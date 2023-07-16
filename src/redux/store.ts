import {combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import contactReducer from './reducer';
import {configureStore} from '@reduxjs/toolkit';
import {fork} from 'redux-saga/effects';
import contactSaga from './saga';
import Storage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';

const persistConfig = {
  key: 'ToDo',
  storage: Storage,
};

const combineReducer = combineReducers({contactReducer});
const saga = function* () {
  yield fork(contactSaga);
};

const persistedReducer = persistReducer(persistConfig, combineReducer);

const sagaMidware = createSagaMiddleware();

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMidware],
});

export const persistor = persistStore(store);

sagaMidware.run(saga);
