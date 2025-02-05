import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface SpinnerState {
  active: boolean;
}

const initialState: SpinnerState = {
  active: false,
};

const spinnerSlice = createSlice({
  name: 'spinner',
  initialState,
  reducers: {
    toggleActive: (state, {payload}: PayloadAction<any>) => {
      state.active = payload;
    },
  },
});

export const {toggleActive} = spinnerSlice.actions;

export default spinnerSlice.reducer;

export const spinnerActiveSelector = (state: {spinnerStore: SpinnerState}) =>
  state.spinnerStore.active;
