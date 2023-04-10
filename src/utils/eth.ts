import { useRPC } from './hooks';
import { useEffect, useState } from 'react';

import { hdkey } from 'ethereumjs-wallet';
import * as bip39 from 'bip39';
import web3 from 'web3';

export const useEthConnection = () => {
  const rpc = useRPC();
  const connection = new web3.providers.HttpProvider(rpc);
  const { eth } = new web3(connection);
  return eth;
};

export const useEthGasFee = () => {
  const [fee, setFee] = useState<number>();
  const eth = useEthConnection();
  const fetchGasFee = () => eth.getGasPrice().then((price) => setFee(+price / 1e18));
  fetchGasFee();
  useEffect(() => {
    const interval = setInterval(fetchGasFee, 5e3);
    return () => clearInterval(interval);
  }, []);
  return fee;
};

export default {
  generateMnemonic: async () => bip39.generateMnemonic(),
  generateKeypairs: async (mnemonic: string) => {
    console.log('generating new keypairs');
    const seedBuffer = hdkey.fromMasterSeed(bip39.mnemonicToSeedSync(mnemonic));
    let path = "m/44'/60'/0'/0/";
    const accounts = [];
    for (let i = 0; i < 10; i++) {
      let wallet = seedBuffer.derivePath(path + i).getWallet();
      accounts.push({ pri: wallet.getPrivateKey().toString('hex'), pub: '0x' + wallet.getAddress().toString('hex') });
    }
    console.log('Accounts: ', accounts);
    return accounts;
  },
};
