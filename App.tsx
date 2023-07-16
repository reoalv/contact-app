import {Platform, UIManager} from 'react-native';
import React from 'react';
import {persistor, store} from './src/redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import MainPage from './src/src/MainPage';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MainPage />
      </PersistGate>
    </Provider>
  );
};

export default App;
