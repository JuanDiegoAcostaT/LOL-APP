import {useNavigation} from '@react-navigation/native';
import {ThunkDispatch} from '@reduxjs/toolkit';
import React, {ReactElement} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
//@ts-ignore
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {useSafeArea} from '../hooks/useSafeAre';
import {
  deleteFavorites,
  storeFavorites,
} from '../redux/slices/FavoritesSummonersSlice';
import {sizes, colors, mainStyles} from '../styles/main';

type IChampionHeader = {
  isFav: string | null;
  championId: string;
  handleCloseDrawer: Function;
  showCloseButton: boolean;
  championKey: string;
  view: string;
};

type IButtonGenerator = {
  name: string;
  handlePress: () => void;
};

const ButtonGenerator = (props: IButtonGenerator): ReactElement => {
  return (
    <Pressable
      style={[styles.buttonBackground, mainStyles.shadow]}
      onPress={props.handlePress}>
      <Icon size={sizes.lg} name={props.name} color={colors.primary} />
    </Pressable>
  );
};

function ChampionHeader({
  isFav,
  championId,
  handleCloseDrawer,
  championKey,
  view,
  showCloseButton,
}: IChampionHeader): ReactElement {
  const {insets} = useSafeArea();
  const navigation = useNavigation<any>();
  const dispatchThunk = useDispatch<ThunkDispatch<any, any, any>>();

  const handleGoToHome = (): void => {
    const path: string = view === 'home' ? 'Home' : 'Favs';
    navigation.navigate(path, {});
  };

  const handleFav = (): void => {
    if (isFav) {
      dispatchThunk(deleteFavorites(championKey));
    } else {
      dispatchThunk(storeFavorites(championId));
    }
  };

  return (
    <View
      style={{
        ...styles.headerActions,
        marginTop: insets.paddingTop,
      }}>
      <ButtonGenerator name="arrowleft" handlePress={handleGoToHome} />
      {showCloseButton ? (
        <ButtonGenerator name="close" handlePress={() => handleCloseDrawer()} />
      ) : null}
      <ButtonGenerator
        name={isFav ? 'star' : 'staro'}
        handlePress={handleFav}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerActions: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: sizes.lg,
  },
  buttonBackground: {
    backgroundColor: colors.white,
    width: sizes.xl,
    height: sizes.xl,
    borderRadius: 44 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChampionHeader;
