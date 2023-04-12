import { Image, StyleSheet, View } from 'react-native';
import { screenHeight, screenWidth } from '../assets';

const Watermark = () => (
  <View style={styles.watermarkContainer}>
    <Image
      source={require('../assets/icons/icon2.png')}
      resizeMode="contain"
      style={{ ...styles.watermarkImage, width: screenWidth * 0.4 }}
    />
    <Image
      source={require('../assets/icons/logo2.png')}
      resizeMode="contain"
      style={styles.watermarkImage}
    />
  </View>
);

const styles = StyleSheet.create({
  watermarkContainer: {
    position: 'absolute',
    top: '30%',
    alignItems: 'center',
  },
  watermarkImage: {
    width: screenWidth * 0.8,
    height: screenHeight * 0.2,
    opacity: 0.05,
    // backgroundColor: '#fff',
  },
});

export default Watermark;
