import { useAccount, useRPC } from './hooks';
import { useEffect, useState } from 'react';

import * as bip39 from 'bip39';
import { Connection, Keypair, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { derivePath } from 'ed25519-hd-key';
import * as bs58 from 'bs58';
import store from '../store';

export const useSolConnection = () => {
  const rpc = useRPC();
  const sol = new Connection(rpc);
  return sol;
};

export const usePublicKey = (pri: string) => {
  return Keypair.fromSecretKey(bs58.decode(pri)).publicKey;
};

export const useSolGasFee = async (address: string, amount: number) => {
  let transaction = new Transaction();
  transaction.add(SystemProgram.transfer({ fromPubkey: usePublicKey(useAccount().pri), toPubkey: new PublicKey(address), lamports: 1e9 * +amount }));
  transaction.feePayer = usePublicKey(useAccount().pri);
  let blockhashObj = await useSolConnection().getLatestBlockhash();
  transaction.recentBlockhash = blockhashObj.blockhash;
  const fee = await transaction.getEstimatedFee(useSolConnection());
  return fee;
};

export const isSolAddressValid = (address: string) => {
  return PublicKey.isOnCurve(address.trim());
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
