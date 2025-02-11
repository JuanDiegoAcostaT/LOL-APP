import React, {ReactElement} from 'react';
import AuthForm from '../components/AuthForm';

function LoginScreen(): ReactElement {
  return <AuthForm isLogin={true} />;
}

export default LoginScreen;
