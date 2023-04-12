import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { ReactElement, useEffect } from "react";
import { Button, FlatList, Text, View } from "react-native";
import { useSafeArea } from "../hooks/useSafeAre";
import { ISummonerOverView } from "../interfaces/route";
import { colors, sizes } from "../styles/main";

function renderCategoryItem({ item }:
    { item: any }): ReactElement {
    const { participants } = item
    return <View>
        <Text>ChampionId : {participants.championId}</Text>
        <Text>Kills : {participants.kills}</Text>
        <Text>Deaths : {participants.deaths}</Text>
        <Text>Assists : {participants.assists}</Text>
        <Text>{participants.win ? "WIN" : "LOSE"}</Text>
        <Text>----------------------------------------</Text>
    </View>
}

function SummonerOverviewScreen
    (): ReactElement {
    const { insets } = useSafeArea()
    const { params } = useRoute<RouteProp<ISummonerOverView, 'Details'>>();
    const { summoner, league, matchesInfo } = params
    const navigation = useNavigation<any>();


    const handleGoToHome = (): void => {
        navigation.navigate('Search', {})
    }

    const averageStats = () => {
        return matchesInfo.reduce((prev: any, key: any) => {
            return {
                kills: (prev.participants ? prev.participants.kills : prev.kills) + key.participants.kills,
                deaths: (prev.participants ? prev.participants.deaths : prev.deaths) + key.participants.deaths,
                assists: (prev.participants ? prev.participants.assists : prev.assists) + key.participants.assists,
                win: (prev.participants ? prev.participants.win ? 1 : 0 : prev.win) + (key.participants.win ? 1 : 0)
            }
        })
    }

    return <View
        style={{
            ...insets,
            backgroundColor: colors.primary,
            flex: 1,
            justifyContent: 'center',
        }}
    >
        <Button
            title="go back"
            onPress={handleGoToHome} />
        <View style={{ padding: sizes.md }} >
            <Text>{league.tier}</Text>
            <Text>{league.queueType}</Text>
            <Text>{summoner.name}</Text>
            <Text>{summoner.summonerLevel}</Text>
        </View>
        <Text>Average</Text>
        <View style={{ flexDirection: 'row', padding : 16, justifyContent : 'center' }} >
            <Text>Kills : {averageStats().kills / 10}</Text>
            <Text>Deaths : {averageStats().deaths / 10}</Text>
            <Text>Assists : {averageStats().assists / 10}</Text>
            <Text>Win : {averageStats().win}</Text>
            <Text>Loss : {Math.abs(averageStats().win - 10)}</Text>
        </View>


        <FlatList
            data={matchesInfo}
            keyExtractor={(item) => item.gameId}
            renderItem={renderCategoryItem}
            numColumns={1}
        />
    </View>
};

export default SummonerOverviewScreen;