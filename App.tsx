import * as React from 'react';
import {useEffect} from 'react';
import {AppState} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ApplicationNavigator from '@/navigation';
import {PersistGate} from 'redux-persist/integration/react';
import {flushPersistedState, persistor, stateStore} from '@/store';
import {Provider} from 'react-redux';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import ToastContainer, {getToastConfig} from '@/components/Toast/Toast';
import './src/translations';

const App = () => {
  // Persist writes are debounced, so flush when the app leaves the foreground
  // instead of losing the last taps on a swipe-away.
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextState => {
      if (nextState !== 'active') {
        flushPersistedState();
      }
    });
    return () => subscription.remove();
  }, []);

  return (
    <Provider store={stateStore}>
      <PersistGate loading={null} persistor={persistor}>
        <GluestackUIProvider config={config}>
          <GestureHandlerRootView>
            <ApplicationNavigator />
            <ToastContainer config={getToastConfig()} />
          </GestureHandlerRootView>
        </GluestackUIProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
