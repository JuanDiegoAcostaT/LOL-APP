import React, {
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
  useImperativeHandle,
  useState,
} from 'react';
import {Animated, Dimensions, StyleSheet} from 'react-native';

type IBottomDrawer = {
  children?: React.ReactNode;
};

const BottomDrawer: ForwardRefExoticComponent<
  IBottomDrawer & RefAttributes<unknown>
> = forwardRef((props: IBottomDrawer, ref: any) => {
  const {children} = props;
  const intialState: Animated.Value = new Animated.Value(0);
  const [state, setState] = useState<Animated.Value>(intialState);

  useImperativeHandle(ref, () => ({
    startAnimation() {
      Animated.timing(state, {
        toValue: -500,
        duration: 500,
        useNativeDriver: false,
      }).start(() => {
        setState(intialState);
      });
    },

    endAnimation() {
      Animated.timing(state, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
      }).start(() => {
        setState(intialState);
      });
    },
  }));

  const animatedStyles = {
    transform: [{translateY: state}],
  };

  return (
    <Animated.View style={[styles.animated, animatedStyles]}>
      {children}
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  animated: {
    width: '100%',
    height: Dimensions.get('window').height,
    position: 'absolute',
    zIndex: 1,
    bottom: -(Dimensions.get('window').height * 0.75),
  },
});

export default BottomDrawer;
