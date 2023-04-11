import { View, Text, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParameterList } from './Home';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { fontScale, screenHeight, screenWidth } from '../assets';
import { Camera } from 'react-native-camera-kit';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

const Scan = (props: StackScreenProps<HomeStackParameterList, 'Scan'>) => {
  const [message, setMessage] = useState('Scanning...');
  useFocusEffect(
    useCallback(() => {
      setMessage('Scanning...');
    }, [])
  );

  return (
    <View style={StyleSheet.absoluteFill}>
      <Text>Scan WWS</Text>

      <Camera
        style={{ flex: 1 }}
        scanBarcode
        onReadCode={(event: { nativeEvent: { codeStringValue: string } }) => {
          const barcode = event.nativeEvent.codeStringValue;
          const { address } = JSON.parse(barcode);
          if (false) setMessage('Invalid address. Try scanning again.');
          // else props.navigation.navigate('QRConfirm', { ...props.route.params, address, barcode });
        }}
      />

      <View style={styles.container}>
        <View style={styles.gradient}>
          {/* <Svg height={screenHeight * 0.7} width={screenWidth} style={StyleSheet.absoluteFill}>
            <Defs>
              <LinearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop offset="0" stopOpacity="0" />
                <Stop offset="1" stopColor={'#000000'} />
              </LinearGradient>
            </Defs>
            <Rect height={screenHeight * 0.5} width={screenWidth} fill="url(#gradient)" />
          </Svg> */}
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
    color: '#01A0C7',
    fontSize: fontScale * 16,
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
