import React, { ReactElement } from "react";
import { StyleSheet, View } from "react-native";
import { sizes } from "../styles/main";
import Tag from "./Tag";

type IChampionTags = {
    championTags: string[],
    height: number
}

function ChampionTags(props: IChampionTags): ReactElement {

    const { championTags, height } = props

    return <>
        {
            championTags ?
                <View style={styles.tagContainer} >
                    {
                        championTags.map((tag: string) => {
                            return <Tag
                                key={tag}
                                text={tag} />
                        })
                    }
                </View> : null
        }
    </>
}


const styles = StyleSheet.create({
    tagContainer: {
        flexDirection: 'row',
    }
})
export default ChampionTags