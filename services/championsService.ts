import { IChampion } from '../interfaces/Champion'
import { BASE_URL } from './constants'

const mainEndpoint = async (queries: string): Promise<any> => {
    const req = await fetch(`${BASE_URL}${queries}`)
    const res = await req.json()
    return res
}

export const getChampionsList = async (): Promise<IChampion[]> => {
    const res = await mainEndpoint('13.6.1/data/en_US/champion.json')
    return Object.values(res.data)
}

export const getChampionById = async (id: string): Promise<IChampion> => {
    const res = await mainEndpoint(`13.6.1/data/en_US/champion/${id}.json`)
    const data: IChampion = res.data
    return Object.values(data)[0]
}