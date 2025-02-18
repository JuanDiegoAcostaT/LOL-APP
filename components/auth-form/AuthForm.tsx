import React from 'react';
import CustomInput from '../CustomInput';
import FormStructure from '../FormStructure';

import {IAuthForm, useAuthForm} from './AuthForm.hook';
import {ERROR_DESC} from './constants';

function AuthForm(props: IAuthForm) {
  const {isLogin} = props;
  const {
    handleSubmit,
    handleFields,
    errorMessage,
    email,
    emailConfirm,
    error,
    pswConfirm,
    psw,
  } = useAuthForm(props);
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
