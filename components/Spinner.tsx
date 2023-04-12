import React, { ReactElement } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { spinnerActiveSelector } from "../redux/slices/SpinnerSlice";
import { colors } from "../styles/main";

function Spinner(): ReactElement {
    const active: boolean = useSelector(spinnerActiveSelector)

    return <>
        {
            active ?
                <View
                    style={{
                        ...(StyleSheet.absoluteFill as object),
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(68, 60, 104, 0.8)'
                    }}>
                    <ActivityIndicator
                        animating={true}
                        size={'large'}
                        color={colors.white} />
                </View> : null
        }</>
}
export default Spinner