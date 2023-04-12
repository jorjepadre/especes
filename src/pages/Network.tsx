import { StackScreenProps } from '@react-navigation/stack';
import { SettingsStackParameterList } from './Settings';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { screenHeight, screenWidth, typography } from '../assets';
import { BLOCKCHAIN_LIST } from '../utils/const';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import ItemSelector from '../components/ItemSelector';
import Button from '../components/Button';
import { setChainType } from '../store/reducers/chain';
import store from '../store';

const Network = (
  props: StackScreenProps<SettingsStackParameterList, 'Network'>
) => {
  const dispatch = useDispatch();
  const [networkSelected, setNetworkSelected] = useState<
    keyof typeof BLOCKCHAIN_LIST
  >(store.getState().chain.type);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.title}>
          <Text style={typography.title1}>Create Account</Text>
        </View>
      </SafeAreaView>

      <View style={styles.input}>
        <Text style={typography.title2}>Select Network</Text>
        <ItemSelector
          data={['eth', 'sol']}
          selected={networkSelected}
          setSelected={setNetworkSelected}
        />
      </View>

      <View style={{ alignItems: 'center' }}>
        <Button
          type="primary"
          onPress={() => {
            dispatch(setChainType(networkSelected));
            if (networkSelected === 'eth') {
              if (store.getState().chain.eth.accounts.length > 1)
                props.navigation.goBack();
            } else {
              if (store.getState().chain.sol.accounts.length > 1)
                props.navigation.goBack();
            }
          }}>
          Confirm
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
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

export default Network;
