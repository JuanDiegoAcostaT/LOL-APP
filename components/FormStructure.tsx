import {useNavigation} from '@react-navigation/native';
import React, {ReactElement, ReactNode, useMemo} from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeArea} from '../hooks/useSafeAre';
import {colors, mainStyles, sizes} from '../styles/main';
import CustomButton from './CustomButton';
import ImageContainer from './ImageContainer';

const height = Dimensions.get('window').height;

type IFormStructure = {
  children: ReactNode;
  handleSubmit: () => void;
  error?: string;
  isLogin: boolean;
};

function FormStructure(props: IFormStructure): ReactElement {
  const {children, handleSubmit, error, isLogin} = props;
  const {insets} = useSafeArea();
  const {navigate} = useNavigation<any>();

  const handleRedirect = (): void => {
    const path = isLogin ? 'Register' : 'LogIn';
    navigate(path, {});
  };

  const title = useMemo(() => {
    return isLogin ? 'Login' : 'Register';
  }, [isLogin]);

  return (
    <View style={[insets, styles.container]}>
      <View style={mainStyles.center}>
        <ImageContainer
          isUrl={false}
          mainImage={'lolLogo'}
          styles={styles.imageStyles}
        />
        {error ? (
          <View style={styles.errorDialog}>
            <Text style={styles.textError}>{error}</Text>
          </View>
        ) : null}

        <View style={[styles.form, mainStyles.shadow]}>
          <Text style={mainStyles.mainTitle}>{title}</Text>
          <View style={styles.childrenContainer}>{children}</View>
          <CustomButton
            customStyle={styles.buttonStyles}
            text={title}
            handlePress={() => handleSubmit()}
          />
        </View>
        <Pressable onPress={handleRedirect}>
          <Text style={styles.disclaimer}>
            Do not have account? {!isLogin ? 'LogIn' : 'SignUp'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  disclaimer: {
    color: colors.white,
    textDecorationLine: 'underline',
  },
  container: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  childrenContainer: {
    justifyContent: 'flex-start',
    width: '100%',
  },
  form: {
    marginVertical: sizes.lg,
    width: '90%',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderRadius: sizes.md,
    padding: sizes.lg,
  },
  buttonStyles: {
    marginTop: sizes.lg,
  },
  errorDialog: {
    backgroundColor: colors.white,
    padding: sizes.md,
    borderRadius: sizes.md,
    width: '80%',
    alignItems: 'center',
  },
  textError: {
    color: 'red',
    textAlign: 'center',
  },
  imageStyles: {
    width: '80%',
    height: height * 0.25,
    resizeMode: 'contain',
  },
});

export default FormStructure;
