import { useNavigation } from "@react-navigation/native";
import React, { ReactElement } from "react";
import { Pressable, StyleSheet, View } from "react-native";
//@ts-ignore
import Icon from 'react-native-vector-icons/AntDesign';
import { useDispatch } from "react-redux";
import { useSafeArea } from "../hooks/useSafeAre";
import { removeFavs, setFavs } from "../redux/slices/FavoritesSummonersSlice";
import { sizes, colors } from "../styles/main";

type IChampionHeader = {
    isFav: string | null,
    championId: string,
    handleCloseDrawer: Function,
    showCloseButton: boolean
}

function ChampionHeader({ isFav,
    championId,
    handleCloseDrawer,
    showCloseButton }: IChampionHeader): ReactElement {
    const { insets } = useSafeArea()
    const navigation = useNavigation<any>();
    const dispatch = useDispatch()

    const handleGoToHome = (): void => {
        navigation.navigate('Home', {})
    }

    const handleFav = (): void => {
        if (isFav) {
            dispatch(removeFavs(championId))
        } else {
            dispatch(setFavs(championId))
        }
    }

    return <View
        style={{
            ...styles.headerActions,
            marginTop: insets.paddingTop
        }} >
        <Pressable
            style={styles.buttonBackground}
            onPress={handleGoToHome} >
            <Icon
                size={sizes.lg}
                name="arrowleft"
                color={colors.primary}
            />
        </Pressable>
        {
            showCloseButton ? <Pressable
                style={styles.buttonBackground}
                onPress={() => handleCloseDrawer()} >
                <Icon
                    size={sizes.lg}
                    name={'close'}
                    color={colors.primary}
                />
            </Pressable> : null
        }

        <Pressable
            style={styles.buttonBackground}
            onPress={handleFav} >
            <Icon
                size={sizes.lg}
                name={isFav ? "star" : "staro"}
                color={colors.primary}
            />
        </Pressable>

    </View>
}

const styles = StyleSheet.create({
    headerActions: {
        position: 'absolute',
        top: 0,
        zIndex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: sizes.lg,
    },
    buttonBackground: {
        backgroundColor: colors.white,
        width: sizes.xl,
        height: sizes.xl,
        borderRadius: 44 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4, // android,
        //ios
        shadowColor: colors.black,
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
    }
})

export default ChampionHeader;