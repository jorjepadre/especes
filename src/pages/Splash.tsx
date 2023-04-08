import { AppState, Image, InteractionManager, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';

import { screenWidth } from '../assets';

import { AppStackParameterList } from '../app';

import store, { RootState } from '../store';
import { setAccounts } from '../store/reducers/chain';
import { setTimeLoggedOut } from '../store/reducers/security';
import utils from '../utils';
import { useMnemonic } from '../utils/hooks';

const Splash = (props: StackScreenProps<AppStackParameterList, 'Splash'>) => {
  const dispatch = useDispatch();
  const seed = useMnemonic();
  const chainType = useSelector((state: RootState) => state.chain.type);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      const routes = props.navigation.getState().routes;
      const isOnUnlockScreen = routes[routes.length - 1].name === 'Unlock';

      // If Seed is Stored
      if (seed) {
        // If in the selected Chain Type there is No Account ==> Generate Keypair and Set Account
        if (store.getState().chain[chainType].accounts.length === 0) {
          utils[chainType].generateKeypairs(seed).then((accounts) => {
            dispatch(setAccounts(accounts));
            if (!isOnUnlockScreen) props.navigation.navigate('Main', { screen: 'TabBar' });
          });
        }
        // If found an existing Account (Keypair) and is not on Unlock Screen==> Move straight to Main and Tabbar
        else if (!isOnUnlockScreen) props.navigation.navigate('Main', { screen: 'TabBar' });
      }

      // If Seed is Not Stored -> Move to Register
      else {
        dispatch(setTimeLoggedOut(Date.now()));
        props.navigation.reset({ index: 0, routes: [{ name: 'Register' }] });
      }
    });
  }, [seed]);

  // useEffect(() => {
  //   const subscribe = AppState.addEventListener('change', (state) => {
  //     const isOnUnlockScreen = props.navigation.getState().routes[props.navigation.getState().routes.length - 1].name === 'Unlock';
  //     if ((state === 'inactive' || state === 'background') && !isOnUnlockScreen) dispatch(setTimeLoggedOut(Date.now()));
  //     if (state === 'active' && store.getState().security.timeLoggedOut + store.getState().security.sessionTimeout * 60 * 1e3 < Date.now() && seed) {
  //   props.navigation.navigate('Unlock');
  // }
  //   });
  //   return () => subscribe.remove();
  // }, []);

  useEffect(() => {
    if (store.getState().security.timeLoggedOut + store.getState().security.sessionTimeout * 60 * 1e3 < Date.now() && seed) {
      props.navigation.navigate('Unlock');
    }
  }, []);

  return (
    <View style={styles.view}>
      <Image source={require('@assets/icons/logo.png')} style={styles.logo} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: screenWidth * 0.9,
    resizeMode: 'contain',
  },
});
