import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParameterList } from './Home';
import { View, StyleSheet, Image, ActivityIndicator, Text } from 'react-native';
import { useAccount } from '../utils/hooks';
import { fontScale, screenHeight } from '../assets';
import QRCode from 'react-native-qrcode-svg';

const Receive = (props: StackScreenProps<HomeStackParameterList, 'Receive'>) => {
  const { tokenData } = props.route.params;
  const { pub } = useAccount();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headText}>Receive {tokenData.token_id}</Text>
      </View>
      <View style={styles.QRCode}>{pub ? <QRCode value={JSON.stringify({ address: pub })} size={screenHeight * 0.25} /> : <ActivityIndicator size={'large'} color={'#01A0C7'} />}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: screenHeight * 0.04,
  },
  headText: {
    fontSize: fontScale * 22,
    color: '#ffffff',
    fontFamily: 'OpenSans-Bold',
    marginHorizontal: screenHeight * 0.1,
  },
  QRCode: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: screenHeight * 0.26,
    width: screenHeight * 0.26,
    backgroundColor: '#ffffff',
    padding: screenHeight * 0.005,
  },
});

export default Receive;
