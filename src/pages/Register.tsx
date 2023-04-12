import { StackScreenProps } from '@react-navigation/stack';
import { AppStackParameterList } from '../app';
import { Image, Text, View, StyleSheet } from 'react-native';
import Button from '../components/Button';
import { fontScale } from '../assets';

const Register = (
  props: StackScreenProps<AppStackParameterList, 'Register'>
) => {
  return (
    <View style={styles.container}>
      <Image source={require('@assets/icons/icon2.png')} style={styles.logo} />
      <View style={styles.items}>
        <Button onPress={() => props.navigation.navigate('CreateWallet')}>
          <Text style={styles.text}>Create New Wallet</Text>
        </Button>
        <Button
          onPress={() => props.navigation.navigate('ImportWallet')}
          type="secondary">
          <Text style={styles.text}>Import Existing Wallet</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    position: 'absolute',
    width: '69%',
    resizeMode: 'contain',
  },
  items: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    textAlign: 'center',
    top: '110%',
    justifyContent: 'space-evenly',
  },
  text: {
    color: '#F6F1E9',
    fontSize: fontScale * 14,
    fontFamily: 'OpenSans-SemiBold',
  },
});

export default Register;
