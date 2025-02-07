export const API_KEY: string = 'RGAPI-67aeca23-3fc7-423d-9364-81464aaa35d4';
export const AUTH_API_KEY: string = 'AIzaSyCFak-ZlDf2RIURB0DhMvxUpU3mUgBfWdQ';
export const BASE_URL_CHAMP: string = 'http://ddragon.leagueoflegends.com/cdn/';
export const BASE_URL_SUMMONER: string =
  'https://euw1.api.riotgames.com/lol/summoner/v4/summoners/';
export const BASE_URL_MATCH: string =
  'https://europe.api.riotgames.com/lol/match/v5/matches/';
export const BASE_URL_LEAGUE: string =
  'https://euw1.api.riotgames.com/lol/league/v4/';
export const BASE_URL_FIREBASE: string =
  'https://leage-of-legends-default-rtdb.firebaseio.com/';
export const BASE_URL_AUTH: string =
  'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';

type IMainEndpointInit = {
  method?: string;
  headers?: HeadersInit_;
  body: any;
};

const DEFAULT_INIT: IMainEndpointInit = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: null,
};

// type IMainEndpointParams = {
//   url: string;
//   init?: IMainEndpointInit;
// };

export const mainEndpoint = async (
  url: string,
  init: IMainEndpointInit = DEFAULT_INIT,
): Promise<any> => {
  const req = await fetch(`${url}`, init);
  const res = await req.json();
  return res;
};
