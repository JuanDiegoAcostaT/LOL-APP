import React, {ReactElement, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useSafeArea} from '../hooks/useSafeAre';
import {colors, mainStyles} from '../styles/main';
import Champion from '../components/Champion';
import {IChampion} from '../interfaces/Champion';
import {useDispatch, useSelector} from 'react-redux';
import {
  championsSelector,
  ChampionsState,
  fetchChampionsList,
} from '../redux/slices/ChampionsSlice';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {fetchFavorites} from '../redux/slices/FavoritesSummonersSlice';

function renderCategoryItem({item}: {item: IChampion}): ReactElement {
  return <Champion view={'home'} champion={item} />;
}

function HomeScreen() {
  const {insets} = useSafeArea();
  const dispatch = useDispatch<ThunkDispatch<ChampionsState, any, AnyAction>>();
  const champions = useSelector(championsSelector);

  useEffect(() => {
    dispatch(fetchChampionsList());
    dispatch(fetchFavorites());
  }, [dispatch]);

  return (
    <View
      style={{
        ...insets,
        ...styles.constainer,
      }}>
      <Text style={mainStyles.mainTitle}>Trending</Text>

      <FlatList
        data={champions}
        keyExtractor={item => item.id}
        renderItem={renderCategoryItem}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  constainer: {
    backgroundColor: colors.primary,
    flex: 1,
  },
});

export default HomeScreen;
