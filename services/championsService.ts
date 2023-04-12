import { IChampion } from '../interfaces/Champion'
import { BASE_URL_CHAMP, mainEndpoint } from './constants'

export const getChampionsList = async (): Promise<IChampion[]> => {
    const res = await mainEndpoint(BASE_URL_CHAMP + '13.6.1/data/en_US/champion.json')
      return Object.values(res.data)
}

export const getChampionById = async (id: string): Promise<IChampion> => {
    const res = await mainEndpoint(BASE_URL_CHAMP + `13.6.1/data/en_US/champion/${id}.json`)
    const data: IChampion = res.data
    return Object.values(data)[0]
}

