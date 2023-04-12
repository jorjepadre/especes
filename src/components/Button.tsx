import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

import { fontScale, screenHeight, screenWidth } from '../assets';

const Button = ({
  type = 'primary',
  ...props
}: TouchableOpacityProps & {
  type?: 'primary' | 'secondary' | 'outline' | 'confirm' | 'settingsButton';
}) => {
  let buttonStyle, textStyle;
  if (type === 'primary') {
    buttonStyle = styles.buttonPrimary;
    textStyle = styles.textPrimary;
  } else if (type === 'secondary') {
    buttonStyle = styles.buttonSecondary;
    textStyle = styles.textSecondary;
  } else if (type === 'outline') {
    buttonStyle = styles.buttonOutline;
    textStyle = styles.textOutline;
  } else if (type === 'confirm') {
    buttonStyle = styles.buttonConfirm;
    textStyle = styles.textConfirm;
  } else if (type === 'settingsButton') {
    buttonStyle = styles.buttonSettings;
    textStyle = styles.textSettings;
  }
  return (
    <TouchableOpacity
      {...props}
      style={[
        props.disabled ? styles.buttonDisabled : buttonStyle,
        props.style,
      ]}
      onPress={props.onPress}
      disabled={props.disabled}>
      {typeof props.children === 'string' ? (
        <Text style={props.disabled ? styles.textDisabled : textStyle}>
          {props.children}
        </Text>
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};

const buttonBaseStyles: ViewStyle = {
  height: screenHeight * 0.069,
  width: screenWidth * 0.45,
  borderRadius: screenHeight * 0.4,
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 5,
  paddingVertical: 5,
  marginHorizontal: 5,
  marginVertical: 5,
};

const styles = StyleSheet.create({
  buttonPrimary: {
    ...buttonBaseStyles,
    backgroundColor: '#9b924d',
  },
  buttonSecondary: {
    ...buttonBaseStyles,
    backgroundColor: '#4D4D4D',
  },
  buttonDisabled: {
    ...buttonBaseStyles,
    backgroundColor: '#252525',
  },
  buttonOutline: {
    ...buttonBaseStyles,
    backgroundColor: '#4D4D4D',
    borderWidth: 4,
    borderColor: '#9b924d',
  },
  buttonConfirm: {
    ...buttonBaseStyles,
    width: screenWidth * 0.85,
    backgroundColor: '#9b924d',
  },
  buttonSettings: {
    ...buttonBaseStyles,
    width: screenWidth * 0.85,
    height: screenHeight * 0.1,
    borderRadius: screenHeight * 0.015,
    backgroundColor: '#4D4D4D',
    borderWidth: 1,
    borderColor: '#9b924d',
  },
  textPrimary: {
    color: '#FFFFFF',
    fontSize: fontScale * 15,
    fontFamily: 'OpenSans-SemiBold',
  },
  textSecondary: {
    color: '#989898',
    fontSize: fontScale * 15,
    fontFamily: 'OpenSans-SemiBold',
  },
  textDisabled: {
    color: '#868686',
    fontSize: fontScale * 15,
    fontFamily: 'OpenSans-SemiBold',
  },
  textOutline: {
    color: '#FFFFFF',
    fontSize: fontScale * 15,
    fontFamily: 'OpenSans-SemiBold',
  },
  textConfirm: {
    color: '#FFFFFF',
    fontSize: fontScale * 15,
    fontFamily: 'OpenSans-SemiBold',
  },
  textSettings: {
    color: '#FFFFFF',
    fontSize: fontScale * 15,
    fontFamily: 'OpenSans-Bold',
  },
});

export default React.memo(Button);
