import { useAccount, useRPC } from './hooks';
import { useEffect, useState } from 'react';

import * as bip39 from 'bip39';
import {
  Connection,
  Keypair,
  ParsedTransactionWithMeta,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import { derivePath } from 'ed25519-hd-key';
import * as bs58 from 'bs58';
import { sendAndConfirmTransaction } from '@solana/web3.js';
import { BLOCKCHAIN_LIST } from './const';

export const useSolConnection = () => {
  const rpc = useRPC();
  return new Connection(rpc);
};

export const getPublicKey = (pri: string) => {
  return Keypair.fromSecretKey(bs58.decode(pri)).publicKey;
};

export const getGasFee = async (address: string, amount: number) => {
  let transaction = new Transaction();
  transaction.add(
    SystemProgram.transfer({
      fromPubkey: getPublicKey(useAccount().pri),
      toPubkey: new PublicKey(address),
      lamports: 1e9 * +amount,
    })
  );
  transaction.feePayer = getPublicKey(useAccount().pri);
  let blockhashObj = await useSolConnection().getLatestBlockhash();
  transaction.recentBlockhash = blockhashObj.blockhash;
  const fee = await transaction.getEstimatedFee(useSolConnection());
  // console.log('useSolGasFee is returning: ', fee);
  return fee ?? -1;
};

export const isSolAddressValid = (address: string) => {
  return PublicKey.isOnCurve(address.trim());
};

export const sendSol = async (
  address: string,
  amount: string,
  account: { pub: string; pri: string },
  connection: any
) => {
  let transaction = new Transaction();
  transaction.add(
    SystemProgram.transfer({
      fromPubkey: getPublicKey(account.pri),
      toPubkey: new PublicKey(address),
      lamports: 1e9 * +amount,
    })
  );
  transaction.feePayer = getPublicKey(account.pri);
  let blockhashObj = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhashObj.blockhash;
  sendAndConfirmTransaction(connection, transaction, [
    Keypair.fromSecretKey(bs58.decode(account.pri)),
  ]);
};

export interface Tx {
  lamports: number;
  source: string;
  destination: string;
  id: string;
  blockTime: number;
}

export const getTransactions = async (
  address: string,
  limit: number
): Promise<Tx[]> => {
  const connection = new Connection(BLOCKCHAIN_LIST.sol.rpc);
  const signaturesInfo = await connection.getSignaturesForAddress(
    new PublicKey(address),
    { limit }
  );
  // console.log(signaturesInfo);
  const signatures = signaturesInfo.map((info) => info.signature);
  const parsedTransactions = (
    await connection.getParsedTransactions(signatures)
  ).filter((tx): tx is ParsedTransactionWithMeta => !!tx);
  const transactions = parsedTransactions.map(
    ({ transaction, blockTime, meta }) => {
      // console.log(JSON.stringify(transaction.message.instructions, null, 2));
      const instruction = transaction.message.instructions[0];
      if (!(instruction && 'parsed' in instruction)) return;
      if (instruction.parsed.type == 'transfer') {
        const { lamports, source, destination } = instruction.parsed.info as {
          lamports: number;
          source: string;
          destination: string;
        };
        return {
          lamports,
          source,
          destination,
          id: transaction.signatures[0],
          blockTime,
        };
      }
    }
  );
  return transactions.filter((tx): tx is Tx => !!tx);
};

export default {
  generateMnemonic: async () => bip39.generateMnemonic(),
  generateKeypairs: async (mnemonic: string) => {
    // console.log('generating new keypairs');
    const seedBuffer = bip39.mnemonicToSeedSync(mnemonic);
    const accounts = [];
    for (let i = 0; i < 10; i++) {
      const path = `m/44'/501'/${i}'/0'`;
      const keypair = Keypair.fromSeed(
        derivePath(path, seedBuffer.toString('hex')).key
      );
      accounts.push({
        pri: bs58.encode(keypair.secretKey),
        pub: keypair.publicKey.toString(),
      });
    }
    // console.log('Mnemonic: ', mnemonic);
    // console.log('Accounts: ', accounts);
    return accounts;
  },
};
