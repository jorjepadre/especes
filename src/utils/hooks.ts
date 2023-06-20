import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { BLOCKCHAIN_LIST } from './const';

export const useRPC = () => useSelector((state: RootState) => BLOCKCHAIN_LIST[state.chain.type].rpc);
export const useTokenList = () => useSelector((state: RootState) => state.chain[state.chain.type].tokens);
export const useMnemonic = () => useSelector((state: RootState) => state.chain[state.chain.type].mnemonic);

export const getAccount = (state: RootState, nonce?: number) => {
  const wallet = state.wallet;
  const chain = state.chain;
  if (wallet.accounts && wallet.accounts.length !== 0) {
    if (!nonce && nonce !== 0) nonce = wallet.accounts[wallet.selectedAccount].nonce;
    return { ...chain[chain.type].accounts[nonce], ...wallet.accounts[wallet.selectedAccount] };
  }
};

export const useAccount = () =>
  useSelector(getAccount, (prev, curr) => {
    if (!curr?.pri) return true;
    else return prev?.pri === curr.pri;
  })!;
