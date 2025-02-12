import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductList from '../screens/ProductList';
import AddProduct from '../screens/AddProduct';
import EditProduct from '../screens/EditProduct';

const Stack = createNativeStackNavigator<ProductStackParamList>();

export const ProductStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductList"
        component={ProductList}
        options={{title: 'Ürünler'}}
      />
      <Stack.Screen
        name="AddProduct"
        component={AddProduct}
        options={{title: 'Yeni Ürün'}}
      />
      <Stack.Screen
        name="EditProduct"
        component={EditProduct}
        options={{title: 'Ürün Düzenle'}}
      />
    </Stack.Navigator>
  );
};
