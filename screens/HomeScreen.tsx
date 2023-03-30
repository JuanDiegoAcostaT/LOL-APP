import React, { ReactElement, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSafeArea } from "../hooks/useSafeAre";
import { colors, mainTitle } from "../styles/main";
import { getChampionsList } from '../services/championsService'
import Champion from "../components/Champion";
import { IChampion } from "../interfaces/Champion";

function renderCategoryItem({ item }:
    { item: IChampion }): ReactElement {
    return <Champion champion={item} />
}

function HomeScreen() {
    const { insets } = useSafeArea()
    const [champions, setChampions] = useState<IChampion[]>([])

    useEffect(() => {
        getChampionsList().then((res) =>  setChampions(res))  
    }, [])

    return <View
        style={{
            ...insets,
            backgroundColor: colors.primary,
            flex: 1
        }}
    >
        <Text style={mainTitle} >
            Trending
        </Text>

            <FlatList
                data={champions}
                keyExtractor={(item) => item.id}
                renderItem={renderCategoryItem}
                numColumns={2}
            />
    </View>
}

export default HomeScreen;


