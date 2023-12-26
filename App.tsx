import * as React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
import ApplicationNavigator from '@/navigation';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, stateStore} from '@/store';
import {Provider} from 'react-redux';

const App = () => {
  return (
    <Provider store={stateStore}>
      <PersistGate loading={null} persistor={persistor}>
        <ApplicationNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
