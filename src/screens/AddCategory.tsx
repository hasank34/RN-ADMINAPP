import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Surface} from 'react-native-paper';
import {useAppDispatch} from '../store/hooks';
import {addCategory} from '../store/slices/categoriesSlice';
import {validateCategory} from '../utils/validation';
import Toast from 'react-native-toast-message';
import CategoryForm from '../components/forms/CategoryForm';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../types/types';
import {ValidationErrors} from '../types/validation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const AddCategory = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleChangeText = (field: string, value: string) => {
    setFormData(prev => ({...prev, [field]: value}));
    if (errors[field]) {
      setErrors(prev => ({...prev, [field]: ''}));
    }
  };

  const handleSubmit = async () => {
    const validationErrors = validateCategory(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const categoryData = {
        name: formData.name,
        sortOrder: 999,
        status: 1,
        displayShowcaseContent: 0,
        showcaseContentDisplayType: 1,
        displayShowcaseFooterContent: 0,
        showcaseFooterContentDisplayType: 1,
        hasChildren: 0,
        isCombine: 0,
        metaDescription: formData.description || '',
        metaKeywords: formData.name.toLowerCase(),
        pageTitle: formData.name,
      };

      await dispatch(addCategory(categoryData)).unwrap();
      Toast.show({
        type: 'success',
        text1: 'Başarılı',
        text2: 'Kategori başarıyla eklendi',
      });
      navigation.goBack();
    } catch (error: any) {
      console.error('Category Error:', error);
      Toast.show({
        type: 'error',
        text1: 'Hata',
        text2: error.errorMessage || 'Kategori eklenirken bir hata oluştu',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Surface style={styles.surface}>
        <CategoryForm
          formData={formData}
          errors={errors}
          loading={loading}
          onChangeText={handleChangeText}
          onSubmit={handleSubmit}
        />
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  surface: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    elevation: 4,
  },
});

export default AddCategory;
