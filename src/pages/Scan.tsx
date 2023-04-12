import { View, Text, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParameterList } from './Home';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { fontScale, screenHeight, screenWidth } from '../assets';
import { Camera } from 'react-native-camera-kit';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import store from '../store';
import { isEthAddressValid } from '../utils/eth';
import { isSolAddressValid } from '../utils/sol';

const Scan = (props: StackScreenProps<HomeStackParameterList, 'Scan'>) => {
  const [message, setMessage] = useState('Scanning QR Code ...');
  useFocusEffect(
    useCallback(() => {
      setMessage('Scanning QR Code ...');
    }, [])
  );

  const isAddressValid = (address: string) => {
    if (store.getState().chain.type === 'eth')
      return isEthAddressValid(address);
    else return isSolAddressValid(address);
  };

  return (
    <View style={StyleSheet.absoluteFill}>
      <Camera
        style={{ flex: 1 }}
        scanBarcode
        onReadCode={(event: { nativeEvent: { codeStringValue: string } }) => {
          const { address } = JSON.parse(event.nativeEvent.codeStringValue);
          if (!isAddressValid(address)) setMessage('Invalid Address');
          else
            props.navigation.navigate('Send', {
              ...props.route.params,
              address: address,
            });
        }}
      />

      <View style={styles.container}>
        <View style={styles.gradient}>
          <Svg
            height={screenHeight * 0.7}
            width={screenWidth}
            style={StyleSheet.absoluteFill}>
            <Defs>
              <LinearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop offset="0" stopOpacity="0" />
                <Stop offset="1" stopColor={'#000000'} />
              </LinearGradient>
            </Defs>
            <Rect
              height={screenHeight * 0.5}
              width={screenWidth}
              fill="url(#gradient)"
            />
          </Svg>
          <Text style={styles.text}>{message}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
  },
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
  },
  text: {
    color: '#9b924d',
    fontSize: fontScale * 24,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: screenHeight * 0.5,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: '5%',
  },
  backButton: {
    position: 'absolute',
    alignSelf: 'flex-start',
    marginLeft: '5%',
    marginTop: '5%',
  },
});

export default Scan;
