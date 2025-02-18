import React, {ReactElement} from 'react';
import AuthForm from '../components/auth-form/AuthForm';

function Register(): ReactElement {
  return <AuthForm isLogin={false} />;
}

export default Register;
