type IHeroOverViewDetails = {
    id: string
}

export type IHeroOverView = {
    HeroOverViewScreen: undefined,
    Details: IHeroOverViewDetails
};

export type RootStackParamList = {
    HeroeOverView: IHeroOverView;
    Home: undefined;
    Search: undefined;
    Favs: undefined;
    LogIn: undefined;
};
