import { ComplexAnimationBuilder } from "react-native-reanimated"
import { API_KEY, BASE_URL_LEAGUE, BASE_URL_MATCH, BASE_URL_SUMMONER, mainEndpoint } from "./constants"

export const getSummonerByName = async (name: string) => {
    const res = await
        mainEndpoint(`${BASE_URL_SUMMONER}by-name/${name}?api_key=${API_KEY}`)
    return res
}

export const getSummonerLeague = async (summonerId: string) => {
    const res = await
        mainEndpoint(`${BASE_URL_LEAGUE}entries/by-summoner/${summonerId}?api_key=${API_KEY}`)
    return res
}

export const getSummonerMatchesIds = async (puuid: string, count: number) => {
    const res = await
        mainEndpoint(`${BASE_URL_MATCH}by-puuid/${puuid}/ids?count=${count}&api_key=${API_KEY}`)
    return res
}


export const getSummonetMatchesInfo = async (matchesIds: string[], summonerPuuid : string) => {
    let matchesInfo: any[] = []
    let requests = matchesIds.map((matchId: string) => {
        return mainEndpoint(`${BASE_URL_MATCH}${matchId}?api_key=${API_KEY}`)
    })
    return Promise.all(requests).then((body) => {
        body.forEach(res => {
            res.info.participants = res.info.participants.filter((info : any) => {
                return info.puuid == summonerPuuid
            })[0]
            matchesInfo.push(res.info)
        })
        return matchesInfo
    }).catch(err => console.log(err))

}

