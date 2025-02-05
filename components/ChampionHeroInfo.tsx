import React, {ReactElement} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors, sizes} from '../styles/main';
import ChampionTags from './ChampionTags';

type IChampionHeroInfo = {
  handleOpenDrawer: Function | null;
  championName: string;
  championTitle: string;
  height: number;
  championTags: string[];
};

function ChampionHeroInfo(props: IChampionHeroInfo): ReactElement {
  const {handleOpenDrawer, championName, championTitle, championTags, height} =
    props;

  return (
    <View style={[styles.heroInfo]}>
      <ChampionTags championTags={championTags} height={height} />
      <View style={styles.container}>
        <View style={styles.pressableContainer} />
        <Pressable
          style={styles.pressable}
          onPress={e => {
            handleOpenDrawer ? handleOpenDrawer() : e.preventDefault;
          }}>
          <Text style={styles.championName}>{championName}</Text>
          <Text style={styles.championDescription}>{championTitle}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {position: 'relative', alignItems: 'center', marginTop: 10},
  pressableContainer: {
    backgroundColor: 'black',
    opacity: 0.5,
    height: 180,
    width: 400,
  },
  pressable: {position: 'absolute'},
  championName: {
    color: colors.white,
    fontSize: sizes.xl * 2,
    marginTop: sizes.md,
    fontFamily: 'BeaufortforLOL-Medium',
    textAlign: 'center',
  },
  championDescription: {
    color: colors.white,
    fontSize: sizes.xl,
    fontFamily: 'Spiegel',
    textAlign: 'center',
    marginBottom: sizes.xxl,
  },
  heroInfo: {
    width: '100%',
    alignItems: 'center',
  },
});

export default ChampionHeroInfo;
