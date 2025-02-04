import React, {ReactElement} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {modalSelector, toogleDeActive} from '../redux/slices/ModalSlice';
import {colors, mainStyles, sizes} from '../styles/main';
import CustomButton from './CustomButton';

function CustomModal(): ReactElement {
  const {active, text, title} = useSelector(modalSelector);
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(toogleDeActive({}));
  };

  return (
    <Modal animationType={'fade'} visible={active} transparent={true}>
      <View style={styles.modalContainer}>
        <View style={[styles.modalInnerContainer, mainStyles.shadow]}>
          <Text style={mainStyles.mainTitle}>{title}</Text>
          <Text style={{color: colors.white}}>{text}</Text>
          <CustomButton
            handlePress={handleCloseModal}
            text={'Close'}
            icon={'close'}
          />
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  modalContainer: {
    ...(StyleSheet.absoluteFill as object),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  modalInnerContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 200,
    width: '80%',
    borderRadius: sizes.lg,
    padding: sizes.md,
    backgroundColor: colors.secondary,
  },
});

export default CustomModal;
