import React from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { screenHeight, screenWidth, typography } from '../assets';
import { hidePopup } from '../store/reducers/popup';
import { RootState } from '../store';
import { SafeAreaView } from 'react-native-safe-area-context';

const Popup = () => {
  const dispatch = useDispatch();
  const { showtime, message } = useSelector((state: RootState) => state.popup);
  if (showtime > 0) {
    return (
      <View style={[styles.modal, { top: Platform.OS === 'ios' ? 40 : 0 }]}>
        <Text style={typography.title2}>{message}</Text>
      </View>
    );
  } else return null;
};

export default Popup;

const styles = StyleSheet.create({
  modal: {
    zIndex: 2,
    backgroundColor: '#4D4D4D',
    width: screenWidth,
    height: screenHeight * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    borderBottomStartRadius: 5,
    borderBottomEndRadius: 5,
  },
});
