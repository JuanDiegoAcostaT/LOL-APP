import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {toggleActive} from './SpinnerSlice';
import {auth} from '../../database/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
// import {toggleActiveModal} from './ModalSlice';

export interface AuthState {
  user: any;
}

const initialState: AuthState = {
  user: {},
};

export const createNewUser = createAsyncThunk<any, any, any>(
  'auth/createUser',
  async (params, {dispatch}) => {
    dispatch(toggleActive(true));
    const {email, psw} = params;
    const res = await createUserWithEmailAndPassword(auth, email, psw);
    return res;
    // .then((res) => {
    //     dispatch(logInUser({ email, psw }))
    // }).catch((err) => {
    //     dispatch(toggleActiveModal({
    //         active: true,
    //         text: 'Hubo un error',
    //         title: "ERROR",
    //         type: ''
    //     }))
    //     dispatch(toggleActive(false))
    //     return;
    // })
  },
);

export const logInUser = createAsyncThunk<any, any, any>(
  'auth/logInUser',
  async (params, {dispatch}) => {
    dispatch(toggleActive(true));
    const {email, psw} = params;
    const res = await signInWithEmailAndPassword(auth, email, psw);
    return res;
    // .then((res) => {
    //     dispatch(toggleActive(false))
    //     console.log('USER-RES-LOGIN', res)
    //     return res
    //     // navigation.navigate('Favs', {})
    // }).catch((err) => {
    //     console.log('ERR', err)

    //     dispatch(toggleActive(false))
    //     return;
    // })
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, {payload}: PayloadAction<any>) => {
      state.user = payload;
    },
  },
  // extraReducers: (builder) => {
  //     builder.addCase(logInUser.fulfilled, (state, action) => {
  //         state.user = action.payload._tokenResponse
  //     })
  // }
});

export const {setUser} = authSlice.actions;

export default authSlice.reducer;

export const userSelector = (state: {authStore: AuthState}) =>
  state.authStore.user;
