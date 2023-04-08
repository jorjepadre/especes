import { Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import React from 'react';

const KeyboardRemovableView = (props: { children?: React.ReactNode }) => {
  return (
    <TouchableWithoutFeedback style={styles.container} onPress={() => Keyboard.dismiss()}>
      {props.children}
    </TouchableWithoutFeedback>
  );
};

export default KeyboardRemovableView;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
});
