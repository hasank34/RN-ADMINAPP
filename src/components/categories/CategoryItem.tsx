import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Animated, {FadeInLeft, Layout} from 'react-native-reanimated';

interface CategoryItemProps {
  id: number;
  name: string;
  onEdit: (id: number) => void;
  onDelete: (id: number, name: string) => void;
}

const CategoryItem = ({id, name, onEdit, onDelete}: CategoryItemProps) => (
  <Animated.View
    entering={FadeInLeft}
    layout={Layout.springify()}
    style={styles.container}>
    <Text style={styles.name}>{name}</Text>
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[styles.button, styles.editButton]}
        onPress={() => onEdit(id)}>
        <Text style={styles.buttonText}>Düzenle</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.deleteButton]}
        onPress={() => onDelete(id, name)}>
        <Text style={styles.buttonText}>Sil</Text>
      </TouchableOpacity>
    </View>
  </Animated.View>
);

const styles = StyleSheet.create({
  container: {
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
  name: {
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
});

export default CategoryItem;
