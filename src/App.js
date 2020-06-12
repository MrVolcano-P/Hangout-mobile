import React from 'react';
import { StatusBar } from 'react-native';
import Router from './routes';
import 'react-native-gesture-handler';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import reduxStore from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import paperTheme from './themes/paper';
import { PersistGate } from 'redux-persist/integration/react';
import { ApplicationProvider, Layout, Text, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import appTheme from './themes/colors'
import { mapping, light as lightTheme } from '@eva-design/eva'
const theme = { ...lightTheme, ...appTheme }
export default () => {
  return (
    <ReduxProvider store={reduxStore.store}>
      <PersistGate loading={null} persistor={reduxStore.persistor}>
        <PaperProvider theme={paperTheme}>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider {...eva} theme={theme}>
            <StatusBar
              translucent
              backgroundColor="transparent"
              barStyle="dark-content"
            />
            <SafeAreaProvider>
              <Router />
            </SafeAreaProvider>
          </ApplicationProvider>
        </PaperProvider>
      </PersistGate>
    </ReduxProvider>
  );
};
