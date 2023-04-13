import { ReactElement, useState } from "react"
import { Image } from "react-native";

function ImageContainer(
    { mainImage, styles }:
        { mainImage: string, styles: any }): ReactElement {

    const [image, setImage] =
        useState<string>(mainImage)

    const resetImage = (): void => {
        setImage('https://i.imgur.com/AizUHEf.png')
    }

    return <Image
        source={{ uri: image }}
        style={styles}
        onError={() => resetImage()}
    />
}

export default ImageContainer