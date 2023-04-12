import { NavigationProp } from '@react-navigation/native';
import { HomeStackParameterList } from '../pages/Home';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { fontScale } from '../assets';

let rateBridge: number;
const RateTimer = (props: {
  navigation: NavigationProp<HomeStackParameterList, 'HomePage'>;
  balance: number;
  token_id: string;
}) => {
  const [rate, setRate] = useState(0);

  useEffect(() => {
    rateBridge = rate;
  }, [rate]);

  useEffect(
    useCallback(() => {
      const rateApiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${props.token_id}&vs_currencies=usd`;
      fetch(rateApiUrl).then((res) =>
        res.json().then((res) => setRate(res[props.token_id].usd))
      );
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
  return (
    <Text style={styles.rate}>{(rate * props.balance).toFixed(2)} USD</Text>
  );
};

const styles = StyleSheet.create({
  rate: {
    fontSize: fontScale * 16,
    fontFamily: 'OpenSans-Regular',
  },
});

export default RateTimer;
