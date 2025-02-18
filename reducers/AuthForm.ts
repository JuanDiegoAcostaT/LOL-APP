type IAuthFormReducerState = {
  email: string;
  psw: string;
  emailConfirm: string;
  pswConfirm: string;
  error: string;
  errorMessage: string;
};

export type IAuthFormPayloadKey =
  | 'email'
  | 'psw'
  | 'emailConfirm'
  | 'pswConfirm'
  | 'error'
  | 'errorMessage';

interface IAuthFormPayload {
  key: IAuthFormPayloadKey;
  value: string;
}

type IAuthFormReducerAction =
  | {type: 'setValue'; payload: IAuthFormPayload}
  | {type: 'resetValues'; payload: any};

export const initialState: IAuthFormReducerState = {
  email: '',
  psw: '',
  emailConfirm: '',
  pswConfirm: '',
  error: '',
  errorMessage: '',
};

// Actions
export const SET_VALUES = 'setValue';
export const RESET_VALUES = 'resetValues';

export const authFormReducer = (
  state: IAuthFormReducerState,
  action: IAuthFormReducerAction,
): IAuthFormReducerState => {
  const {key, value} = action.payload;

  switch (action.type) {
    case SET_VALUES:
      return {...state, [key]: value};
    case RESET_VALUES:
      return initialState;
    default:
      return state;
  }
};
