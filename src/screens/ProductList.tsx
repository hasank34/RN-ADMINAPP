import React, {useEffect, useCallback} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {FAB, useTheme} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {fetchProducts, deleteProduct} from '../store/slices/productsSlice';
import {useNetInfo} from '../hooks/useNetInfo';
import {FlatList} from 'react-native-gesture-handler';
import ProductCard from '../components/products/ProductCard';
import EmptyState from '../components/common/EmptyState';
import LoadingSpinner from '../components/LoadingSpinner';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Product} from '@/types/types';
type ProductListNavigationProp =
  NativeStackNavigationProp<ProductStackParamList>;

const ProductList = () => {
  const navigation = useNavigation<ProductListNavigationProp>();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const {items: products, status} = useAppSelector(state => state.products);
  const isConnected = useNetInfo();

  useEffect(() => {
    if (isConnected) {
      dispatch(fetchProducts());
    }
  }, [dispatch, isConnected]);

  const handleDelete = useCallback(
    (id: number, name: string) => {
      Alert.alert(
        'Ürünü Sil',
        `"${name}" ürününü silmek istediğinize emin misiniz?`,
        [
          {text: 'İptal', style: 'cancel'},
          {
            text: 'Sil',
            style: 'destructive',
            onPress: () => {
              if (isConnected) {
                dispatch(deleteProduct(id));
              }
            },
          },
        ],
      );
    },
    [dispatch, isConnected],
  );

  const handleEdit = useCallback(
    (id: number) => {
      navigation.navigate('EditProduct', {id});
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({item}: {item: Product}) => (
      <ProductCard item={item} onEdit={handleEdit} onDelete={handleDelete} />
    ),
    [handleEdit, handleDelete],
  );

  if (!isConnected) {
    return <EmptyState icon="wifi-off" message="İnternet Bağlantısı Yok" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
        refreshing={status === 'loading'}
        onRefresh={() => dispatch(fetchProducts())}
        ListEmptyComponent={
          status === 'loading' ? (
            <LoadingSpinner />
          ) : (
            <EmptyState
              icon="package-variant"
              message="Henüz ürün eklenmemiş"
              buttonText="Yeni Ürün Ekle"
              onButtonPress={() => navigation.navigate('AddProduct')}
            />
          )
        }
      />
      <FAB
        icon="plus"
        style={[styles.fab, {backgroundColor: theme.colors.primary}]}
        onPress={() => navigation.navigate('AddProduct')}
        label="Yeni Ürün"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  separator: {
    height: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default ProductList;
