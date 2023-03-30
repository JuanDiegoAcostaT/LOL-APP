import { useSafeAreaInsets } from "react-native-safe-area-context";

export const useSafeArea = () => {
    const insets = useSafeAreaInsets();
    return {
        insets: {
            paddingTop: insets.top,
            // paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
        }
    }
}