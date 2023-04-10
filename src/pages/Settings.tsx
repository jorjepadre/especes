import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TabBarParameterList } from './TabBar';
import { Text, View } from 'react-native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import SettingsPage from './SettingsPage';
import AccountsInfo from './AccountsInfo';

export type SettingsStackParameterList = {
  Settings: undefined;
  AccountsInfo: undefined;
  AddressManagement: undefined;
  ChangePassword: undefined;
  Network: undefined;
  ImportFromKey: undefined;
  Register: undefined;
  Security: undefined;
  SecurityLock: undefined;
  SessionTimeout: undefined;
  Splash: undefined;
};

const Stack = createStackNavigator<SettingsStackParameterList>();

const Settings = (props: BottomTabScreenProps<TabBarParameterList, 'Settings'>) => {
  return (
    <Stack.Navigator id="SettingsStack" screenOptions={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}>
      <Stack.Screen name="Settings" component={SettingsPage} />
      <Stack.Screen name="AccountsInfo" component={AccountsInfo} />
      {/* <Stack.Screen name="AddressManagement" component={AddressManagement} /> */}
      {/* <Stack.Screen name="ChangePassword" component={ChangePassword} /> */}
      {/* <Stack.Screen name="Network" component={Network} /> */}
      {/* <Stack.Screen name="ImportFromKey" component={ImportFromKey} /> */}
      {/* <Stack.Screen name="Security" component={Security} /> */}
      {/* <Stack.Screen name="SecurityLock" component={SecurityLock} /> */}
      {/* <Stack.Screen name="SessionTimeout" component={SessionTimeout} /> */}
    </Stack.Navigator>
  );
};

export default Settings;
