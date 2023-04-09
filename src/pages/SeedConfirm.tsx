import { StackScreenProps } from '@react-navigation/stack';
import { AppStackParameterList } from '../app';
import { Text, View } from 'react-native';

const SeedConfirm = (props: StackScreenProps<AppStackParameterList, 'ConfirmSeed'>) => {
  return (
    <View>
      <Text>SeedConfirm</Text>
    </View>
  );
};
export default SeedConfirm;
