import React, {ReactElement, useState} from 'react';
import {GestureResponderEvent, Pressable, StyleSheet, Text} from 'react-native';
import {colors, mainStyles, sizes} from '../styles/main';
//@ts-ignore
import Icon from 'react-native-vector-icons/AntDesign';

type ICustomButton = {
  text: string;
  icon?: string;
  handlePress: (event: GestureResponderEvent) => void;
  customStyle?: any;
};

function CustomButton(props: ICustomButton): ReactElement {
  const {text, icon, handlePress, customStyle} = props;

  const [pressIn, setPressIn] = useState<boolean>(false);
  const backgroundStyling = !pressIn
    ? styles.pressableDark
    : styles.pressableLight;

  return (
    <Pressable
      onPress={handlePress}
      style={[styles.button, backgroundStyling, customStyle, mainStyles.shadow]}
      onPressIn={() => setPressIn(true)}
      onPressOut={() => setPressIn(false)}>
      <Text style={styles.buttonText}>{text}</Text>
      {icon ? <Icon size={sizes.md} name={icon} color={colors.white} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressableDark: {
    backgroundColor: colors.dark,
  },
  pressableLight: {
    backgroundColor: colors.light,
  },
  button: {
    width: 'auto',
    height: sizes.xl,
    paddingHorizontal: sizes.xl,
    borderRadius: sizes.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.white,
    paddingRight: sizes.xs,
  },
});

export default CustomButton;
