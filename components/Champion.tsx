import {useNavigation} from '@react-navigation/native';
import React, {ReactElement} from 'react';
import {Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {IChampion} from '../interfaces/Champion';
import {toggleActive} from '../redux/slices/SpinnerSlice';
import {getChampionById} from '../services/championsService';
import {BASE_URL_CHAMP} from '../services/constants';
import {colors, sizes} from '../styles/main';
import ImageContainer from './ImageContainer';

type IChampionComponent = {
  champion: IChampion;
};

function Champion({champion}: IChampionComponent): ReactElement {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const handleChampionDetails = (): void => {
    dispatch(toggleActive(true));
    getChampionById(champion.id)
      .then(champion => {
        dispatch(toggleActive(false));
        navigation.navigate('HeroeOverView', {champion});
      })
      .catch(() => {
        dispatch(toggleActive(false));
      });
  };

  return (
    <View style={styles.championContainer}>
      <Pressable
        onPress={handleChampionDetails}
        style={styles.championInnerContainer}>
        <Text style={styles.championTitle}>{champion.name}</Text>
        <ImageContainer
          styles={styles.championImage}
          mainImage={
            BASE_URL_CHAMP + '13.6.1/img/champion/' + champion.image.full
          }
        />
        <Text style={styles.championTitle}>{champion.title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  championContainer: {
    margin: sizes.sm,
    flexGrow: 1,
  },
  championInnerContainer: {
    alignItems: 'center',
    paddingBottom: sizes.md,
    backgroundColor: colors.light,
    borderRadius: sizes.md,
    elevation: 4, // android,
    //ios
    shadowColor: colors.black,
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    overflow: Platform.OS == 'android' ? 'hidden' : 'visible',
  },
  championTitle: {
    color: colors.white,
    marginTop: sizes.md,
    marginHorizontal: sizes.sm,
    fontSize: sizes.md,
    textAlign: 'center',
  },
  championImage: {
    width: 100,
    height: 100,
    marginVertical: sizes.lg,
    resizeMode: 'contain',
  },
});

export default Champion;
