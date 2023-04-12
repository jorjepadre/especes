import { useAccount, useRPC } from './hooks';
import { useEffect, useState } from 'react';

import { hdkey } from 'ethereumjs-wallet';
import * as bip39 from 'bip39';
import web3 from 'web3';
import { Transaction, TxData } from 'ethereumjs-tx';

export const useEthConnection = () => {
  const rpc = useRPC();
  const connection = new web3.providers.HttpProvider(rpc);
  const { eth } = new web3(connection);
  return eth;
};

export const useEthGasFee = async () => {
  const [fee, setFee] = useState<number>();
  const eth = useEthConnection();
  const fetchGasFee = async () =>
    eth.getGasPrice().then((price) => setFee(+price / 1e18));
  await fetchGasFee();
  useEffect(() => {
    const interval = setInterval(fetchGasFee, 5e3);
    return () => clearInterval(interval);
  }, []);
  return fee;
};

export const isEthAddressValid = (address: string) => {
  return web3.utils.isAddress(address.trim());
};

export const sendEth = async (
  address: string,
  amount: string,
  account: { pub: string; pri: string },
  connection: any
) => {
  const gasLimit = await connection.estimateGas({
    from: account.pub,
    nonce: await connection.getTransactionCount(account.pub),
    to: address,
  });

  // console.log(gasLimit);

  const txData = {
    nonce: await connection.getTransactionCount(account.pub),
    from: account.pub,
    to: address,
    value: web3.utils.toHex(web3.utils.toWei(amount, 'ether')),
    gasPrice: web3.utils.toHex(await connection.getGasPrice()),
    gasLimit: web3.utils.toHex(gasLimit),
  };

  // console.log(txData);

  const tx = new Transaction(txData, { chain: 'goerli' });
  tx.sign(Buffer.from(account.pri, 'hex'));
  const receipt = await connection.sendSignedTransaction(
    '0x' + tx.serialize().toString('hex')
  );
  // console.log(receipt);
};

// For History
export const getEthTransactions = async () => {
  const connection = useEthConnection();
};

export default {
  generateMnemonic: async () => bip39.generateMnemonic(),
  generateKeypairs: async (mnemonic: string) => {
    // console.log('generating new keypairs');
    const seedBuffer = hdkey.fromMasterSeed(bip39.mnemonicToSeedSync(mnemonic));
    let path = "m/44'/60'/0'/0/";
    const accounts = [];
    for (let i = 0; i < 10; i++) {
      let wallet = seedBuffer.derivePath(path + i).getWallet();
      accounts.push({
        pri: wallet.getPrivateKey().toString('hex'),
        pub: '0x' + wallet.getAddress().toString('hex'),
      });
    }
    // console.log('Accounts: ', accounts);
    return accounts;
  },
};
