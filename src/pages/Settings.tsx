import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TabBarParameterList } from './TabBar';
import { Text, View } from 'react-native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import SettingsPage from './SettingsPage';
import AccountsInfo from './AccountsInfo';
import Security from './Security';
import Management from './Management';
import Network from './Network';

export type SettingsStackParameterList = {
  SettingsPage: undefined;
  AccountsInfo: undefined;
  Management: undefined;
  ChangePassword: undefined;
  Network: undefined;
  Register: undefined;
  Security: undefined;
  Splash: undefined;
};

const Stack = createStackNavigator<SettingsStackParameterList>();

const Settings = (props: BottomTabScreenProps<TabBarParameterList, 'Settings'>) => {
  return (
    <Stack.Navigator id="SettingsStack" screenOptions={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}>
      <Stack.Screen name="SettingsPage" component={SettingsPage} />
      <Stack.Screen name="AccountsInfo" component={AccountsInfo} />
      <Stack.Screen name="Management" component={Management} />
      <Stack.Screen name="Security" component={Security} />
      <Stack.Screen name="Network" component={Network} />
    </Stack.Navigator>
  );
};

export default Settings;
