import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { IChampion } from "../interfaces/Champion";
import { IHeroOverView } from "../interfaces/route";
import { getChampionById } from "../services/championsService";
import { useSafeArea } from "../hooks/useSafeAre";
import { colors } from "../styles/main";
import ImageContainer from "../components/ImageContainer";
import { BASE_URL } from "../services/constants";


function ChampionOverviewScreen() {
    const { params } = useRoute<RouteProp<IHeroOverView, 'Details'>>();
    const { id }: { id: string } = params
    const { insets } = useSafeArea()
    const navigation = useNavigation<any>();


    const [champion, setChampion] =
        useState<IChampion | null>(null)


    const handleGoToHome = (): void => {
        navigation.navigate('Home', {})
    }

    useEffect(() => {
        getChampionById(id).then(r => setChampion(r))
    }, [])

    return <View
        style={{
            ...insets,
            backgroundColor: colors.primary,
            flex: 1
        }}
    >

        {
            champion ? <ScrollView>
                <View style={styles.championContainer} >
                    <Button
                        title="go back"
                        onPress={handleGoToHome} />
                    <ImageContainer
                        styles={styles.heroImage}
                        mainImage={BASE_URL +
                            'img/champion/loading/' +
                            `${champion.id}_0.jpg`} />
                    <Text>{champion.name}</Text>
                    <Text>{champion.title}</Text>
                    <Text>{champion.blurb}</Text>
                    <Text>{champion.lore}</Text>



                </View>
            </ScrollView>
                :
                <Text>Loading.....</Text>
        }
    </View>

}

const styles = StyleSheet.create({
    championContainer: {
        alignItems: 'center',
    },
    heroImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    }
})


export default ChampionOverviewScreen;