import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
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

import Main from '../pages/Main';

const Stack = createStackNavigator<AppStackParameterList>();

export type AppStackParameterList = {
  Splash: undefined;
  Main?: { screen: string };

  Register: undefined;
  CreateWallet: undefined;

  Seed: { mnemonic: string; accountName: string };
  ConfirmSeed: { mnemonic: string; accountName: string };
  WalletCreated: undefined;
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
            <Stack.Navigator screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}>
              <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }} />

              <Stack.Screen name="Register" component={Register} options={options} />
              <Stack.Screen name="CreateWallet" component={CreateWallet} options={options} />
              <Stack.Screen name="Seed" component={Seed} options={options} />
              {/* <Stack.Screen name="ConfirmSeed" component={ConfirmSeed} options={{}} /> */}
              {/* <Stack.Screen name="WalletCreated" component={WalletCreated} options={{}} /> */}

              {/* <Stack.Screen name="ImportWallet" component={ImportWallet} options={{}} /> */}

              <Stack.Screen name="Main" component={Main} options={options} />
              {/* <Stack.Screen name="Unlock" component={Unlock} options={{}} /> */}
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
