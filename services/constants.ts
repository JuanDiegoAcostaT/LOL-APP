export const API_KEY: string = 'RGAPI-67aeca23-3fc7-423d-9364-81464aaa35d4';
export const BASE_URL_CHAMP: string = 'http://ddragon.leagueoflegends.com/cdn/';
export const BASE_URL_SUMMONER: string =
  'https://euw1.api.riotgames.com/lol/summoner/v4/summoners/';
export const BASE_URL_MATCH: string =
  'https://europe.api.riotgames.com/lol/match/v5/matches/';
export const BASE_URL_LEAGUE: string =
  'https://euw1.api.riotgames.com/lol/league/v4/';

export const mainEndpoint = async (url: string): Promise<any> => {
  const req = await fetch(`${url}`);
  const res = await req.json();
  return res;
};
