import React, {ReactElement, useMemo} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import Champion from '../components/Champion';
import {useSafeArea} from '../hooks/useSafeAre';
import {IChampion} from '../interfaces/Champion';
import {championsSelector} from '../redux/slices/ChampionsSlice';
import {favoritesSummonerSelector} from '../redux/slices/FavoritesSummonersSlice';
import {colors, mainStyles} from '../styles/main';

function renderCategoryItem({item}: {item: IChampion}): ReactElement {
  return <Champion view={'favs'} champion={item} />;
}

function FavoritesScreen() {
  const {favorites} = useSelector(favoritesSummonerSelector);
  const champions = useSelector(championsSelector);
  const {insets} = useSafeArea();

  const favChamps = useMemo(() => {
    if (champions) {
      return champions?.filter((champ: IChampion) => {
        return favorites.findIndex((fav: any) => champ.id === fav.id) > -1;
      });
    } else {
      return [];
    }
  }, [champions, favorites]);

  return (
    <View style={[insets, styles.favoritesContainer]}>
      <Text style={mainStyles.mainTitle}>Favorites</Text>

      <FlatList
        data={favChamps}
        keyExtractor={item => item.id}
        renderItem={renderCategoryItem}
        numColumns={2}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  favoritesContainer: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
});
export default FavoritesScreen;
