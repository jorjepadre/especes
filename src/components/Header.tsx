import { Clipboard, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { fontScale, screenHeight, screenWidth, typography } from '../assets';
import store from '../store';
import DismissKeyboardView from './DismissKeyboardView';
import { addTimeout, countDown, showPopup } from '../store/reducers/popup';
import { useAccount } from '../utils/hooks';

const Header = () => {
  const dispatch = useDispatch();
  const wallet = store.getState().wallet;
  const accountName = wallet.accounts[wallet.selectedAccount].name;
  const { pub } = useAccount();
  return (
    <SafeAreaView>
      <DismissKeyboardView>
        <>
          <View style={styles.title}>
            <View style={{ alignItems: 'center' }}>
              <Text style={typography.title2}>{accountName}</Text>
              <TouchableOpacity
                onPress={() => {
                  Clipboard.setString(pub);
                  dispatch(showPopup('Copied Wallet Address'));
                  dispatch(addTimeout(setTimeout(() => dispatch(countDown()), 2000)));
                }}>
                <Text style={{ color: '#ffffff' }}>{pub.slice(0, 6) + '. . .' + pub?.slice(-6)}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      </DismissKeyboardView>
    </SafeAreaView>
  );
};

export default React.memo(Header);

const styles = StyleSheet.create({
  title: {
    alignItems: 'center',
    height: screenHeight * 0.09,
    paddingVertical: screenHeight * 0.02,
    backgroundColor: '#9b924d',
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
  },
});
