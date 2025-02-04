import {StyleSheet} from 'react-native';

export const colors = {
  primary: '#443C68',
  secondary: '#393053',
  dark: '#18122B',
  light: '#635985',
  black: '#000',
  white: '#fff',
  gray: '#ccc',
};

export const sizes = {
  xs: 6,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 64,
};

export const mainStyles = StyleSheet.create({
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadow: {
    elevation: 4, // android,
    //ios
    shadowColor: colors.black,
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
  },
  mainTitle: {
    fontSize: sizes.lg,
    color: colors.white,
    margin: sizes.md,
    fontFamily: 'BeaufortforLOL-Medium',
    textAlign: 'center',
  },
});
