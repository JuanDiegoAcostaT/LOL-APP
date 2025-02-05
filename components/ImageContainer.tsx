import React, {ReactElement, useState} from 'react';
import {Image} from 'react-native';
//@ts-ignore
import lolLogo from '../assets/images/lol_logo.png';

//TODO
const DEFAULT_IMAGES: any = {
  lolLogo,
};

function ImageContainer({
  mainImage,
  styles,
  isUrl,
}: {
  isUrl?: boolean;
  mainImage: string;
  styles: any;
}): ReactElement {
  const [image, setImage] = useState<string>(mainImage);

  const resetImage = (): void => {
    setImage('https://i.imgur.com/AizUHEf.png');
  };
  if (isUrl) {
    return (
      <Image
        source={{uri: image}}
        style={styles}
        onError={() => resetImage()}
      />
    );
  }

  return (
    <Image
      source={DEFAULT_IMAGES[mainImage]}
      style={styles}
      onError={() => resetImage()}
    />
  );
}

export default ImageContainer;
