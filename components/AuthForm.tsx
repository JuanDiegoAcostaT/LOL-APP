import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import CustomInput from '../components/CustomInput';
import FormStructure from '../components/FormStructure';
import {toggleActive} from '../redux/slices/SpinnerSlice';
import {validateEmail} from '../utils/emailValidator';
import {useAuth} from '../hooks/useAuth';

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

function AuthForm(props: IAuthForm) {
  const {isLogin} = props;
  const {handleRegister, handleLogin} = useAuth();

  const [email, setEmail] = useState<string>('');
  const [psw, setPsw] = useState<string>('');
  const [emailConfirm, setEmailConfirm] = useState<string>('');
  const [pswConfirm, setPswConfirm] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const dispatch = useDispatch<any>();

  const handleErrorMsg = () => {
    setError('');
    let errorMsg = '';
    let errorField = 'email';

    if (email === '') {
      errorMsg = ERROS_LIST.email.empty;
    }
    if (!validateEmail(email)) {
      errorMsg = ERROS_LIST.email.notEmail;
    }
    if (emailConfirm !== email && !isLogin) {
      errorMsg = ERROS_LIST.email.notsame;
    }
    if (psw === '') {
      setError('psw');
      errorMsg = ERROS_LIST.password.empty;
    }
    if (psw !== pswConfirm && !isLogin) {
      setError('pswc');
      errorMsg = ERROS_LIST.password.notsame;
    }

    setError(errorField);
    setErrorMessage(errorMsg);
  };

  const resetFields = () => {
    setEmail('');
    setEmailConfirm('');
    setPsw('');
    setPswConfirm('');
  };

  const handleSubmit = async () => {
    handleErrorMsg();
    dispatch(toggleActive(true));
    if (!isLogin) {
      handleRegister(email, psw);
    } else {
      handleLogin(email, psw);
    }
    resetFields();
  };

  return (
    <FormStructure
      handleSubmit={handleSubmit}
      isLogin={isLogin}
      error={errorMessage}>
      <CustomInput
        label="Email"
        handleChange={setEmail}
        handleValue={email}
        placeholder={'example@gmail.com'}
        error={error.includes('email')}
      />
      {!isLogin ? (
        <CustomInput
          label="Confirm email"
          handleChange={setEmailConfirm}
          handleValue={emailConfirm}
          error={error.includes('emailc')}
        />
      ) : null}
      <CustomInput
        label="Password"
        handleChange={setPsw}
        handleValue={psw}
        placeholder={'XXXXXXXXXXXXXXX'}
        error={error.includes('psw')}
        password={true}
      />
      {!isLogin ? (
        <CustomInput
          label="Confirm password"
          handleChange={setPswConfirm}
          handleValue={pswConfirm}
          error={error.includes('pswc')}
          password={true}
        />
      ) : null}
    </FormStructure>
  );
}

export default AuthForm;
