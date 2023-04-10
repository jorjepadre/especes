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
  console.log(1);
  useEffect(() => {
    console.log(2);
    InteractionManager.runAfterInteractions(() => {
      console.log(3);
      const routes = props.navigation.getState().routes;
      console.log(4, routes[routes.length - 1].name);
      const isOnUnlockScreen = routes[routes.length - 1].name === 'Unlock';
      console.log(5, routes[routes.length - 1].name);
      // If Seed is Stored
      if (seed) {
        console.log(6, routes[routes.length - 1].name);
        // If in the selected Chain Type there is No Account ==> Generate Keypair and Set Account
        if (store.getState().chain[chainType].accounts.length === 0) {
          console.log(7, routes[routes.length - 1].name);
          utils[chainType].generateKeypairs(seed).then((accounts) => {
            console.log(8, routes[routes.length - 1].name);
            dispatch(setAccounts(accounts));
            console.log(9, routes[routes.length - 1].name);
            if (!isOnUnlockScreen) props.navigation.navigate('Main');
          });
        }
        // If found an existing Account (Keypair) and is not on Unlock Screen ==> Move straight to Main and Tabbar
        else if (!isOnUnlockScreen) {
          console.log(10, routes[routes.length - 1].name);
          if (!isOnUnlockScreen) props.navigation.navigate('Main');
        }
      }
      // If Seed is Not Stored -> Move to Register
      else {
        console.log(11, routes[routes.length - 1].name);
        dispatch(setTimeLoggedOut(Date.now()));
        console.log(12, routes[routes.length - 1].name);
        props.navigation.reset({ index: 0, routes: [{ name: 'Register' }] });
      }
    });
  }, [seed]);

  useEffect(() => {
    console.log(13);
    const subscribe = AppState.addEventListener('change', (state) => {
      console.log(14);
      const routes = props.navigation.getState().routes;
      console.log(15);
      const isOnUnlockScreen = routes[routes.length - 1].name === 'Unlock';
      console.log(16);
      if ((state === 'inactive' || state === 'background') && !isOnUnlockScreen) dispatch(setTimeLoggedOut(Date.now()));
      console.log(17);
      if (state === 'active' && store.getState().security.timeLoggedOut + store.getState().security.sessionTimeout * 60 * 1e3 < Date.now() && seed) {
        console.log(18);
        props.navigation.navigate('Unlock');
      }
    });
    console.log(19);
    return () => subscribe.remove();
  }, []);

  useEffect(() => {
    console.log(20);
    if (store.getState().security.timeLoggedOut + store.getState().security.sessionTimeout * 60 * 1e3 < Date.now() && seed) {
      console.log(21);
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
