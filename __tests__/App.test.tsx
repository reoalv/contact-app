/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import {jest} from '@jest/globals';
import {render} from '@testing-library/react-native';

// Note: import explicitly to use the types shiped with jest.
import {it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import {Provider} from 'react-redux';
import {store} from '../src/redux/store';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
jest.useFakeTimers();

const component = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

it('renders correctly', () => {
  render(component());
});
