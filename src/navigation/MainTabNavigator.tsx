import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ProductStack} from './ProductStack';
import {CategoryStack} from './CategoryStack';
import {tabScreenOptions} from './config';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={tabScreenOptions}>
      <Tab.Screen
        name="Products"
        component={ProductStack}
        options={{title: 'Ürünler'}}
      />
      <Tab.Screen
        name="Categories"
        component={CategoryStack}
        options={{title: 'Kategoriler'}}
      />
    </Tab.Navigator>
  );
};
