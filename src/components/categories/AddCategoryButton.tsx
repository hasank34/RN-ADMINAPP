import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

interface AddCategoryButtonProps {
  onPress: () => void;
}

const AddCategoryButton = ({onPress}: AddCategoryButtonProps) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>Yeni Kategori Ekle</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddCategoryButton;
