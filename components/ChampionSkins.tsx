import React, { ReactElement } from "react";
import { Dimensions } from "react-native";
import { IChampionSkin } from "../interfaces/Champion";
import { BASE_URL_CHAMP } from "../services/constants";
import Carousel, { IHandleIndexParams } from "./Carousel";
import ImageContainer from "./ImageContainer";

type IChampionSkinComponent = {
    championSkins: IChampionSkin[],
    championId: string,
    handleCarouselChange: ({ index, item }: IHandleIndexParams) => void
}

function ChampionSkin(props: IChampionSkinComponent):
    ReactElement {

    const { championSkins, championId, handleCarouselChange } = props

    const carouselItem = ({ num }:
        { num: IChampionSkin }): ReactElement => (
        <ImageContainer
            styles={{
                height:
                    Dimensions.get('window').height,
                opacity: 0.7
            }}
            mainImage={BASE_URL_CHAMP +
                'img/champion/loading/' +
                `${championId}_${num}.jpg`} />
    );


    return <Carousel
        height={Dimensions.get('window').height}
        width={Dimensions.get('window').width}
        delay={10000}
        ItemElement={carouselItem}
        keyElement={'num'}
        handleIndexChange={handleCarouselChange}
        data={championSkins || []} />
}

export default ChampionSkin