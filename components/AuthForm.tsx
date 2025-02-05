import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import CustomInput from '../components/CustomInput';
import FormStructure from '../components/FormStructure';
import {createNewUser, logInUser} from '../redux/slices/AuthSlice';
import {toggleActiveModal} from '../redux/slices/ModalSlice';
import {toggleActive} from '../redux/slices/SpinnerSlice';
import {validateEmail} from '../utils/emailValidator';

type IAuthForm = {
  isLogin: boolean;
};

function AuthForm(props: IAuthForm) {
  const {isLogin} = props;

  const [email, setEmail] = useState<string>('');
  const [psw, setPsw] = useState<string>('');
  const [emailConfirm, setEmailConfirm] = useState<string>('');
  const [pswConfirm, setPswConfirm] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const dispatch = useDispatch<any>();
  const navigation = useNavigation<any>();

  const handleError = (err: any) => {
    console.log('CATCH', err);
    dispatch(
      toggleActiveModal({
        active: true,
        text: 'Hubo un error',
        title: 'ERROR',
        type: '',
      }),
    );
    dispatch(toggleActive(false));
  };

  const handleSubmit = async () => {
    setError('');
    if (email === '') {
      setError('email');
      setErrorMessage('email field must not be empty');
      return;
    }
    if (!validateEmail(email)) {
      setError('email');
      setErrorMessage('text field must be email');
      return;
    }
    if (emailConfirm !== email && !isLogin) {
      setError('emailc');
      setErrorMessage('email and comnfirm email must be the same');
      return;
    }
    if (psw === '') {
      setError('psw');
      setErrorMessage('password field must no be empty');
      return;
    }
    if (psw !== pswConfirm && !isLogin) {
      setError('pswc');
      setErrorMessage('password and comnfirm password must be the same');
      return;
    }
    dispatch(toggleActive(true));
    if (!isLogin) {
      await dispatch(createNewUser({email, psw}))
        .then(() => {
          navigation.navigate('LogIn', {});
          dispatch(toggleActive(false));
        })
        .catch((err: any) => handleError(err));
    } else {
      await dispatch(logInUser({email, psw}))
        .then(() => {
          navigation.navigate('Favs', {});
          dispatch(toggleActive(false));
        })
        .catch((err: any) => handleError(err));
    }

    setEmail('');
    setEmailConfirm('');
    setPsw('');
    setPswConfirm('');
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
