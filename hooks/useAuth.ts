import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {createNewUser, logInUser} from '../redux/slices/AuthSlice';
import {toggleActiveModal} from '../redux/slices/ModalSlice';
import {toggleActive} from '../redux/slices/SpinnerSlice';

type IEventAuth = (email: string, psw: string) => Promise<void>;
type IUseAuth = {
  handleRegister: IEventAuth;
  handleLogin: IEventAuth;
};

export const useAuth = (): IUseAuth => {
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

  const handleRegister = async (email: string, psw: string) => {
    await dispatch(createNewUser({email, psw}))
      .then(() => {
        navigation.navigate('LogIn', {});
        dispatch(toggleActive(false));
      })
      .catch((err: any) => handleError(err));
  };

  const handleLogin = async (email: string, psw: string) => {
    await dispatch(logInUser({email, psw}))
      .then(() => {
        navigation.navigate('Favs', {});
        dispatch(toggleActive(false));
      })
      .catch((err: any) => handleError(err));
  };
  return {handleRegister, handleLogin};
};
