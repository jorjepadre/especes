import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, View, Text } from 'react-native';
import { SettingsStackParameterList } from './Settings';
import { screenHeight, screenWidth, typography } from '../assets';
import Button from '../components/Button';
import { useState } from 'react';
import InputField, {
  InputActions,
  useInputReducer,
} from '../components/InputField';
import store, { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { setPassword } from '../store/reducers/wallet';
import ItemSelector from '../components/ItemSelector';
import {
  setBiometricsAllowed,
  setSessionTimeout,
} from '../store/reducers/security';
import ReactNativeBiometrics from 'react-native-biometrics';
import { SafeAreaView } from 'react-native-safe-area-context';

const Security = (
  props: StackScreenProps<SettingsStackParameterList, 'Security'>
) => {
  const dispatch = useDispatch();

  // Password Change
  const password = store.getState().wallet.password;
  const [passwordOld, passwordOldDispatch] = useInputReducer('11111111');
  const [passwordNew, passwordNewDispatch] = useInputReducer('00000000');
  const [passwordNewConfirm, passwordNewConfirmDispatch] =
    useInputReducer('00000000');

  // Lock TimeOut
  const [lockTimeOut, lockTimeOutDispatch] = useInputReducer();

  // Biometrics
  const [changePasswordFlag, setChangePasswordFlag] = useState(false);
  const [changeLockTimeOutFlag, setChangeLockTimeOutFlag] = useState(false);
  const [allowBiometricFlag, setAllowBiometricFlag] = useState(false);
  const [isBiometricsAllowed, setIsBiometricsAllowed] = useState(false);

  return (
    <View>
      <SafeAreaView>
        <View style={styles.title}>
          <Text style={typography.title1}>Security</Text>
        </View>
      </SafeAreaView>
      <View style={{ alignItems: 'center' }}>
        <Button
          type="settingsButton"
          onPress={() => {
            setChangePasswordFlag(!changePasswordFlag);
          }}>
          Change Password
        </Button>
        {changePasswordFlag && (
          <View>
            <View style={styles.input}>
              <Text style={typography.title2}>
                Password (Minimum 8 Characters)
              </Text>
              <InputField
                secureTextEntry
                state={passwordOld}
                dispatch={passwordOldDispatch}
                placeholder={'Old Password'}
              />
            </View>

            <View style={styles.input}>
              <Text style={typography.title2}>
                Password (Minimum 8 Characters)
              </Text>
              <InputField
                secureTextEntry
                state={passwordNew}
                dispatch={passwordNewDispatch}
                placeholder={'New Password'}
              />
            </View>

            <View style={styles.input}>
              <Text style={typography.title2}>Confirm Password</Text>
              <InputField
                secureTextEntry
                state={passwordNewConfirm}
                dispatch={passwordNewConfirmDispatch}
                placeholder={'Confirm New Password'}
              />
            </View>

            <View style={{ alignSelf: 'center' }}>
              <Button
                type="primary"
                onPress={() => {
                  const wrong = password !== passwordOld.value;
                  const tooShort = passwordNew.value.length < 8;
                  const noMatch =
                    passwordNew.value !== passwordNewConfirm.value;

                  if (wrong)
                    passwordOldDispatch({
                      type: InputActions.SET_ERROR,
                      payload: 'IncorrectPassword',
                    });
                  if (tooShort)
                    passwordNewDispatch({
                      type: InputActions.SET_ERROR,
                      payload: 'The password is too short',
                    });
                  if (noMatch) {
                    passwordNewConfirmDispatch({
                      type: InputActions.SET_ERROR,
                      payload: 'Passwords do not match.',
                    });
                    passwordNewDispatch({
                      type: InputActions.SET_ERROR,
                      payload: 'Passwords do not match.',
                    });
                  }
                  if (!wrong && !tooShort && !noMatch) {
                    dispatch(setPassword(passwordNew.value));
                    props.navigation.goBack();
                  }
                }}>
                Change Password
              </Button>
            </View>
          </View>
        )}

        <Button
          type="settingsButton"
          onPress={() => {
            setChangeLockTimeOutFlag(!changeLockTimeOutFlag);
          }}>
          Change Lock Timeout
        </Button>
        {changeLockTimeOutFlag && (
          <View style={{ width: screenWidth * 0.62, alignItems: 'center' }}>
            <Text style={{ alignSelf: 'center' }}>Set Up Auto Lock Time</Text>
            <InputField
              state={lockTimeOut}
              dispatch={lockTimeOutDispatch}
              placeholder={'Insert Lock Time Out (minutes)'}
            />
            <Button
              type="primary"
              onPress={() => {
                dispatch(setSessionTimeout(lockTimeOut.value));
                props.navigation.goBack();
              }}>
              Confirm
            </Button>
          </View>
        )}
        <Button
          type="settingsButton"
          onPress={() => {
            setAllowBiometricFlag(!allowBiometricFlag);
          }}>
          Allow Biometrics
        </Button>
        {allowBiometricFlag && (
          <View>
            <View style={styles.input}>
              <Text style={typography.title2}>Biometrics On/OFF</Text>
            </View>
            <View style={{ alignSelf: 'center' }}>
              {!isBiometricsAllowed ? (
                <Button
                  type="primary"
                  onPress={() => {
                    setIsBiometricsAllowed(true);
                    ReactNativeBiometrics.isSensorAvailable().then((res) => {
                      if (res.available) dispatch(setBiometricsAllowed(true));
                    });
                  }}>
                  Turn ON
                </Button>
              ) : (
                <Button
                  type="outline"
                  onPress={() => {
                    setIsBiometricsAllowed(false);
                    dispatch(setBiometricsAllowed(false));
                  }}>
                  Turn OFF
                </Button>
              )}
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    alignItems: 'center',
    marginBottom: screenHeight * 0.03,
    padding: screenHeight * 0.03,
    backgroundColor: '#9b924d',
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
  },
  input: {
    alignItems: 'center',
    marginBottom: screenHeight * 0.01,
    paddingHorizontal: screenWidth * 0.05,
    paddingVertical: screenHeight * 0.01,
  },
});

export default Security;
