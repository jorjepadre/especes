import { createSlice } from '@reduxjs/toolkit';
import { BLOCKCHAIN_LIST } from '../../utils/const';

export type TokenData = {
  token_id: string;
  ticker: string;
  name: string;
  logo: string;
};

interface ChainData {
  accounts: { pub: string; pri: string }[];
  tokens: TokenData[];
  mnemonic?: string;
}

const initialState: Record<keyof typeof BLOCKCHAIN_LIST, ChainData> & {
  type: keyof typeof BLOCKCHAIN_LIST;
} = {
  eth: {
    tokens: [
      {
        token_id: 'Ethereum',
        ticker: 'ETH',
        name: 'ETH',
        logo: '../assets/icons/eth_logo.png',
      },
    ],
    accounts: [],
  },
  sol: {
    tokens: [
      {
        token_id: 'Solana',
        ticker: 'SOL',
        name: 'SOL',
        logo: '../assets/icons/sol_logo.png',
      },
    ],
    accounts: [],
  },
  type: 'eth',
};

export const chainSlice = createSlice({
  name: 'chain',
  initialState,
  reducers: {
    addToken: (state, action) => {
      state[state.type].tokens.push(action.payload);
    },

    setChainType: (state, action) => {
      state.type = action.payload;
    },

    setAccounts: (state, action) => {
      state[state.type].accounts = [...action.payload];
    },

    setMnemonic: (state, action) => {
      state[state.type].mnemonic = action.payload;
    },

    resetChain: () => initialState,
  },
});

export const { addToken, setAccounts, setChainType, setMnemonic, resetChain } =
  chainSlice.actions;
export default chainSlice.reducer;
