import "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MMKV } from "react-native-mmkv";

import { ThemeProvider } from "@/theme";

import ApplicationNavigator from "./navigators/Application";
import "./translations";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, stateStore } from "./store";
import { Provider } from "react-redux";

const queryClient = new QueryClient();

export const storage = new MMKV();

function App() {
  return (
    <Provider store={stateStore}>
      <QueryClientProvider client={queryClient}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider storage={storage}>
            <ApplicationNavigator />
          </ThemeProvider>
        </PersistGate>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
