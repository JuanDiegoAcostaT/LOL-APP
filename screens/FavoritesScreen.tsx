import React from "react";
import { Text, View } from "react-native"
import { useSelector } from "react-redux";
import { favoritesSummonerSelector } from "../redux/slices/FavoritesSummonersSlice";


function FavoritesScreen() {
    const { favorites } = useSelector(favoritesSummonerSelector)
    return <View>

        <Text>Favorites</Text>
        {
            favorites.map((favId) => {
                return <Text id={favId} >{favId}</Text>
            })
        }

    </View>
}

export default FavoritesScreen;