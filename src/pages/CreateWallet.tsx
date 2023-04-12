import { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { AppStackParameterList } from '../app';
import { useDispatch } from 'react-redux';

import { BLOCKCHAIN_LIST } from '../utils/const';
import KeyboardRemovableView from '../components/DismissKeyboardView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';
import { screenHeight, screenWidth, typography } from '../assets';
import InputField, {
  InputActions,
  useInputReducer,
} from '../components/InputField';
import ItemSelector from '../components/ItemSelector';
import Button from '../components/Button';
import utils from '../utils';
import { setPassword } from '../store/reducers/wallet';
import store from '../store';
import { setChainType } from '../store/reducers/chain';

const CreateWallet = (
  props: StackScreenProps<AppStackParameterList, 'CreateWallet'>
) => {
  const dispatch = useDispatch();

  const [accountName, accountNameDispatch] = useInputReducer();
  const [password, passwordDispatch] = useInputReducer();
  const [passwordConfirm, passwordConfirmDispatch] = useInputReducer();
  const [networkSelected, setNetworkSelected] =
    useState<keyof typeof BLOCKCHAIN_LIST>('eth');

  return (
    <KeyboardRemovableView>
      <SafeAreaView style={styles.container}>
        <View style={styles.title}>
          <Text style={typography.title1}>Create Account</Text>
        </View>

        <View style={styles.input}>
          <Text style={typography.title2}>Account Name</Text>
          <InputField
            state={accountName}
            dispatch={accountNameDispatch}
            placeholder={'Account Name'}
          />
        </View>

        <View style={styles.input}>
          <Text style={typography.title2}>Password (Minimum 8 Characters)</Text>
          <InputField
            secureTextEntry
            state={password}
            dispatch={passwordDispatch}
            placeholder={'Insert Password'}
          />
        </View>

        <View style={styles.input}>
          <Text style={typography.title2}>Confirm Password</Text>
          <InputField
            secureTextEntry
            state={passwordConfirm}
            dispatch={passwordConfirmDispatch}
            placeholder={'Confirm Password'}
          />
        </View>

        <View style={styles.input}>
          <Text style={typography.title2}>Select Network</Text>
          <ItemSelector
            data={['eth', 'sol']}
            selected={networkSelected}
            setSelected={setNetworkSelected}
          />
        </View>

        <View style={styles.button}>
          <View>
            <Button
              type="confirm"
              onPress={async () => {
                // Input Check
                const accountNameError = accountName.value.length <= 0;
                const passwordError = password.value.length < 8;
                const passwordConfirmError =
                  password.value !== passwordConfirm.value;
                if (accountNameError)
                  accountNameDispatch({
                    type: InputActions.SET_ERROR,
                    payload: 'Gimme a name, bro)',
                  });
                if (passwordError)
                  passwordDispatch({
                    type: InputActions.SET_ERROR,
                    payload: 'Not time to go short. Think about security, bro)',
                  });
                if (passwordConfirmError)
                  passwordConfirmDispatch({
                    type: InputActions.SET_ERROR,
                    payload: 'U gotta be consistent, bro)',
                  });

                if (
                  !(accountNameError || passwordError || passwordConfirmError)
                ) {
                  dispatch(setPassword(password.value));
                  dispatch(setChainType(networkSelected));
                  // console.log('Network Selected: ', networkSelected);
                  const mnemonic = await utils[
                    store.getState().chain.type!
                  ].generateMnemonic();
                  props.navigation.navigate('Seed', {
                    accountName: accountName.value,
                    mnemonic,
                  });
                }
              }}>
              Create Account
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardRemovableView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
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
  itemSelector: {
    marginTop: screenHeight * 0.2,
  },
  button: {
    alignItems: 'center',
  },
});

export default CreateWallet;
