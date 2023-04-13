import React, { ReactElement } from "react";
import { StyleSheet, Text, View } from "react-native";
import ImageContainer from "../components/ImageContainer";
import { IChampionSpell } from "../interfaces/Champion";
import { BASE_URL_CHAMP } from "../services/constants";
import { colors, sizes } from "../styles/main";

type IChampionSpells = {
    spells: IChampionSpell[]
}

function ChampionSpells({ spells }: IChampionSpells): ReactElement {

    return <View style={styles.spellsContainer} >
        {
            spells.map((spell: IChampionSpell) => {
                return <View
                    style={styles.spell}
                    key={spell.id}>
                    <ImageContainer
                        styles={{
                            height: 60,
                            width: 60,
                            borderRadius: 15
                        }}
                        mainImage={`${BASE_URL_CHAMP +
                            '13.7.1/img/spell/' +
                            spell.image.full}`}
                    />
                    <Text style={styles.spellName} >{spell.name}</Text>
                </View>
            })
        }

    </View>

}

const styles = StyleSheet.create({
    spellsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: sizes.xl
    },
    spell: {
        width: '50%',
        alignItems: 'center',
        marginTop: sizes.lg
    },
    spellName: {
        color: colors.white,
        marginTop: sizes.md
    }
})

export default ChampionSpells