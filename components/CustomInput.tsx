import React, {ReactElement} from 'react';
import {StyleSheet, Text, TextInput} from 'react-native';
import {colors, sizes} from '../styles/main';

type ICustomInput = {
  handleChange: (text: string) => void;
  handleValue: string;
  placeholder?: string;
  placeholderTextColor?: string;
  customStyles?: any;
  label: string;
  password?: boolean;
  error?: boolean;
};

function CustomInput(props: ICustomInput): ReactElement {
  const {
    handleChange,
    handleValue,
    placeholder,
    placeholderTextColor,
    label,
    password,
    error,
    customStyles,
  } = props;

  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        autoCapitalize={'none'}
        autoCorrect={!password}
        secureTextEntry={password}
        textContentType={password ? 'password' : 'emailAddress'}
        style={[
          customStyles,
          styles.input,
          error ? styles.error : styles.success,
        ]}
        onChangeText={handleChange}
        value={handleValue}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor || colors.gray}
        selectionColor="white"
        underlineColorAndroid={colors.white}
      />
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: sizes.xl,
    borderWidth: 1,
    borderRadius: sizes.md,
    paddingHorizontal: sizes.md,
    color: colors.white,
    marginVertical: sizes.sm,
  },
  error: {
    borderColor: 'red',
    backgroundColor: colors.gray,
  },
  success: {
    borderColor: colors.gray,
    backgroundColor: colors.light,
  },
  label: {
    textAlign: 'left',
    color: colors.white,
  },
});

export default CustomInput;
