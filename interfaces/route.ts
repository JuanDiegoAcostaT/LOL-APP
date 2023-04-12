import { IChampion } from "./Champion";

type IHeroOverViewDetails = {
    champion: IChampion
}

export type IHeroOverView = {
    HeroOverViewScreen: undefined,
    Details: IHeroOverViewDetails
};

type ISummoneroverViewDetails = {
    summoner: any,
    league: any,
    matchesInfo: any
}

export type ISummonerOverView = {
    SummonerOverViewScreen: undefined,
    Details: ISummoneroverViewDetails
};

export type IHome = {
    HomeScreen: undefined,
    Details: any
}

export type RootStackParamList = {
    HeroeOverView: IHeroOverView;
    SummonerOverView: ISummonerOverView;
    Home: IHome;
    Search: undefined;
    Favs: undefined;
    LogIn: undefined;
};
