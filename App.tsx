import * as React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
import ToastContainer, {getToastConfig} from '@/components/Toast/Toast';
import ApplicationNavigator from '@/navigation';
import {persistor, stateStore} from '@/store';
import {config} from '@gluestack-ui/config';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import './src/translations';

const App = () => {
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
