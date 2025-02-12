import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

interface ProductFormProps {
  formData: {
    name: string;
    description: string;
    price1: string;
    categoryId: string;
    stockAmount: string;
  };
  errors: Record<string, string>;
  selectedCategory?: any;
  loading: boolean;
  isEdit?: boolean;
  onChangeText: (name: string, value: string) => void;
  onCategoryPress: () => void;
  onSubmit: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  formData,
  errors,
  selectedCategory,
  loading,
  isEdit = false,
  onChangeText,
  onCategoryPress,
  onSubmit,
}) => (
  <View style={styles.form}>
    <TextInput
      label="Ürün Adı"
      value={formData.name}
      onChangeText={value => onChangeText('name', value)}
      error={!!errors.name}
      style={styles.input}
      mode="outlined"
    />

    <TextInput
      label="Açıklama"
      value={formData.description}
      onChangeText={value => onChangeText('description', value)}
      error={!!errors.description}
      style={styles.input}
      multiline
      numberOfLines={3}
      mode="outlined"
    />

    <TextInput
      label="Fiyat"
      value={formData.price1}
      onChangeText={value => onChangeText('price1', value)}
      error={!!errors.price1}
      keyboardType="decimal-pad"
      style={styles.input}
      mode="outlined"
    />

    <TextInput
      label="Stok Miktarı"
      value={formData.stockAmount}
      onChangeText={value => onChangeText('stockAmount', value)}
      error={!!errors.stockAmount}
      keyboardType="number-pad"
      style={styles.input}
      mode="outlined"
    />

    <Button
      mode="outlined"
      onPress={onCategoryPress}
      style={styles.categoryButton}>
      {selectedCategory ? selectedCategory.name : 'Kategori Seç'}
    </Button>

    <Button
      mode="contained"
      onPress={onSubmit}
      loading={loading}
      disabled={loading}
      style={styles.submitButton}>
      {isEdit ? 'Ürünü Güncelle' : 'Ürün Ekle'}
    </Button>
  </View>
);

const styles = StyleSheet.create({
  form: {
    gap: 16,
  },
  input: {
    backgroundColor: 'white',
  },
  categoryButton: {
    marginTop: 8,
  },
  submitButton: {
    marginTop: 24,
  },
});

export default ProductForm;
