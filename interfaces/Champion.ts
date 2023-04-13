interface IChampionImage {
    full: string,
    sprite: string,
    group: string,
    x: number,
    y: number,
    w: number,
    h: number
}

export interface IChampionSkin {
    id: string,
    num: number,
    name: string,
    chromas: boolean
}

interface IChampionInfo {
    attack: number,
    defense: number,
    magic: number,
    difficulty: number
}

interface IChampionStats {
    hp: number,
    hpperlevel: number,
    mp: number,
    mpperlevel: number,
    movespeed: number,
    armor: number,
    armorperlevel: number,
    spellblock: number,
    spellblockperlevel: number,
    attackrange: number,
    hpregen: number,
    hpregenperlevel: number,
    mpregen: number,
    mpregenperlevel: number,
    crit: number,
    critperlevel: number,
    attackdamage: number,
    attackdamageperlevel: number,
    attackspeedperlevel: number,
    attackspeed: number
}

interface ISpellLeveltip {
    label: string[],
    effect: string[]
}

export interface IChampionSpell {
    id: string,
    name: string,
    description: string,
    tooltip: string,
    leveltip: ISpellLeveltip,
    maxrank: number,
    cooldown: number[],
    cooldownBurn: string,
    cost: number[],
    costBurn: string,
    datavalues: any,
    effect: number | null[][],
    effectBurn: string | null[],
    vars: any,
    costType: string,
    maxammo: string,
    range: number[],
    rangeBurn: string,
    image: IChampionImage,
    resource: string

}

interface IChampionPassive {
    name: string,
    description: string,
    image: IChampionImage
}

export interface IChampion {
    id: string,
    version: string,
    key: string,
    name: string,
    title: string,
    image: IChampionImage
    skins?: IChampionSkin[],
    lore?: string,
    blurb: string,
    allytips?: string[],
    enemytips?: string[],
    tags: string[],
    partype: string,
    info: IChampionInfo,
    stats: IChampionStats,
    spells?: IChampionSpell[],
    passive?: IChampionPassive,
    recommended?: any[]
}