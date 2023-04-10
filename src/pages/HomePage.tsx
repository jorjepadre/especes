import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParameterList } from './Home';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { screenWidth, screenHeight, fontScale, typography } from '../assets';
import { useAccount, useTokenList } from '../utils/hooks';
import { useCallback, useEffect, useState } from 'react';
import { useEthConnection } from '../utils/eth';
import { NavigationProp, useFocusEffect } from '@react-navigation/native';
import RateTimer from '../components/RateTimer';

const HomePage = (props: StackScreenProps<HomeStackParameterList, 'HomePage'>) => {
  const eth_logo = require('../assets/icons/eth_logo.png');
  const sol_logo = require('../assets/icons/sol_logo.png');
  const other_logo = require('../assets/icons/icon2.png');
  const account = useAccount();
  const tokenList = useTokenList();
  const [selected, setSelected] = useState(0);

  const [balances, setBalances] = useState<number[]>([]);
  const [previousBalances, setPreviousBalances] = useState<number[]>([]);

  const eth = useEthConnection();
  const fetchBalances = async () => {
    const res: number[] = [];
    for (const token of tokenList) {
      if (token.token_id === 'Ethereum') {
        const tokenBalance = await eth.getBalance(account.pub);
        res.push(+tokenBalance / 1e18);
        setBalances([...res]);
      } else {
      }
    }
    setPreviousBalances(res);
  };

  useFocusEffect(
    useCallback(() => {
      fetchBalances();
    }, [account, tokenList])
  );

  useEffect(() => {
    const interval = setInterval(() => {
      fetchBalances();
    }, 5000);
    return () => clearInterval(interval);
  }, [account, tokenList]);

  useEffect(() => {
    setSelected(0);
    while (props.navigation.getState().index > 0) props.navigation.pop();
  }, [account]);

  let rateBridge: number;
  const RateTimer = (props: { navigation: NavigationProp<HomeStackParameterList, 'HomePage'>; balance: number; token_id: string }) => {
    const [rate, setRate] = useState(0);

    useEffect(() => {
      rateBridge = rate;
    }, [rate]);

    useEffect(
      useCallback(() => {
        const rateApiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${props.token_id}&vs_currencies=usd`;
        fetch(rateApiUrl).then((res) => res.json().then((res) => setRate(res[props.token_id].usd)));
        let interval = setInterval(async () => {
          const response = await fetch(rateApiUrl);
          setRate((await response.json())[props.token_id].usd);
        }, 20000);
        const unsubscribe = props.navigation.addListener('blur', () => {
          clearInterval(interval);
        });
        return () => {
          clearInterval(interval);
          unsubscribe();
        };
      }, []),
      []
    );
    return <Text style={styles.rate}>{(rate * props.balance).toFixed(2)} USD</Text>;
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainToken}>
        {tokenList[0].name === 'ETH' ? (
          <Image source={eth_logo} style={styles.mainToken} />
        ) : tokenList[0].name === 'SOL' ? (
          <Image source={sol_logo} style={styles.mainToken} />
        ) : (
          <Image source={other_logo} style={styles.mainToken} />
        )}

        <Text style={styles.balance}>{(balances[selected] ?? previousBalances[selected] ?? '') + ' ' + tokenList[selected].ticker}</Text>
        <RateTimer navigation={props.navigation} balance={balances[0]} token_id={tokenList[0].token_id.toLowerCase()} />
      </View>
      <View style={styles.buttons}>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity style={{ alignItems: 'center', marginBottom: screenHeight * 0.01 }} onPress={() => props.navigation.navigate('Receive', { tokenData: tokenList[selected] })}>
            <Image source={require('../assets/icons/backward.png')} style={{ ...styles.mainToken, tintColor: '#4D4D4D' }} />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity
            style={{ alignItems: 'center', marginBottom: screenHeight * 0.01 }}
            onPress={() =>
              props.navigation.navigate('Send', {
                tokenData: tokenList[selected],
                balance: balances[selected] ?? previousBalances[selected],
                rate: rateBridge,
              })
            }>
            <Image source={require('../assets/icons/forward.png')} style={{ ...styles.mainToken, tintColor: '#9b924d' }} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: screenWidth * 0.05,
    paddingVertical: screenHeight * 0.03,
    marginHorizontal: screenWidth * 0.05,
    marginVertical: screenHeight * 0.03,
    alignItems: 'center',
  },
  mainToken: { width: screenWidth * 0.2, height: screenHeight * 0.15, resizeMode: 'contain', alignItems: 'center' },
  balance: { fontSize: fontScale * 20, fontFamily: 'OpenSans-SemiBold', marginTop: screenHeight * 0.02 },
  buttons: {
    flexDirection: 'row',
    width: '69%',
    justifyContent: 'space-between',
    marginTop: screenHeight * 0.2,
  },
  rate: {
    fontSize: fontScale * 16,
    fontFamily: 'OpenSans-Regular',
  },
});

export default HomePage;
