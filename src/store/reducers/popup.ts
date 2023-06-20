import { createSlice } from '@reduxjs/toolkit';

type PopupState = {
  message: string;
  showtime: number;
  timeouts: NodeJS.Timeout[];
};

const initialState: PopupState = {
  message: '',
  showtime: 0,
  timeouts: [],
};

export const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    showPopup: (state, action) => {
      state.message = action.payload;
      state.showtime++;
    },
    countDown: (state) => {
      state.showtime -= +(state.showtime > 0);
    },
    addTimeout: (state, action) => {
      state.timeouts.push(action.payload);
    },
    hidePopup: (state) => {
      state.timeouts.forEach((timeout) => clearTimeout(timeout));
      state.showtime = 0;
    },
  },
});

export const { showPopup, countDown, addTimeout, hidePopup } = popupSlice.actions;
export default popupSlice.reducer;
