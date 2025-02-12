import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button, HelperText} from 'react-native-paper';

interface CategoryFormData {
  name: string;
}

interface CategoryFormProps {
  formData: CategoryFormData;
  errors: Record<string, string>;
  loading: boolean;
  onChangeText: (field: string, value: string) => void;
  onSubmit: () => void;
}

const CategoryForm = ({
  formData,
  errors,
  loading,
  onChangeText,
  onSubmit,
}: CategoryFormProps) => {
  return (
    <View>
      <TextInput
        label="Kategori Adı"
        value={formData.name}
        onChangeText={text => onChangeText('name', text)}
        mode="outlined"
        error={!!errors.name}
      />
      <HelperText type="error" visible={!!errors.name}>
        {errors.name}
      </HelperText>

      <Button
        mode="contained"
        onPress={onSubmit}
        loading={loading}
        style={styles.submitButton}>
        Kaydet
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    marginTop: 16,
  },
});

export default CategoryForm;
