import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TabBarParameterList } from './TabBar';
import { Text, View } from 'react-native';

const Settings = (props: BottomTabScreenProps<TabBarParameterList, 'Settings'>) => {
  return (
    <View>
      <Text>Settings WWS</Text>
    </View>
  );
};

export default Settings;
