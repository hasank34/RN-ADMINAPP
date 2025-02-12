import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Surface, Portal} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import ProductForm from '../components/forms/ProductForm';
import CategoryDialog from '../components/dialogs/CategoryDialog';
import {theme} from '../theme';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {updateProduct} from '../store/slices/productsSlice';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker';
import ImagePickerSection from '../components/forms/ImagePickerSection';

type EditProductScreenProps = {
  route: RouteProp<ProductStackParamList, 'EditProduct'>;
  navigation: NativeStackNavigationProp<ProductStackParamList, 'EditProduct'>;
};

const EditProduct: React.FC<EditProductScreenProps> = ({route}) => {
  const navigation = useNavigation();
  const {id} = route.params;
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [images, setImages] = useState<ImagePicker.Asset[]>([]);
  const product = useAppSelector(state =>
    state.products.items.find(p => p.id === id),
  );
  const categories = useAppSelector(state => state.categories.items);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price1: '',
    categoryId: '',
    stockAmount: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedCategory = categories.find(
    cat => cat.id.toString() === formData.categoryId,
  );
  useEffect(() => {
    if (product?.images) {
      const existingImages = product.images.map(img => ({
        id: img.id,
        filename: img.filename,
        extension: img.extension,
        uri: img.originalUrl ? `https:${img.originalUrl}` : '',
        thumbUrl: img.thumbUrl,
        originalUrl: img.originalUrl,
      }));
      setImages(existingImages);
    }
  }, [product]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description || '',
        price1: product.price1?.toString() || '',
        categoryId: product.categoryId?.toString() || '',
        stockAmount: product.stockAmount?.toString() || '',
      });
    }
  }, [product]);

  const handleChangeText = (field: string, value: string) => {
    setFormData(prev => ({...prev, [field]: value}));
    if (errors[field]) {
      setErrors(prev => ({...prev, [field]: ''}));
    }
  };
  const handleImagePick = async () => {
    const options: ImagePicker.ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 0.7,
      selectionLimit: 5,
      includeBase64: true,
    };

    try {
      const result = await ImagePicker.launchImageLibrary(options);
      if (!result.didCancel && result.assets) {
        setImages(prev => [...prev, ...result.assets!]);
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
    const options: ImagePicker.CameraOptions = {
      mediaType: 'photo',
      quality: 0.7,
      includeBase64: true,
    };

    try {
      const result = await ImagePicker.launchCamera(options);
      if (!result.didCancel && result.assets?.[0]) {
        setImages(prev => [...prev, result.assets![0]]);
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
        images.map(async image => {
          if (image.id) {
            return {
              id: image.id,
              filename: image.fileName,
              extension: image.extension,
              thumbUrl: image.thumbUrl,
              originalUrl: image.originalUrl,
            };
          } else {
            return {
              filename: image.fileName || `image-${Date.now()}`,
              extension: image.type?.split('/')[1] || 'jpg',
              sortOrder: 1,
              attachment: `data:image/jpeg;base64,${image.base64}`,
            };
          }
        }),
      );

      let updateData = {
        name: formData.name,
        fullName: formData.name,
        sku: product?.sku || `SKU-${Date.now()}`,
        stockAmount: parseInt(formData.stockAmount, 10),
        price1: parseFloat(formData.price1),
        currency: {
          id: 3,
          label: 'TL',
          abbr: 'TL',
        },
        discount: 0,
        discountType: 1,
        moneyOrderDiscount: 0,
        buyingPrice: 0,
        taxIncluded: 1,
        tax: 20,
        warranty: 24,
        volumetricWeight: 0,
        stockTypeLabel: 'Piece',
        customShippingDisabled: 1,
        customShippingCost: 0,
        hasGift: 0,
        status: 1,
        hasOption: 0,
        installmentThreshold: '0',
        categoryShowcaseStatus: 0,
        images: processedImages,
      };

      await dispatch(updateProduct({id, data: updateData})).unwrap();
      Toast.show({
        type: 'success',
        text1: 'Başarılı',
        text2: 'Ürün başarıyla güncellendi',
      });
      navigation.goBack();
    } catch (error) {
      console.error('Update Error:', error);
      Toast.show({
        type: 'error',
        text1: 'Hata',
        text2: 'Ürün güncellenirken bir hata oluştu',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return null;
  }

  return (
    <>
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
            loading={loading}
            isEdit={true}
            selectedCategory={selectedCategory}
            onChangeText={handleChangeText}
            onSubmit={handleSubmit}
            onCategoryPress={() => setShowCategoryDialog(true)}
          />
        </Surface>
      </ScrollView>
      <Portal>
        <CategoryDialog
          visible={showCategoryDialog}
          onDismiss={() => setShowCategoryDialog(false)}
          categories={categories}
          loading={false}
          selectedCategoryId={formData.categoryId}
          onSelect={categoryId => {
            handleChangeText('categoryId', categoryId.toString());
            setShowCategoryDialog(false);
          }}
          theme={theme}
        />
      </Portal>
    </>
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

export default EditProduct;
