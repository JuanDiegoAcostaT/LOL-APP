import React, {
  useRef,
  useState,
  useEffect,
  ReactElement,
  MutableRefObject,
} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ScrollViewComponent,
  NativeSyntheticEvent,
  NativeScrollEvent,
  NativeScrollPoint,
  NativeScrollSize,
  TouchableOpacity,
} from 'react-native';

export type IHandleIndexParams = {
  item: any;
  index: number;
};

type ICarousel = {
  data: any[];
  height: number;
  width: number;
  delay: number;
  onPress?: Function;
  ItemElement: ReactElement | any;
  handleIndexChange?: (Object: IHandleIndexParams) => void;
};

export default function Carousel({
  data,
  height,
  width,
  delay,
  onPress,
  ItemElement,
  handleIndexChange,
}: ICarousel): ReactElement {
  const [selectedIndex, setselectedIndex] = useState<number>(0);
  const scrollView: MutableRefObject<ScrollViewComponent> | any =
    useRef<ScrollViewComponent>();

  useEffect(() => {
    const fn: number = setInterval(() => {
      setselectedIndex((oldCount: number) =>
        oldCount === data.length - 1 ? 0 : oldCount + 1,
      );
    }, delay);
    return () => {
      clearInterval(fn);
    };
  }, []);

  useEffect(() => {
    scrollView.current.scrollTo({
      animated: true,
      x: +width * selectedIndex,
      y: 0,
    });
    if (handleIndexChange)
      handleIndexChange({item: data[selectedIndex], index: selectedIndex});
  }, [selectedIndex]);

  const setIndex = (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
    const contentOffset: NativeScrollPoint = event.nativeEvent.contentOffset;
    const viewSize: NativeScrollSize = event.nativeEvent.layoutMeasurement;
    setselectedIndex(Math.floor(contentOffset.x / viewSize.width));
  };

  return (
    <View>
      <ScrollView
        ref={scrollView}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={setIndex}
        onContentSizeChange={() => scrollView.current.scrollToEnd()}>
        <View style={styles.carousalContainer}>
          {data.map((item: any, index: number) => (
            <TouchableOpacity
              key={item['keyElement']}
              activeOpacity={0.8}
              onPress={() => (onPress ? onPress(item) : null)}
              style={[
                {
                  height: height,
                  width: width,
                },
              ]}>
              <ItemElement {...item} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  carousalContainer: {
    flexDirection: 'row',
    width: '100%',
  },
});
