import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Surface, useTheme} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {fetchCategories} from '../store/slices/categoriesSlice';
import * as ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import ImagePickerSection from '../components/forms/ImagePickerSection';
import ProductForm from '../components/forms/ProductForm';
import CategoryDialog from '../components/dialogs/CategoryDialog';
import {handleImageSelection, processImage} from '../utils/imageHelpers';
import {addProduct} from '../store/slices/productsSlice';
import {generateSKU} from '../utils/productHelper';
import {Category} from '../types/types';

interface AddProductProps {
  navigation: any;
}

interface ProductFormData {
  name: string;
  description: string;
  price1: string;
  categoryId: string;
  stockAmount: string;
}

const AddProduct: React.FC<AddProductProps> = ({navigation}) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price1: '',
    categoryId: '',
    stockAmount: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [images, setImages] = useState<ImagePicker.Asset[]>([]);

  const categories = useAppSelector(
    state => state.categories.items,
  ) as Category[];
  const categoriesStatus = useAppSelector(state => state.categories.status);
  const selectedCategory = categories.find(
    cat => cat.id!.toString() === formData.categoryId,
  );

  useEffect(() => {
    if (categoriesStatus === 'idle') {
      dispatch(fetchCategories());
    }
  }, [dispatch, categoriesStatus]);

  const handleChangeText = (name: string, value: string) => {
    setFormData(prev => ({...prev, [name]: value}));
    if (errors[name]) {
      setErrors(prev => {
        const {[name]: _, ...rest} = prev; // eslint-disable-line @typescript-eslint/no-unused-vars
        return rest;
      });
    }
  };

  const handleImagePick = async () => {
    try {
      const selectedImages = await handleImageSelection();
      if (selectedImages.length > 0) {
        setImages(prev => [...prev, ...selectedImages]);
      }
    } catch (error) {
      console.error('Image pick error:', error);
      Toast.show({
        type: 'error',
        text1: 'Hata',
        text2: 'Görsel seçilirken bir hata oluştu',
      });
    }
  };

  const handleCameraLaunch = async () => {
    try {
      const options: ImagePicker.CameraOptions = {
        mediaType: 'photo',
        quality: 0.7,
        includeBase64: true,
      };

      const result = await ImagePicker.launchCamera(options);
      const assets = result?.assets ?? [];
      if (!result.didCancel && assets[0]) {
        setImages(prev => [...prev, assets[0]]);
      }
    } catch (error) {
      console.error('Camera error:', error);
      Toast.show({
        type: 'error',
        text1: 'Hata',
        text2: 'Kamera kullanılırken bir hata oluştu',
      });
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const processedImages = await Promise.all(
        images.map(image => processImage(image)),
      );

      const productData = {
        name: formData.name,
        sku: generateSKU(formData.name),
        stockAmount: parseInt(formData.stockAmount, 10),
        price1: parseFloat(formData.price1),
        currency: {
          id: 3,
          label: 'TL',
          abbr: 'TL',
        },
        discountType: 1,
        moneyOrderDiscount: 0,
        taxIncluded: 1,
        tax: 20,
        warranty: 24,
        stockTypeLabel: 'Piece',
        customShippingDisabled: 1,
        hasGift: 0,
        status: 1,
        hasOption: 0,
        categoryShowcaseStatus: 0,
        images: processedImages,
      };

      await dispatch(addProduct(productData)).unwrap();
      Toast.show({
        type: 'success',
        text1: 'Başarılı',
        text2: 'Ürün başarıyla eklendi',
      });
      navigation.goBack();
    } catch (error) {
      console.error('Submit Error:', error);
      Toast.show({
        type: 'error',
        text1: 'Hata',
        text2: 'Ürün eklenirken bir hata oluştu',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.surface}>
        <ImagePickerSection
          images={images}
          onImagePick={handleImagePick}
          onCameraLaunch={handleCameraLaunch}
          onRemoveImage={index =>
            setImages(prev => prev.filter((_, i) => i !== index))
          }
          theme={theme}
        />
        <ProductForm
          formData={formData}
          errors={errors}
          selectedCategory={selectedCategory}
          loading={loading}
          onChangeText={handleChangeText}
          onCategoryPress={() => setShowCategoryDialog(true)}
          onSubmit={handleSubmit}
        />
        <CategoryDialog
          visible={showCategoryDialog}
          onDismiss={() => setShowCategoryDialog(false)}
          categories={categories}
          loading={categoriesStatus === 'loading'}
          selectedCategoryId={formData.categoryId}
          onSelect={categoryId => {
            setFormData(prev => ({...prev, categoryId: categoryId.toString()}));
            setShowCategoryDialog(false);
          }}
          theme={theme}
        />
      </Surface>
    </ScrollView>
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

export default AddProduct;
