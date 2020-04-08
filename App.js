import React from 'react';
import {StatusBar} from 'react-native';
import Router from 'src/routes';
import 'react-native-gesture-handler';
import {Provider as ReduxProvider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import reduxStore from './store';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import paperTheme from './themes/paper';
import {PersistGate} from 'redux-persist/integration/react';

export default () => {
  return (
    <ReduxProvider store={reduxStore.store}>
      <PersistGate loading={null} persistor={reduxStore.persistor}>
        <PaperProvider theme={paperTheme}>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="dark-content"
          />
          <SafeAreaProvider>
            <Router />
          </SafeAreaProvider>
        </PaperProvider>
      </PersistGate>
    </ReduxProvider>
  );
};
