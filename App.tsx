import * as React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
import ApplicationNavigator from '@/navigation';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, stateStore} from '@/store';
import {Provider} from 'react-redux';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import ToastContainer, {getToastConfig} from '@/components/Toast/Toast';
import moment from 'moment';
import 'moment/locale/vi';

const App = () => {
  React.useEffect(() => {
    moment.locale('vi');
  }, []);

  return (
    <Provider store={stateStore}>
      <PersistGate loading={null} persistor={persistor}>
        <GluestackUIProvider config={config}>
          <ApplicationNavigator />
          <ToastContainer config={getToastConfig()} />
        </GluestackUIProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
