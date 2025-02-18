import React, {useReducer} from 'react';
import {useDispatch} from 'react-redux';
import CustomInput from '../CustomInput';
import FormStructure from '../FormStructure';
import {toggleActive} from '../../redux/slices/SpinnerSlice';
import {validateEmail} from '../../utils/emailValidator';
import {useAuth} from '../../hooks/useAuth';
import {
  authFormReducer,
  IAuthFormPayloadKey,
  initialState,
  RESET_VALUES,
  SET_VALUES,
} from '../../reducers/AuthForm';

type IAuthForm = {
  isLogin: boolean;
};

const ERROS_LIST = {
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

const ERROR_TYPE: {[key: string]: IAuthFormPayloadKey} = {
  msg: 'errorMessage',
  err: 'error',
};

const ERROR_DESC: {[key: string]: IAuthFormPayloadKey} = {
  email: 'email',
  emailConfirm: 'emailConfirm',
  password: 'psw',
  passwordConfirm: 'pswConfirm',
};

function AuthForm(props: IAuthForm) {
  const {isLogin} = props;
  const {handleRegister, handleLogin} = useAuth();
  const [state, dispatchReducer] = useReducer(authFormReducer, initialState);
  const dispatch = useDispatch<any>();
  const {email, emailConfirm, error, errorMessage, psw, pswConfirm} = state;

  const handleFields = (value: string, key: IAuthFormPayloadKey): void => {
    dispatchReducer({type: SET_VALUES, payload: {key, value}});
  };

  const handleErrorMsg = () => {
    handleFields(ERROR_DESC.email, ERROR_TYPE.err);
    handleFields('', ERROR_TYPE.msg);

    if (email === '') {
      handleFields(ERROS_LIST.email.empty, ERROR_TYPE.msg);
      return false;
    }
    if (!validateEmail(email)) {
      handleFields(ERROS_LIST.email.notEmail, ERROR_TYPE.msg);
      return false;
    }
    if (emailConfirm !== email && !isLogin) {
      handleFields(ERROR_DESC.emailConfirm, ERROR_TYPE.err);
      handleFields(ERROS_LIST.email.notsame, ERROR_TYPE.msg);
      return false;
    }
    if (psw === '') {
      handleFields(ERROR_DESC.password, ERROR_TYPE.err);
      handleFields(ERROS_LIST.password.empty, ERROR_TYPE.msg);
      return false;
    }
    if (psw !== pswConfirm && !isLogin) {
      handleFields(ERROR_DESC.passwordConfirm, ERROR_TYPE.err);
      handleFields(ERROS_LIST.password.notsame, ERROR_TYPE.msg);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    const validation = handleErrorMsg();
    if (!validation) {
      return;
    }
    dispatch(toggleActive(true));
    if (!isLogin) {
      handleRegister(email, psw);
    } else {
      handleLogin(email, psw);
    }
    dispatchReducer({type: RESET_VALUES, payload: {}});
  };

  return (
    <FormStructure
      handleSubmit={handleSubmit}
      isLogin={isLogin}
      error={errorMessage}>
      <CustomInput
        label="Email"
        handleChange={value => handleFields(value, ERROR_DESC.email)}
        handleValue={email}
        placeholder={'example@gmail.com'}
        error={error.includes(ERROR_DESC.email)}
      />
      {!isLogin ? (
        <CustomInput
          label="Confirm email"
          handleChange={value => handleFields(value, ERROR_DESC.emailConfirm)}
          handleValue={emailConfirm}
          error={error.includes(ERROR_DESC.emailConfirm)}
        />
      ) : null}
      <CustomInput
        label="Password"
        handleChange={value => handleFields(value, ERROR_DESC.password)}
        handleValue={psw}
        placeholder={'XXXXXXXXXXXXXXX'}
        error={error.includes(ERROR_DESC.password)}
        password={true}
      />
      {!isLogin ? (
        <CustomInput
          label="Confirm password"
          handleChange={value =>
            handleFields(value, ERROR_DESC.passwordConfirm)
          }
          handleValue={pswConfirm}
          error={error.includes(ERROR_DESC.passwordConfirm)}
          password={true}
        />
      ) : null}
    </FormStructure>
  );
}

export default AuthForm;
