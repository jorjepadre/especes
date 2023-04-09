import { CardStyleInterpolators, StackScreenProps, createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';

import AccountInfo from './AccountInfo';
import TabBar from './TabBar';
import { AppStackParameterList } from '../app';

export type MainStackParameterList = {
  AccountInfo?: undefined;
  TabBar: undefined;
};

const Stack = createStackNavigator<MainStackParameterList>();

const Main = (props: StackScreenProps<AppStackParameterList, 'Main'>) => {
  const options = {
    headerShown: false,
    presentation: 'modal',
    cardStyleInterpolator: Platform.OS === 'ios' ? undefined : CardStyleInterpolators.forModalPresentationIOS,
    detachPreviousScreen: false,
    gestureResponseDistance: 1000,
    gestureEnabled: true,
  };
  console.log('Inside Main');

  return (
    <Stack.Navigator id="MainStack">
      <Stack.Screen name="TabBar" component={TabBar} options={{ headerShown: false }} />
      {/* <Stack.Screen name="AccountInfo" component={AccountInfo} options={{ ...options, gestureResponseDistance: undefined }} /> */}
    </Stack.Navigator>
  );
};

export default Main;
