// import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
// import { Platform } from 'react-native';

// import AccountInfo from './AccountInfo';
// import TabBar from './TabBar';

// export type MainStackParameterList = {
//   AccountInfo: undefined;
//   TabBar: undefined;
// };

// const Stack = createStackNavigator<MainStackParameterList>();

// const Main = () => {
//   const options = {
//     headerShown: false,
//     presentation: 'modal',
//     cardStyleInterpolator: Platform.OS === 'ios' ? undefined : CardStyleInterpolators.forModalPresentationIOS,
//     detachPreviousScreen: false,
//     gestureResponseDistance: 1000,
//     gestureEnabled: true,
//   };

//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="TabBar" component={TabBar} options={{ headerShown: false }} />
//       <Stack.Screen name="AccountInfo" component={AccountInfo} options={{ ...options, gestureResponseDistance: undefined }} />
//     </Stack.Navigator>
//   );
// };

// export default Main;
