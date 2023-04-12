import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { DarkTheme } from '../assets';

// Store
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '../store';

// Pages and Components
import Popup from '../components/Popup';
import Splash from '../pages/Splash';
import Register from '../pages/Register';
import CreateWallet from '../pages/CreateWallet';
import Seed from '../pages/Seed';
import ImportWallet from '../pages/ImportWallet';

import Main from '../pages/Main';
import Unlock from '../pages/Unlock';
import SeedConfirm from '../pages/SeedConfirm';

const Stack = createStackNavigator<AppStackParameterList>();

export type AppStackParameterList = {
  Splash: undefined;
  Main?: undefined;

  Register: undefined;
  CreateWallet: undefined;

  Seed: { mnemonic: string; accountName: string };
  SeedConfirm: { mnemonic: string; accountName: string };
  ImportWallet: undefined;

  Unlock: undefined;
};

const App = () => {
  const options = {
    headerShown: false,
  };
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <Popup />
          <NavigationContainer theme={DarkTheme}>
            <Stack.Navigator
              screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}>
              <Stack.Screen
                name="Splash"
                component={Splash}
                options={{
                  headerShown: false,
                  cardStyleInterpolator:
                    CardStyleInterpolators.forFadeFromBottomAndroid,
                }}
              />
              <Stack.Screen
                name="Main"
                component={Main}
                options={{
                  headerShown: false,
                  gestureEnabled: false,
                  cardStyleInterpolator:
                    CardStyleInterpolators.forFadeFromBottomAndroid,
                }}
              />

              <Stack.Screen
                name="Register"
                component={Register}
                options={options}
              />
              <Stack.Screen
                name="CreateWallet"
                component={CreateWallet}
                options={options}
              />
              <Stack.Screen name="Seed" component={Seed} options={options} />
              <Stack.Screen
                name="SeedConfirm"
                component={SeedConfirm}
                options={options}
              />

              <Stack.Screen
                name="ImportWallet"
                component={ImportWallet}
                options={options}
              />

              <Stack.Screen
                name="Unlock"
                component={Unlock}
                options={options}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
