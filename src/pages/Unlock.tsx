import { StackScreenProps } from '@react-navigation/stack';
import { AppStackParameterList } from '../app';
import Button from '../components/Button';
import DismissKeyboardView from '../components/DismissKeyboardView';
import { Image, StyleSheet, Text, View } from 'react-native';
import InputField, { InputActions, useInputReducer } from '../components/InputField';
import store from '../store';
import { useDispatch } from 'react-redux';
import { setTimeLoggedOut } from '../store/reducers/security';
import { fontScale, screenWidth } from '../assets';
import { useFocusEffect } from '@react-navigation/native';

const Unlock = (props: StackScreenProps<AppStackParameterList, 'Unlock'>) => {
  const [password, passwordDispatch] = useInputReducer();
  const dispatch = useDispatch();

  // useFocusEffect(
  //   useCallback(() => {
  //     if (store.getState().security.biometricsAllowed) setupBiometrics();
  //   }, [])
  // );

  return (
    <DismissKeyboardView>
      <View style={styles.container}>
        <Image source={require('../assets/icons/logo2.png')} style={styles.logo} />
        <InputField secureTextEntry state={password} dispatch={passwordDispatch} placeholder={'Enter password'} />
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => {
              if (store.getState().wallet.password === password.value) {
                passwordDispatch({ type: InputActions.SET_VALUE, payload: '' });
                dispatch(setTimeLoggedOut(Date.now()));
                props.navigation.navigate('Main');
              } else
                passwordDispatch({
                  type: InputActions.SET_ERROR,
                  payload: 'Wrong password. Please, try again.',
                });
            }}>
            Unlock
          </Button>
          <Button type="secondary" onPress={() => props.navigation.navigate('ImportWallet')}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.importText}>Import Wallet</Text>
            </View>
          </Button>
        </View>
      </View>
    </DismissKeyboardView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
    justifyContent: 'center',
    alignItems: 'center',
    padding: screenWidth * 0.08,
  },
  logo: {
    flex: 0.6,
    width: screenWidth * 0.5,
    resizeMode: 'contain',
  },
  buttonContainer: {
    marginVertical: '5%',
    flex: 0.3,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  lock: { marginRight: '1%' },
  importText: {
    color: '#989898',
    fontSize: fontScale * 16,
    fontFamily: 'OpenSans-Regular',
  },
});

export default Unlock;
