import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CategoryList from '../screens/CategoryList';
import AddCategory from '../screens/AddCategory';

const Stack = createNativeStackNavigator<CategoryStackParamList>();

export const CategoryStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CategoryList"
        component={CategoryList}
        options={{title: 'Kategoriler'}}
      />
      <Stack.Screen
        name="AddCategory"
        component={AddCategory}
        options={{title: 'Yeni Kategori'}}
      />
    </Stack.Navigator>
  );
};
