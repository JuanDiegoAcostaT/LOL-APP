import React, {ReactElement} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, sizes} from '../styles/main';

type ITag = {
  text: string;
};

function Tag(props: ITag): ReactElement {
  const {text} = props;
  return (
    <View style={styles.tag}>
      <Text style={styles.tagText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    backgroundColor: colors.secondary,
    height: sizes.xl,
    borderRadius: sizes.md,
    marginRight: sizes.sm,
    paddingHorizontal: sizes.md,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4, // android,
    //ios
    shadowColor: colors.black,
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    marginHorizontal: sizes.md,
  },
  tagText: {
    color: colors.white,
    fontFamily: 'BeaufortforLOL-Medium',
  },
});

export default Tag;
