import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Text, FAB, useTheme} from 'react-native-paper';
import Animated, {FadeInLeft, Layout} from 'react-native-reanimated';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {fetchCategories, deleteCategory} from '../store/slices/categoriesSlice';
import {useNetInfo} from '../hooks/useNetInfo';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorView from '../components/common/ErrorView';
import Toast from 'react-native-toast-message';
import EditCategoryModal from '../components/categories/EditCategoryModal';
import {Category} from '../types/types';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type CategoryListNavigationProp = NativeStackNavigationProp<
  CategoryStackParamList,
  'CategoryList'
>;

const CategoryList = () => {
  const navigation = useNavigation<CategoryListNavigationProp>();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const {items: categories, status} = useAppSelector(state => state.categories);
  const isConnected = useNetInfo();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [editModalVisible, setEditModalVisible] = useState(false);

  useEffect(() => {
    if (isConnected) {
      dispatch(fetchCategories());
    }
  }, [dispatch, isConnected]);

  const handleDelete = (id: number, name: string) => {
    Alert.alert(
      'Kategoriyi Sil',
      `"${name}" kategorisini silmek istediğinize emin misiniz?`,
      [
        {text: 'İptal', style: 'cancel'},
        {
          text: 'Sil',
          style: 'destructive',
          onPress: () => {
            if (isConnected) {
              dispatch(deleteCategory(id));
            }
          },
        },
      ],
    );
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setEditModalVisible(true);
  };
  const handleSaveCategory = async () => {
    try {
      Toast.show({
        type: 'success',
        text1: 'Başarılı',
        text2: 'Kategori güncellendi',
      });
      setEditModalVisible(false);
      setSelectedCategory(null);
    } catch (error: any) {
      console.error('Update Error:', error);
      Toast.show({
        type: 'error',
        text1: 'Hata',
        text2: error.errorMessage || 'Kategori güncellenirken bir hata oluştu',
      });
    }
  };

  if (!isConnected) {
    return <ErrorView message="İnternet Bağlantısı Yok" />;
  }
  const renderItem = ({item}: {item: Category}) => (
    <Animated.View
      entering={FadeInLeft}
      layout={Layout.springify()}
      style={styles.categoryItem}>
      <Text style={styles.categoryName}>{item.name}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => handleEdit(item)}>
          <Text style={styles.buttonText}>Düzenle</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => handleDelete(item.id!, item.name)}>
          <Text style={styles.buttonText}>Sil</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        extraData={categories} // Redux store değişikliklerini algılamak için
        renderItem={renderItem}
        keyExtractor={item => item.id!.toString()}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
        refreshing={status === 'loading'}
        onRefresh={() => dispatch(fetchCategories())}
        ListEmptyComponent={
          status === 'loading' ? (
            <LoadingSpinner />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Henüz kategori eklenmemiş</Text>
            </View>
          )
        }
      />

      {selectedCategory && (
        <EditCategoryModal
          visible={editModalVisible}
          onDismiss={() => {
            setEditModalVisible(false);
            setSelectedCategory(null);
          }}
          category={selectedCategory}
          onSave={handleSaveCategory}
        />
      )}

      <FAB
        icon="plus"
        style={[styles.fab, {backgroundColor: theme.colors.primary}]}
        onPress={() => navigation.navigate('AddCategory')}
        label="Yeni Kategori"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  categoryItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,

    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  editButton: {
    backgroundColor: '#2196F3',
  },
  deleteButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  separator: {
    height: 8,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: 300,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default CategoryList;
