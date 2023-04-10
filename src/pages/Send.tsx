import { StackScreenProps } from '@react-navigation/stack';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { HomeStackParameterList } from './Home';
import { useEthGasFee } from '../utils/eth';
import { useEffect } from 'react';
import InputField, { InputActions, useInputReducer } from '../components/InputField';
import DismissKeyboardView from '../components/DismissKeyboardView';
import { fontScale, screenHeight, screenWidth, typography } from '../assets';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';

const Send = (props: StackScreenProps<HomeStackParameterList, 'Send'>) => {
  const { tokenData, balance, rate } = props.route.params;

  const [amount, amountDispatch] = useInputReducer();
  const [description, descriptionDispatch] = useInputReducer();
  const [address, addressDispatch] = useInputReducer(props.route.params.address);

  //   const fee = tokenData.ticker === 'ETH' ? useEthGasFee : useSolGasFee;
  const fee = useEthGasFee();
  useEffect(() => {
    addressDispatch({ type: InputActions.SET_VALUE, payload: props.route.params.address ?? '' });
  }, [props.route.params]);

  return (
    <DismissKeyboardView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headText}>Send {tokenData.token_id}</Text>
        </View>

        <View style={styles.assets}>
          <Text style={typography.title2}>Balance</Text>
          <View style={styles.tokenBox}>
            <Image source={require('../assets/icons/eth_logo.png')} style={styles.tokenLogo} />
            <View style={styles.tokenInfo}>
              <Text style={typography.title2}>{tokenData.name !== '' ? tokenData.name : tokenData.ticker}</Text>
              <Text style={typography.title3}>{(balance ?? '') + ' ' + tokenData.ticker}</Text>
            </View>
            <Text style={styles.rate}>{(rate * balance).toFixed(2)} USD</Text>
          </View>
        </View>

        <View style={{ marginVertical: '5%', alignItems: 'center' }}>
          <Text style={{ ...typography.title2 }}>Scan QR Code To Send</Text>
          <TouchableOpacity
            onPress={async () => {
              const permission = Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;
              const result = await request(permission);
              if (result === RESULTS.GRANTED) props.navigation.navigate('Scan', props.route.params);
            }}>
            <Image source={require('../assets/icons/qr.png')} style={{ tintColor: '#9b924d' }} />
          </TouchableOpacity>
        </View>
      </View>
    </DismissKeyboardView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%',
    paddingTop: '10%',
  },
  tokenLogoBig: {
    width: screenHeight * 0.08,
    height: screenHeight * 0.08,
    resizeMode: 'contain',
    borderRadius: 8,
    marginBottom: '3%',
  },
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
  tokenInfo: {
    marginLeft: '4%',
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
  tokenLogo: {
    width: screenHeight * 0.04,
    height: screenHeight * 0.04,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  rate: {
    position: 'absolute',
    right: '5%',
    fontSize: fontScale * 16,
    color: '#ffffff',
    fontFamily: 'OpenSans-Regular',
  },
  maxButton: {
    color: '#00A0C8',
    fontSize: fontScale * 16,
    fontFamily: 'OpenSans-Regular',
  },
  assets: { marginBottom: '7%' },
  button: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: '5%',
  },
});

export default Send;
