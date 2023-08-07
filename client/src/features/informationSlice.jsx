import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showTicketInfo: localStorage.getItem('showTicketInfo') ? false : true
};

export const informationSlice = createSlice({
  name: 'offInformation',
  initialState,
  reducers: {
    closeInfo: (state) => {
      console.log('off');
      state.showTicketInfo = false;
      localStorage.setItem('showTicketInfo', false);
    }
  }
});

// Action creators are generated for each case reducer function
export const { closeInfo } = informationSlice.actions;

export default informationSlice.reducer;
