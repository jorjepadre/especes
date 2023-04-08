import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TabBarParameterList } from './TabBar';
import { Text, View } from 'react-native';

const History = (props: BottomTabScreenProps<TabBarParameterList, 'History'>) => {
  return (
    <View>
      <Text>History WWS</Text>
    </View>
  );
};

export default History;
