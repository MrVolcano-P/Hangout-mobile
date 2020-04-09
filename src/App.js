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
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ThemeContext } from './themes/theme-context';

export default () => {

  const [theme, setTheme] = React.useState('light');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  return (
    <ReduxProvider store={reduxStore.store}>
      <PersistGate loading={null} persistor={reduxStore.persistor}>
        {/* <PaperProvider theme={paperTheme}>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="dark-content"
          /> */}
        <IconRegistry icons={EvaIconsPack} />
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <ApplicationProvider {...eva} theme={eva[theme]}>
            <SafeAreaProvider>
              <Router />
            </SafeAreaProvider>
          </ApplicationProvider>
        </ThemeContext.Provider>
        {/* </PaperProvider> */}
      </PersistGate>
    </ReduxProvider>
  );
};
