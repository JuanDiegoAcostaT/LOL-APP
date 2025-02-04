import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface ModalState {
  active: boolean;
  title: string;
  text: string;
  type: string;
}

const initialState: ModalState = {
  active: false,
  title: '',
  text: '',
  type: '',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleActiveModal: (state, {payload}: PayloadAction<any>) => {
      state.active = payload.acitve;
      state.text = payload.text;
      (state.title = payload.title), (state.type = payload.type);
    },
    toogleDeActive: (state, {}: PayloadAction<any>) => {
      state.active = false;
      state.text = '';
      state.title = '';
      state.type = '';
    },
  },
});

export const {toggleActiveModal, toogleDeActive} = modalSlice.actions;

export default modalSlice.reducer;

export const modalSelector = (state: {modalStore: ModalState}) =>
  state.modalStore;
