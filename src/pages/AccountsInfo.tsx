import { StackScreenProps } from '@react-navigation/stack';
import { SettingsStackParameterList } from './Settings';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { getAccount, useAccount } from '../utils/hooks';
import store, { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { fontScale, screenHeight, screenWidth, typography } from '../assets';
import Button from '../components/Button';
import InputField, { useInputReducer } from '../components/InputField';
import {
  addAccount,
  changeAccountName,
  removeAccount,
  setSelectedAccount,
} from '../store/reducers/wallet';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const AccountsInfo = (
  props: StackScreenProps<SettingsStackParameterList, 'AccountsInfo'>
) => {
  const { name, nonce, pub, pri } = useAccount();
  const [changeAccountNameFlag, setChangeAccountNameFlag] = useState(false);
  const [accountName, accountNameDispatch] = useInputReducer();
  // console.log(name, nonce, pub, pri);
  // console.log('Chain', store.getState().chain['eth']);
  // console.log('Wallet', store.getState().wallet);

  let accountArray: any[] = [];
  const [accounts, setAccounts] = useState(accountArray);
  const accountNames = useSelector((state: RootState) => state.wallet.accounts);
  const selected = useSelector(
    (state: RootState) => state.wallet.selectedAccount
  );

  const dispatch = useDispatch();

  useEffect(() => {
    for (let i = 0; i < accountNames.length; i++) {
      const account = getAccount(store.getState(), accountNames[i].nonce)!;
      accountArray.push(account);
    }
    setAccounts([...accountArray]);
  }, [accountNames]);

  const AccountItem = ({ index, item }: { index: number; item: any }) => (
    <TouchableOpacity
      style={{
        ...styles.listTouchable,
        backgroundColor: selected === index ? '#9b924d' : '#4D4D4D',
      }}
      onPress={() => {
        dispatch(setSelectedAccount(index));
      }}>
      <View style={{ flexDirection: 'row' }}>
        <View>
          <Text numberOfLines={1} style={[typography.title2]}>
            {accountNames[index]?.name}
          </Text>
          <Text
            style={selected === index ? typography.title1 : typography.title3}>
            {item.pub.toString().slice(0, 6) +
              '...' +
              item.pub.toString().slice(-6)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.title}>
          <Text style={typography.title1}>Accounts</Text>
        </View>
      </SafeAreaView>

      <View style={styles.accountName}>
        {!changeAccountNameFlag ? (
          <View>
            <TouchableOpacity
              onPress={() => {
                setChangeAccountNameFlag(true);
              }}>
              <Text style={typography.title1}>
                {store.getState().wallet.accounts[selected].name}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <InputField
              state={accountName}
              dispatch={accountNameDispatch}
              placeholder={'Insert Account Name'}
            />
            <Button
              onPress={() => {
                if (accountName.value.trim() !== '') {
                  dispatch(
                    changeAccountName({
                      name: accountName.value,
                      index: selected,
                    })
                  );
                  setChangeAccountNameFlag(false);
                }
              }}>
              Confirm
            </Button>
          </View>
        )}
      </View>

      <View>
        <FlatList
          keyExtractor={(item) => item.pub.toString()}
          showsVerticalScrollIndicator={false}
          data={accounts}
          renderItem={AccountItem}
        />
        <View style={{ alignItems: 'center' }}>
          <Button
            type="primary"
            onPress={() => {
              const accounts = store.getState().wallet.accounts;
              if (accounts.length < 10) {
                const usedAccounts = accounts.map((account) => account.nonce);
                for (let i = 0; i < 10; i++) {
                  if (!usedAccounts.includes(i)) {
                    dispatch(
                      addAccount({ name: `Account ${i + 1}`, nonce: i })
                    );
                    break;
                  }
                }
              }
            }}>
            Add Account
          </Button>
          {store.getState().wallet.accounts.length > 1 && (
            <Button
              type="secondary"
              onPress={() => {
                dispatch(removeAccount(selected));
              }}>
              Remove Account
            </Button>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    alignItems: 'center',
    marginBottom: screenHeight * 0.03,
    padding: screenHeight * 0.03,
    backgroundColor: '#9b924d',
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
  },
  accountName: {
    alignItems: 'center',
    marginTop: screenHeight * 0.02,
    marginBottom: screenHeight * 0.03,
    color: '#ffffff',
    fontFamily: 'OpenSans-Bold',
    fontSize: fontScale * 26,
  },
  listTouchable: {
    borderRadius: screenWidth * 0.03,
    marginHorizontal: screenWidth * 0.05,
    marginVertical: screenHeight * 0.005,
    paddingHorizontal: screenWidth * 0.05,
    paddingVertical: screenHeight * 0.005,
  },
});

export default AccountsInfo;
