import { useRPC } from './hooks';
import { useEffect, useState } from 'react';

import * as bip39 from 'bip39';
import { Connection, Keypair } from '@solana/web3.js';
import { derivePath } from 'ed25519-hd-key';
import * as bs58 from 'bs58';

export const useSolConnection = () => {
  const rpc = useRPC();
  const sol = new Connection(rpc);
  return sol;
};

export const usePublicKey = (pri: string) => {
  return Keypair.fromSecretKey(bs58.decode(pri)).publicKey;
};

export const useEthGasFee = () => {
  const [fee, setFee] = useState<number>(0.01);
  // const eth = useEthConnection();
  // const fetchGasFee = () => eth.getGasPrice().then((price) => setFee(+price / 1e18));
  // fetchGasFee();
  // useEffect(() => {
  //   const interval = setInterval(fetchGasFee, 5e3);
  //   return () => clearInterval(interval);
  // }, []);
  const sol = useSolConnection();

  return fee;
};

export default {
  generateMnemonic: async () => bip39.generateMnemonic(),
  generateKeypairs: async (mnemonic: string) => {
    console.log('generating new keypairs');
    const seedBuffer = bip39.mnemonicToSeedSync(mnemonic);
    const accounts = [];
    for (let i = 0; i < 10; i++) {
      const path = `m/44'/501'/${i}'/0'`;
      const keypair = Keypair.fromSeed(derivePath(path, seedBuffer.toString('hex')).key);
      accounts.push({ pri: bs58.encode(keypair.secretKey), pub: keypair.publicKey.toString() });
    }

    console.log('Accounts: ', accounts);
    return accounts;
  },
};
