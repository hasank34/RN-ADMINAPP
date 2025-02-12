import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {rootStackOptions} from './config';
import {MainTabNavigator} from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Login"
        screenOptions={rootStackOptions}>
        <RootStack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="MainTabs"
          component={MainTabNavigator}
          options={{headerShown: false}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
