import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParameterList } from './Home';
import { Text, View } from 'react-native';

const SendConfirm = (props: StackScreenProps<HomeStackParameterList, 'SendConfirm'>) => {
  return (
    <View>
      <Text>Send Confirm</Text>
    </View>
  );
};

export default SendConfirm;
