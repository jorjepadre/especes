import { StackScreenProps } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MainStackParameterList } from './Main';
import { View, Image, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { screenHeight, screenWidth } from '../assets';
import Home from './Home';
import History from './History';
import Settings from './Settings';
import React from 'react';

const icons = {
  Home: require('../assets/icons/home.png'),
  History: require('../assets/icons/history.png'),
  Settings: require('../assets/icons/settings.png'),
};

export type TabBarParameterList = {
  Home: undefined;
  History: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<TabBarParameterList>();

const TabBar = (props: StackScreenProps<MainStackParameterList, 'TabBar'>) => {
  const routes = props.navigation.getState().routes;
  console.log('Inside Tabbar');
  return (
    <>
      <View style={routes[routes.length - 1].state?.index !== 0 && { height: 0 }}>
        <Header />
      </View>

      <View style={{ flex: 1 }}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
              const icon = icons[route.name];
              return <Image source={icon} style={{ ...styles.tabBarItem, tintColor: focused ? '#9b924d' : '#ffffff' }} />;
            },
            headerShown: false,
            tabBarLabel: '',
          })}>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="History" component={History} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 50,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    elevation: 2,
  },
  tabBarItem: {
    width: '40%',
    height: screenHeight * 0.045,
    marginTop: screenHeight * 0.02,
    resizeMode: 'contain',
    justifyContent: 'center',
  },
});

export default TabBar;
