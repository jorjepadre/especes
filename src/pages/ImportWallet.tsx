import { StackScreenProps } from '@react-navigation/stack';
import { AppStackParameterList } from '../app';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import InputField, {
  InputActions,
  useInputReducer,
} from '../components/InputField';
import { useState } from 'react';
import { BLOCKCHAIN_LIST } from '../utils/const';
import DismissKeyboardView from '../components/DismissKeyboardView';
import { screenHeight, screenWidth, typography } from '../assets';
import ItemSelector from '../components/ItemSelector';
import Button from '../components/Button';
import { hdkey } from 'ethereumjs-wallet';
import * as bip39 from 'bip39';
import { reduceAccounts, setPassword } from '../store/reducers/wallet';
import utils from '../utils';
import { setChainType, setMnemonic } from '../store/reducers/chain';

const ImportWallet = (
  props: StackScreenProps<AppStackParameterList, 'ImportWallet'>
) => {
  const dispatch = useDispatch();

  const [accountName, accountNameDispatch] = useInputReducer('Copper');
  const [password, passwordDispatch] = useInputReducer('11111111');
  const [passwordConfirm, passwordConfirmDispatch] =
    useInputReducer('11111111');
  const [seed, seedDispatch] = useInputReducer(
    'garden ship gap there process same opera explain insane love wealth reform'
  );
  const [networkSelected, setNetworkSelected] =
    useState<keyof typeof BLOCKCHAIN_LIST>('eth');

  return (
    <DismissKeyboardView>
      <SafeAreaView style={styles.container}>
        <View style={styles.title}>
          <Text style={typography.title1}>Import Wallet</Text>
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
          <Text style={typography.title2}>Secret Backup Phrase</Text>
          <InputField
            state={seed}
            style={{
              height: screenHeight * 0.07,
              textAlignVertical: 'top',
              flexDirection: 'row',
              color: '#ffffff',
            }}
            contentContainerStyle={{ height: screenHeight * 0.07 }}
            dispatch={seedDispatch}
            placeholder="Paste or Insert Mnemonic Phrase separated with spaces"
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
                // Mnemonic Check
                let guard = true;
                try {
                  hdkey.fromMasterSeed(
                    bip39.mnemonicToSeedSync(seed.value.toLowerCase().trim())
                  );
                  guard = false;
                } catch (e) {
                  seedDispatch({
                    type: InputActions.SET_ERROR,
                    payload: 'Wrong Secret Backup Phrase. Please, try again.',
                  });
                  guard = true;
                }

                if (
                  !(
                    accountNameError ||
                    passwordError ||
                    passwordConfirmError ||
                    guard
                  )
                ) {
                  dispatch(setPassword(password.value));
                  dispatch(setChainType(networkSelected));
                  dispatch(reduceAccounts(accountName.value));
                  setTimeout(() =>
                    dispatch(setMnemonic(seed.value.toLowerCase().trim()))
                  );
                  props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Splash' }],
                  });
                }
              }}>
              Import Wallet
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </DismissKeyboardView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: { marginTop: screenHeight * 0.02 },
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

export default ImportWallet;
