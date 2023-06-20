import { Image, StyleSheet, Text, View } from 'react-native';
import { fontScale, screenHeight, screenWidth } from '../assets';

const Offline = () => {
  console.log('Inside offline');
  return (
    <View style={styles.container}>
      <Image source={require('../assets/icons/offline.png')} style={styles.image} />
      <Text style={styles.text}>No Internet Connection</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: screenWidth * 0.05,
    paddingVertical: screenHeight * 0.05,
  },
  image: {
    height: screenHeight * 0.3,
    width: screenWidth * 0.5,
    resizeMode: 'contain',
    tintColor: '#4D4D4D',
  },
  text: {
    fontFamily: 'OpenSans-Regular',
    fontSize: fontScale * 20,
    marginTop: screenHeight * 0.069,
    color: '#4D4D4D',
  },
});

export default Offline;
