import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { BLOCKCHAIN_LIST } from './const';
import { useEffect, useState } from 'react';
import web3 from 'web3';
import { Connection } from '@solana/web3.js';
import { getGasFee } from './sol';

export const useRPC = () =>
  useSelector((state: RootState) => BLOCKCHAIN_LIST[state.chain.type].rpc);
export const useTokenList = () =>
  useSelector((state: RootState) => state.chain[state.chain.type].tokens);
export const useMnemonic = () =>
  useSelector((state: RootState) => state.chain[state.chain.type].mnemonic);

export const getAccount = (state: RootState, nonce?: number) => {
  const wallet = state.wallet;
  const chain = state.chain;
  if (wallet.accounts && wallet.accounts.length !== 0) {
    if (!nonce && nonce !== 0)
      nonce = wallet.accounts[wallet.selectedAccount].nonce;
    return {
      ...chain[chain.type].accounts[nonce],
      ...wallet.accounts[wallet.selectedAccount],
    };
  }
};

export const useAccount = () =>
  useSelector(getAccount, (prev, curr) => {
    if (!curr?.pri) return true;
    else return prev?.pri === curr.pri;
  })!;

export const useConnection = () => {
  const [connection, setConnection] = useState<any>();
  const chainType = useSelector((state: RootState) => state.chain.type);
  useEffect(() => {
    const { rpc } = BLOCKCHAIN_LIST[chainType];
    if (chainType === 'eth')
      setConnection(new web3(new web3.providers.HttpProvider(rpc)).eth);
    else setConnection(new Connection(rpc));
  }, [chainType]);
  return connection;
};

export const useFee = (address: string, amount: number) => {
  const [fee, setFee] = useState<number>();
  const chainType = useSelector((state: RootState) => state.chain.type);
  const connection = useConnection();
  useEffect(() => {
    if (chainType === 'eth') {
      const fetchGasFee = async () =>
        connection.getGasPrice().then((price: string) => setFee(+price / 1e18));
      fetchGasFee();
      const interval = setInterval(fetchGasFee, 5e3);
      return () => clearInterval(interval);
    } else getGasFee(address, amount).then(setFee);
  }, [chainType, connection]);
  return fee;
};
