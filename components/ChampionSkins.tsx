import React, {ReactElement} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {IChampionSkin} from '../interfaces/Champion';
import {BASE_URL_CHAMP} from '../services/constants';
import Carousel, {IHandleIndexParams} from './Carousel';
import ImageContainer from './ImageContainer';

type IChampionSkinComponent = {
  championSkins: IChampionSkin[];
  championId: string;
  handleCarouselChange: ({index, item}: IHandleIndexParams) => void;
};

function ChampionSkin(props: IChampionSkinComponent): ReactElement {
  const {championSkins, championId, handleCarouselChange} = props;

  const carouselItem = ({num}: {num: IChampionSkin}): ReactElement => (
    <ImageContainer
      isUrl={true}
      styles={styles.imageContainer}
      mainImage={
        BASE_URL_CHAMP + 'img/champion/loading/' + `${championId}_${num}.jpg`
      }
    />
  );

  return (
    <Carousel
      height={Dimensions.get('window').height}
      width={Dimensions.get('window').width}
      delay={10000}
      keyElement={'id'}
      ItemElement={carouselItem}
      handleIndexChange={handleCarouselChange}
      data={championSkins || []}
    />
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    height: Dimensions.get('window').height,
    opacity: 0.7,
  },
});

export default ChampionSkin;
