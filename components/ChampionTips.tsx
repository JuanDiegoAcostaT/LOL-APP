import React, { ReactElement } from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, sizes } from "../styles/main";

type IChampionTips = {
    title: string,
    tips: string[]
}

function ChampionTips({ title, tips }: IChampionTips): ReactElement {
    return <View
        style={styles.tipsContainer} >
        <Text
            style={styles.subTitleText} >
            {title}</Text>
        {
            tips.map((tip: string, index : number) => {
                return <Text
                    style={styles.detailsText}
                    key={tip} >
                    - {tip}
                </Text>
            })
        }
    </View>
}

const styles = StyleSheet.create({
    tipsContainer: {
        paddingVertical: sizes.sm,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    detailsText: {
        color: colors.white,
        paddingVertical: sizes.md,
        fontFamily : 'Spiegel'

    },
    subTitleText: {
        fontSize: sizes.lg,
        color: colors.white,
        fontFamily : 'BeaufortforLOL-Medium'
    },
})

export default ChampionTips