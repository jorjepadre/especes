import { View, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParameterList } from './Home';

const Scan = (props: StackScreenProps<HomeStackParameterList, 'Scan'>) => {
  return (
    <View>
      <Text>Scan WWS</Text>
    </View>
  );
};

export default Scan;
