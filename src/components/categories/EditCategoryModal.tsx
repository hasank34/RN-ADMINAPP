import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Modal, Portal, Surface} from 'react-native-paper';
import CategoryForm from '../forms/CategoryForm';

interface EditCategoryModalProps {
  visible: boolean;
  onDismiss: () => void;
  category?: {
    id?: number;
    name: string;
  };
  onSave: (id: number, name: string) => void;
}

const EditCategoryModal = ({
  visible,
  onDismiss,
  category,
  onSave,
}: EditCategoryModalProps) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (category) {
      setName(category.name);
    }
  }, [category]);

  const handleSave = async () => {
    if (!name.trim()) {
      setErrors({name: 'Kategori adı zorunludur'});
      return;
    }

    setLoading(true);
    try {
      await onSave(category?.id!, name);
      onDismiss();
    } finally {
      setLoading(false);
    }
  };

  if (!category) {
    return null;
  }

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.container}>
        <Surface style={styles.surface}>
          <CategoryForm
            formData={{name}}
            errors={errors}
            loading={loading}
            onChangeText={(_, value) => {
              setName(value);
              if (errors.name) {
                setErrors({});
              }
            }}
            onSubmit={handleSave}
          />
        </Surface>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  surface: {
    padding: 16,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: 'white',
  },
});

export default EditCategoryModal;
