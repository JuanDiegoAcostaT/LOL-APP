import { ReactElement, useState } from "react"
import { DEFAULT_IMG } from "../services/constants"
import { Image } from "react-native";

function ImageContainer(
    { mainImage, styles }:
        { mainImage: string, styles: any }): ReactElement {

    const [image, setImage] =
        useState<string>(mainImage)

    const resetImage = (): void => {
        setImage(DEFAULT_IMG)
    }

    return <Image
        source={{ uri: image }}
        style={styles}
        onError={() => resetImage()}
    />
}

export default ImageContainer