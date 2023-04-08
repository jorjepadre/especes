import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TabBarParameterList } from './TabBar';
import { Text, View } from 'react-native';

const Home = (props: BottomTabScreenProps<TabBarParameterList, 'Home'>) => {
  return (
    <View>
      <Text>Home WWS</Text>
    </View>
  );
};

export default Home;
