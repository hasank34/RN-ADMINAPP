import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

declare global {
  type RootStackParamList = {
    Login: undefined;
    MainTabs: undefined;
  };

  type ProductStackParamList = {
    ProductList: undefined;
    AddProduct: undefined;
    EditProduct: {id: number};
  };

  type CategoryStackParamList = {
    CategoryList: undefined;
    AddCategory: undefined;
  };

  type MainTabParamList = {
    Products: undefined;
    Categories: undefined;
  };

  type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
  type ProductStackNavigationProp =
    NativeStackNavigationProp<ProductStackParamList>;
  type CategoryStackNavigationProp =
    NativeStackNavigationProp<CategoryStackParamList>;
  type MainTabNavigationProp = BottomTabNavigationProp<MainTabParamList>;
}
