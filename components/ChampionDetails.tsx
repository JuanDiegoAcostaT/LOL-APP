import React, {ReactElement} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IChampion} from '../interfaces/Champion';
import ChampionSpells from './ChampionSpells';
import {colors, sizes} from '../styles/main';
import ChampionTips from './ChampionTips';

type IChampionDetails = {
  champion: IChampion;
  height: number;
};

function ChampionDetails(props: IChampionDetails): ReactElement {
  const {champion, height} = props;

  return (
    <View style={[{paddingBottom: height * 0.2}, styles.detailsContainer]}>
      {champion.spells ? <ChampionSpells spells={champion.spells} /> : null}
      <Text style={styles.detailsText}>{champion.lore}</Text>

      {champion.allytips?.length ? (
        <ChampionTips title="Ally Tips" tips={champion.allytips || []} />
      ) : null}
      {champion.enemytips?.length ? (
        <ChampionTips title="Enemy Tips" tips={champion.enemytips || []} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: colors.dark,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: sizes.xl,
  },
  detailsText: {
    color: colors.white,
    fontFamily: 'Spiegel',
    fontSize: sizes.md,
  },
});

export default ChampionDetails;
