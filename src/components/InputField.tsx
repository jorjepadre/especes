import React, { useReducer } from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { fontScale, screenHeight, screenWidth } from '../assets';

export enum InputActions {
  SET_VALUE,
  SET_ERROR,
}

enum PasswordActions {
  CHANGE_VISIBILITY = 2,
}

type InputState = {
  value: string;
  errorMessage: string;
  visible?: boolean;
};

const inputInitialState = {
  value: '',
  errorMessage: '',
};

const inputReducer = (
  state: InputState,
  action: {
    type: InputActions | PasswordActions;
    payload?: string;
  }
) => {
  switch (action.type) {
    case InputActions.SET_VALUE:
      return {
        ...state,
        value: action.payload!,
        errorMessage: '',
      };
    case InputActions.SET_ERROR:
      return {
        ...state,
        errorMessage: action.payload!,
      };
    case PasswordActions.CHANGE_VISIBILITY:
      return {
        ...state,
        visible: !state.visible,
      };
    default:
      return state;
  }
};

export const useInputReducer = (value?: string) =>
  useReducer(inputReducer, { ...inputInitialState, value: value ?? '' });

type InputFieldProps = {
  state: InputState;
  dispatch: React.Dispatch<{
    type: InputActions | PasswordActions;
    payload?: string;
  }>;
  contentContainerStyle?: StyleProp<ViewStyle>;
} & TextInputProps;

const InputField = (props: InputFieldProps) => {
  const { value, errorMessage, visible } = props.state;
  return (
    <View>
      <View
        style={[
          styles.textInputField,
          props.contentContainerStyle,
          errorMessage !== '' && {
            borderColor: '#b54747',
            backgroundColor: '#451919',
          },
        ]}>
        <TextInput
          style={[styles.textInput, props.style]}
          placeholderTextColor="#989898"
          autoCorrect={false}
          {...{ ...props, children: undefined }}
          value={value}
          secureTextEntry={props.secureTextEntry && !visible}
          onChangeText={(text) =>
            props.dispatch({ type: InputActions.SET_VALUE, payload: text })
          }
        />
        {props.children}
        {props.secureTextEntry && (
          <TouchableOpacity
            onPress={() =>
              props.dispatch({ type: PasswordActions.CHANGE_VISIBILITY })
            }>
            {!visible ? (
              <Image
                style={styles.showHideImage}
                source={require('../assets/icons/hide.png')}
              />
            ) : (
              <Image
                style={styles.showHideImage}
                source={require('../assets/icons/show.png')}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
      {errorMessage !== '' && <Text style={styles.error}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  showHideImage: {
    height: (screenHeight * 20) / 670,
    width: (screenHeight * 20) / 670,
    resizeMode: 'contain',
  },
  textInput: {
    color: '#FFFFFF',
    height: (screenHeight * 45) / 670,
    fontSize: fontScale * 16,
    fontFamily: 'OpenSans-SemiBold',
    flex: 1,
    flexWrap: 'wrap',
  },
  textInputField: {
    width: '100%',
    paddingHorizontal: (screenWidth * 10) / 375,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 7,
    alignItems: 'center',
    height: (screenHeight * 45) / 670,
    flexDirection: 'row',
    backgroundColor: '#252525',
    borderColor: '#9b924d',
  },
  error: {
    alignItems: 'center',
    color: '#FF6969',
    fontSize: fontScale * 12,
    marginTop: 5,
    marginLeft: 5,
    fontFamily: 'OpenSans-SemiBold',
  },
});

export default InputField;
