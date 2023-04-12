import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TabBarParameterList } from './TabBar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { typography, screenHeight } from '../assets';
import { useSelector } from 'react-redux';
import { useAccount } from '../utils/hooks';
import { RootState } from '../store';
import { useCallback, useEffect, useState } from 'react';
import { useEthConnection } from '../utils/eth';
import { useFocusEffect } from '@react-navigation/native';
import { Tx, getTransactions } from '../utils/sol';

const TxRecord = (props: Tx) => (
  <View
    style={{
      marginVertical: '2.5%',
      marginHorizontal: '5%',
      padding: '3%',
      borderWidth: 2,
      borderRadius: 8,
      borderColor: '#9b924d',
    }}>
    {Object.entries(props).map(([key, value]) => (
      <Text style={{ color: '#FFF' }} {...{ key }}>
        {key}:{' '}
        {key !== 'blockTime'
          ? value
          : [
              new Date(value * 1e3).toLocaleDateString(),
              new Date(value * 1e3).toLocaleTimeString(),
            ].join(' ')}
      </Text>
    ))}
  </View>
);

const History = (
  props: BottomTabScreenProps<TabBarParameterList, 'History'>
) => {
  const { pub } = useAccount();
  const chainType = useSelector((state: RootState) => state.chain.type);
  const [txs, setTxs] = useState<Tx[]>([]);
  useFocusEffect(
    useCallback(() => {
      getTransactions(pub, 40).then(setTxs);
    }, [pub])
  );
  const [refreshing, setRefreshing] = useState(false);
  return (
    <SafeAreaView>
      <View style={styles.title}>
        <Text style={typography.title1}>History</Text>
      </View>
      <FlatList
        contentContainerStyle={{ height: '100%' }}
        data={txs}
        {...{ refreshing }}
        onRefresh={async () => {
          setRefreshing(true);
          setTxs(await getTransactions(pub, 40));
          setRefreshing(false);
        }}
        keyExtractor={({ id }) => id}
        renderItem={({ item: tx }) => <TxRecord {...tx} />}
      />
    </SafeAreaView>
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
});
export default History;
