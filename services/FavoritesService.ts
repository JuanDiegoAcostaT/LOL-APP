import {BASE_URL_FIREBASE, mainEndpoint} from './constants';

export const storeFavs = async (favId: string): Promise<any> => {
  const res = await mainEndpoint(BASE_URL_FIREBASE + 'favorites.json', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({id: favId}),
  });
  return res;
};

export const fetchFavs = async (): Promise<any> => {
  const res = await mainEndpoint(BASE_URL_FIREBASE + 'favorites.json');
  //TODO
  const favorites: any[] = [];

  for (const key in res) {
    const fav = {
      key,
      id: res[key].id,
    };
    favorites.push(fav);
  }
  return favorites;
};

export const deleteFavs = async (id: string): Promise<any> => {
  const res = await mainEndpoint(BASE_URL_FIREBASE + `/favorites/${id}.json`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: null,
  });
  console.log(res);
  return id;
};
