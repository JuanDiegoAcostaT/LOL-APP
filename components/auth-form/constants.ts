import {IAuthFormPayloadKey} from '../../reducers/AuthForm';

export const ERROS_LIST = {
  email: {
    empty: 'email field must not be empty',
    notEmail: 'text field must be email',
    notsame: 'email and comnfirm email must be the same',
  },
  password: {
    empty: 'password field must no be empty',
    notsame: 'password and comnfirm password must be the same',
  },
};

export const ERROR_TYPE: {[key: string]: IAuthFormPayloadKey} = {
  msg: 'errorMessage',
  err: 'error',
};

export const ERROR_DESC: {[key: string]: IAuthFormPayloadKey} = {
  email: 'email',
  emailConfirm: 'emailConfirm',
  password: 'psw',
  passwordConfirm: 'pswConfirm',
};
