import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParameterList } from './Home';
import { Image, StyleSheet, Text, View } from 'react-native';
import store from '../store';
import { sendSol, useSolConnection } from '../utils/sol';
import { sendEth, useEthConnection, useEthGasFee } from '../utils/eth';
import { fontScale, screenHeight, screenWidth, typography } from '../assets';
import Button from '../components/Button';
import { useAccount, useConnection, useFee } from '../utils/hooks';

const SendConfirm = (
  props: StackScreenProps<HomeStackParameterList, 'SendConfirm'>
) => {
  const { tokenData, amount, address } = props.route.params;
  const connection = useConnection();
  const account = useAccount();
  const fee = useFee(address, amount);
  const send = async (address: string, amount: number) => {
    if (tokenData.ticker === 'ETH') {
      // console.log('chebucshe');
      await sendEth(address, amount.toString(), account, connection);
    } else await sendSol(address, amount.toString(), account, connection);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headText}>Confirm Send {tokenData.token_id}</Text>
      </View>
      <View>
        <View style={styles.wws}>
          <Text style={{ ...typography.title1, ...styles.heading }}>
            Recipient Address
          </Text>
        </View>
        <View style={styles.info}>
          <Text>{address}</Text>
        </View>
        <View style={styles.wws}>
          <Text style={{ ...typography.title1, ...styles.heading }}>
            Amount to be Sent
          </Text>
        </View>
        <View style={styles.info}>
          <Text>{amount}</Text>
        </View>
        <View style={styles.wws}>
          <Text style={{ ...typography.title1, ...styles.heading }}>
            Gas Fee
          </Text>
        </View>
        <View style={styles.info}>
          <Text>{fee}</Text>
        </View>
      </View>

      <Button
        style={styles.button}
        onPress={async () => {
          await send(address, amount);
          props.navigation.navigate('HomePage');
        }}>
        Confirm
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: '5%', paddingTop: '10%' },
  header: {
    alignSelf: 'center',
    alignItems: 'center',
    bottom: screenHeight * 0.03,
  },
  headText: {
    fontSize: fontScale * 22,
    color: '#ffffff',
    fontFamily: 'OpenSans-Bold',
  },
  tokenLogoBig: {
    width: screenHeight * 0.08,
    height: screenHeight * 0.08,
    resizeMode: 'contain',
    borderRadius: 8,
    marginBottom: '3%',
  },
  wws: {
    color: '#ffffff',
    fontFamily: 'OpenSans-Bold',
    marginTop: screenHeight * 0.02,
    marginHorizontal: screenWidth * 0.02,
    paddingHorizontal: screenWidth * 0.02,
    paddingVertical: screenHeight * 0.01,
  },
  assets: { marginBottom: '7%' },
  tokenLogo: {
    width: screenHeight * 0.04,
    height: screenHeight * 0.04,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  tokenBox: {
    width: '100%',
    height: screenHeight * 0.08,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    padding: '4%',
    marginTop: screenHeight * 0.01,
    backgroundColor: '#2a2a2a',
  },
  tokenInfo: {
    marginLeft: '4%',
  },
  heading: {},
  info: {
    fontFamily: 'OpenSans-Bold',
    marginHorizontal: screenWidth * 0.02,
    paddingHorizontal: screenWidth * 0.02,
    paddingVertical: screenHeight * 0.01,
    borderRadius: screenWidth * 0.02,
    borderWidth: 1,
    borderColor: '#9b924d',
  },
  button: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: '5%',
  },
});

export default SendConfirm;
