import { StackScreenProps } from '@react-navigation/stack';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { HomeStackParameterList } from './Home';
import { isEthAddressValid, useEthGasFee } from '../utils/eth';
import { useEffect, useState } from 'react';
import InputField, {
  InputActions,
  useInputReducer,
} from '../components/InputField';
import DismissKeyboardView from '../components/DismissKeyboardView';
import { fontScale, screenHeight, screenWidth, typography } from '../assets';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import store from '../store';
import Button from '../components/Button';
import { isSolAddressValid } from '../utils/sol';
import { useFee } from '../utils/hooks';

const Send = (props: StackScreenProps<HomeStackParameterList, 'Send'>) => {
  const [amount, amountDispatch] = useInputReducer('0.01');
  const [address, addressDispatch] = useInputReducer(
    '9NZ1UWLy7CDSQkkxpXpnEtRAoER9DyCjBFudfGLwhGgy'
  );
  const { tokenData, balance, rate } = props.route.params;

  useEffect(() => {
    addressDispatch({
      type: InputActions.SET_VALUE,
      payload: props.route.params.address ?? '',
    });
  }, [props.route.params]);

  const fee = useFee(address.value, +amount.value);

  const isAddressValid = (address: string) => {
    if (tokenData.ticker === 'ETH') return isEthAddressValid(address);
    else return isSolAddressValid(address);
  };

  return (
    <DismissKeyboardView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headText}>Send {tokenData.token_id}</Text>
        </View>

        <View style={styles.assets}>
          <Text style={typography.title2}>Balance</Text>
          <View style={styles.tokenBox}>
            {store.getState().chain.type === 'eth' ? (
              <Image
                source={require('../assets/icons/eth_logo.png')}
                style={styles.tokenLogo}
              />
            ) : (
              <Image
                source={require('../assets/icons/sol_logo.png')}
                style={styles.tokenLogo}
              />
            )}
            <View style={styles.tokenInfo}>
              <Text style={typography.title2}>
                {tokenData.name !== '' ? tokenData.name : tokenData.ticker}
              </Text>
              <Text style={typography.title3}>
                {(balance.toFixed(6) ?? '') + ' ' + tokenData.ticker}
              </Text>
            </View>
            <Text style={styles.rate}>{(rate * balance).toFixed(2)} USD</Text>
          </View>
        </View>

        <View style={{ alignItems: 'center' }}>
          <Text style={{ ...typography.title2 }}>Scan QR Code To Send</Text>
          <TouchableOpacity
            onPress={async () => {
              const permission =
                Platform.OS === 'ios'
                  ? PERMISSIONS.IOS.CAMERA
                  : PERMISSIONS.ANDROID.CAMERA;
              const result = await request(permission);
              console.log(result);
              if (result === RESULTS.GRANTED) {
                props.navigation.navigate('Scan', props.route.params);
              }
            }}>
            <Image
              source={require('../assets/icons/qr.png')}
              style={{ tintColor: '#9b924d' }}
            />
          </TouchableOpacity>
        </View>

        <View style={{ ...styles.input, marginTop: screenHeight * 0.02 }}>
          <Text style={typography.title2}>Recipient Address</Text>
          <InputField
            state={address}
            dispatch={addressDispatch}
            placeholder={'Address'}
          />
        </View>
        <View style={{ ...styles.input, marginTop: screenHeight * 0.02 }}>
          <Text style={typography.title2}>Amount to be Sent</Text>
          <InputField
            state={amount}
            dispatch={amountDispatch}
            placeholder={'0.00'}
          />
        </View>

        <Button
          style={styles.button}
          disabled={
            balance < +amount.value + +(fee ?? 0) || +amount.value < 0.01
          }
          onPress={() => {
            // On top of this, there goes try catch that checks if address is valid and dispatches in catch
            try {
              if (+amount.value === 0 || address.value.trim() === '') {
                if (+amount.value === 0)
                  amountDispatch({
                    type: InputActions.SET_ERROR,
                    payload: 'Provide the amount',
                  });
                if (address.value.trim() === '')
                  addressDispatch({
                    type: InputActions.SET_ERROR,
                    payload: 'Provide the address',
                  });
              } else {
                if (!isAddressValid(address.value)) {
                  addressDispatch({
                    type: InputActions.SET_ERROR,
                    payload: 'Invalid Address',
                  });
                } else {
                  props.navigation.navigate('SendConfirm', {
                    tokenData,
                    amount: +amount.value,
                    fee: +fee!,
                    address: address.value.trim(),
                  });
                }
              }
            } catch {
              addressDispatch({
                type: InputActions.SET_ERROR,
                payload: 'Invalid Address',
              });
            }
          }}>
          {balance < +amount.value + +(fee ?? 0) || +amount.value < 0.01
            ? 'Not enough funds'
            : 'Send'}
        </Button>
      </View>
    </DismissKeyboardView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%',
    paddingTop: '7%',
  },
  tokenLogoBig: {
    width: screenHeight * 0.08,
    height: screenHeight * 0.08,
    resizeMode: 'contain',
    borderRadius: 8,
    // marginBottom: '3%',
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
  assets: { marginBottom: '7%' },
  button: {
    alignSelf: 'center',
    // position: 'absolute',
    // bottom: '5%',
  },

  input: {
    marginBottom: screenHeight * 0.01,
    paddingHorizontal: screenWidth * 0.05,
    paddingVertical: screenHeight * 0.01,
  },
});

export default Send;
