import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';

export const tabScreenOptions = ({route}: {route: any}) => ({
  tabBarIcon: ({
    focused,
    color,
    size,
  }: {
    focused: boolean;
    color: string;
    size: number;
  }) => {
    let iconName: string = '';
    if (route.name === 'Products') {
      iconName = focused ? 'cube' : 'cube-outline';
    } else if (route.name === 'Categories') {
      iconName = focused ? 'list' : 'list-outline';
    }
    return <Icon name={iconName} size={size} color={color} />;
  },
  tabBarActiveTintColor: '#2196F3',
  tabBarInactiveTintColor: 'gray',
  headerShown: false,
});

export const rootStackOptions = {
  headerStyle: {
    backgroundColor: '#f8f9fa',
  },
  headerTintColor: '#333',
  headerBackTitle: 'Geri',
  headerShadowVisible: false,
};
