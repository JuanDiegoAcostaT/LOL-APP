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
    <View style={[{height: height * 0.2}, styles.heroInfo]}>
      <ChampionTags championTags={championTags} height={height} />
      <Pressable
        onPress={e => {
          handleOpenDrawer ? handleOpenDrawer() : e.preventDefault;
        }}>
        <Text style={styles.championName}>{championName}</Text>
        <Text style={styles.championDescription}>{championTitle}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
  heroInfo: {
    width: '100%',
    alignItems: 'center',
    elevation: 5, // android,
    //ios
    shadowColor: colors.black,
    shadowOpacity: 1,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 8,
  },
});

export default ChampionHeroInfo;
