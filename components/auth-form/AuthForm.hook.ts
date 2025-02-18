import {useReducer} from 'react';
import {useDispatch} from 'react-redux';
import {useAuth} from '../../hooks/useAuth';
import {
  authFormReducer,
  initialState,
  IAuthFormPayloadKey,
  SET_VALUES,
  RESET_VALUES,
} from '../../reducers/AuthForm';
import {toggleActive} from '../../redux/slices/SpinnerSlice';
import {validateEmail} from '../../utils/emailValidator';
import {ERROR_DESC, ERROR_TYPE, ERROS_LIST} from './constants';

export type IAuthForm = {
  isLogin: boolean;
};

export const useAuthForm = (props: IAuthForm) => {
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

  const handleSubmit = async (): Promise<void> => {
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

  return {
    handleSubmit,
    handleFields,
    errorMessage,
    email,
    emailConfirm,
    error,
    pswConfirm,
    psw,
  };
};
