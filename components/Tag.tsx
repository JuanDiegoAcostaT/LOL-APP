import React, {ReactElement} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, mainStyles, sizes} from '../styles/main';

type ITag = {
  text: string;
};

function Tag(props: ITag): ReactElement {
  const {text} = props;
  return (
    <View style={[styles.tag, mainStyles.shadow]}>
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
    marginHorizontal: sizes.md,
  },
  tagText: {
    color: colors.white,
    fontFamily: 'BeaufortforLOL-Medium',
  },
});

export default Tag;
