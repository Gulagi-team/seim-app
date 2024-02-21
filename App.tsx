import * as React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
import ApplicationNavigator from '@/navigation';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, stateStore } from '@/store';
import { Provider } from 'react-redux';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { Text } from 'react-native-svg';


const App = () => {
  return (

    <Provider store={stateStore}>
      <PersistGate loading={null} persistor={persistor}>
        <GluestackUIProvider config={config}>
          <ApplicationNavigator />
        </GluestackUIProvider>
      </PersistGate>

    </Provider>

  );
};

export default App;
