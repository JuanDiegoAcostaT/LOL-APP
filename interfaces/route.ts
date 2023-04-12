type IHeroOverViewDetails = {
    id: string
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
export type RootStackParamList = {
    HeroeOverView: IHeroOverView;
    SummonerOverView: ISummonerOverView;
    Search: undefined;
    Favs: undefined;
    LogIn: undefined;
};
