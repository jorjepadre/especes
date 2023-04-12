import { createSlice } from '@reduxjs/toolkit';

type WalletState = {
  accounts: { name: string; nonce: number }[];
  selectedAccount: number;

  password: string;
};

const initialState: WalletState = {
  accounts: [],
  selectedAccount: 0,

  password: '',
};

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setPassword: (state, action) => {
      state.password = action.payload;
    },

    resetWallet: () => initialState,

    // Account Related
    addAccount: (state, action) => {
      state.accounts.push(action.payload);
    },
    changeAccountName: (state, action) => {
      const changed = [...state.accounts];
      changed[action.payload.index].name = action.payload.name;
      state.accounts = changed;
    },
    removeAccount: (state, action) => {
      state.selectedAccount =
        (state.selectedAccount + state.accounts.length - 1) %
        (state.accounts.length - 1);
      const changed = [...state.accounts];
      changed.splice(action.payload, 1);
      state.accounts = changed;
    },
    reduceAccounts: (state, action) => {
      state.selectedAccount = 0;
      state.accounts = [{ name: action.payload, nonce: 0 }];
    },
    setSelectedAccount: (state, action) => {
      state.selectedAccount = action.payload;
    },
  },
});

export const {
  setPassword,
  resetWallet,
  addAccount,
  changeAccountName,
  removeAccount,
  setSelectedAccount,
  reduceAccounts,
} = walletSlice.actions;
export default walletSlice.reducer;
