import {RouteProp, useRoute} from '@react-navigation/native';
import React, {
  ReactElement,
  RefCallback,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {IChampion, IChampionSkin} from '../interfaces/Champion';
import {IHeroOverView} from '../interfaces/route';
import {useSelector} from 'react-redux';
import {favoritesSummonerSelector} from '../redux/slices/FavoritesSummonersSlice';
import ChampionHeader from '../components/ChampionHeader';
import BottomDrawer from '../components/BottomDrawer';
import {IHandleIndexParams} from '../components/Carousel';
import ChampionSkin from '../components/ChampionSkins';
import ChampionDetails from '../components/ChampionDetails';
import ChampionHeroInfo from '../components/ChampionHeroInfo';

function ChampionOverviewScreen(): ReactElement {
  const {params} = useRoute<RouteProp<IHeroOverView, 'Details'>>();
  const {champion, view}: {champion: IChampion; view: string} = params;
  const favorites: string[] = useSelector(favoritesSummonerSelector).favorites;

  const ref = useRef<any>(null);
  const scrollRef = useRef<ScrollView>(null);
  const height = Dimensions.get('window').height;

  const [scroll, setScroll] = useState<boolean>(false);
  const [championTitle, setChampionTitle] = useState<string>('');

  const favoriteChampion: any | null = useMemo(() => {
    if (favorites.length) {
      return favorites.filter((fav: any) => fav.id === champion.id)[0];
    } else {
      return null;
    }
  }, [favorites, champion]);

  const handleCloseDrawer = (): void => {
    ref.current.endAnimation();
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
    setScroll(false);
  };

  const handleOpenDrawer: RefCallback<any> = useCallback(() => {
    ref.current.startAnimation();
    setScroll(true);
  }, [ref, setScroll]);

  const handleCarouselChange = ({index, item}: IHandleIndexParams): void => {
    if (index > 0) {
      const skin: IChampionSkin | any = champion.skins?.filter(
        (sk: IChampionSkin) => sk.num === item.num,
      )[0];
      if (skin) {
        setChampionTitle(skin.name);
      }
    } else {
      setChampionTitle(champion.title);
    }
  };

  return (
    <View style={styles.championOverViewContainer}>
      <ChampionHeader
        view={view}
        championId={champion.id}
        championKey={favoriteChampion ? favoriteChampion.key : null}
        isFav={favoriteChampion}
        showCloseButton={scroll}
        handleCloseDrawer={handleCloseDrawer}
      />

      <ChampionSkin
        handleCarouselChange={handleCarouselChange}
        championId={champion.id}
        championSkins={champion.skins || []}
      />

      <BottomDrawer ref={ref}>
        <ChampionHeroInfo
          championName={champion.name}
          championTitle={championTitle}
          handleOpenDrawer={!scroll ? handleOpenDrawer : null}
          height={height}
          championTags={champion.tags}
        />
        <ScrollView ref={scrollRef} scrollEnabled={scroll}>
          <ChampionDetails champion={champion} height={height} />
        </ScrollView>
      </BottomDrawer>
    </View>
  );
}

const styles = StyleSheet.create({
  championOverViewContainer: {
    position: 'relative',
    flex: 1,
  },
});

export default ChampionOverviewScreen;
