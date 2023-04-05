import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';

const Stack = createStackNavigator<AppStackParameterList>();

export type AppStackParameterList = {
  Main?: { screen: string };
  Splash: undefined;
};

const App = () => {
  return (
    <View style={styles.centered}>
      <Text style={styles.text}>App</Text>
    </View>
    // <SafeAreaProvider>
    //   <NavigationContainer theme={DarkTheme}>
    //     <Stack.Navigator screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}>

    //       {/* Splash Page */}
    //       {/* <Stack.Screen name="Splash" component={Splash}
    //         options={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }} /> */}

    //       {/* More Pages Here */}

    //       {/* Main Page */}
    //       {/* <Stack.Screen name="Main" component={Main}
    //         options={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }} /> */}

    //     </Stack.Navigator>
    //   </NavigationContainer>
    // </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  text: {
    // flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
});
