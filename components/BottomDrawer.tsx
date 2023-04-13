import React, {
    forwardRef,
    ForwardRefExoticComponent,
    RefAttributes,
    useImperativeHandle,
    useState
} from "react"
import { Animated, Dimensions } from "react-native"

type IBottomDrawer = {
    children?: React.ReactNode;
}

const BottomDrawer:
    ForwardRefExoticComponent<IBottomDrawer & RefAttributes<unknown>>
    = forwardRef((props: IBottomDrawer, ref: any) => {

        const { children } = props
        const intialState : Animated.Value = new Animated.Value(0)
        const height : number 
        = Dimensions.get('window').height

        const [state, setState] = useState<Animated.Value>(intialState)

        useImperativeHandle(ref, () => ({

            startAnimation() {
                Animated.timing(state, {
                    toValue: -600,
                    duration: 500,
                    useNativeDriver: false
                }).start(() => {
                    setState(intialState)
                });
            },

            endAnimation() {
                Animated.timing(state, {
                    toValue: 10,
                    duration: 1000,
                    useNativeDriver: false
                }).start(() => {
                    setState(intialState)
                });
            }
        }));


        const animatedStyles = {
            transform: [
                { translateY: state }
            ]
        }

        return <Animated.View
            style={[
                {
                    width: '100%',
                    height: height ,
                    position: 'absolute',
                    zIndex: 1,
                    bottom: -height + (height * 0.2),
                },
                animatedStyles
            ]}
        >
            {children}
        </ Animated.View>
    })



export default BottomDrawer