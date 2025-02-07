import React, {ReactElement} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {spinnerActiveSelector} from '../redux/slices/SpinnerSlice';
import {colors} from '../styles/main';

function Spinner(): ReactElement {
  const active: boolean = useSelector(spinnerActiveSelector);

  return (
    <>
      {active ? (
        <View style={styles.container}>
          <ActivityIndicator
            animating={true}
            size={'large'}
            color={colors.primary}
          />
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    ...(StyleSheet.absoluteFill as object),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});
export default Spinner;
