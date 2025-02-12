import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Dialog, Button, List, Text, Divider} from 'react-native-paper';
import LoadingSpinner from '../LoadingSpinner';
import {MD3Theme} from 'react-native-paper';

interface CategoryDialogProps {
  visible: boolean;
  onDismiss: () => void;
  categories: any[];
  loading: boolean;
  selectedCategoryId: string;
  onSelect: (id: number) => void;
  theme: MD3Theme;
}

const CategoryDialog = ({
  visible,
  onDismiss,
  categories,
  loading,
  selectedCategoryId,
  onSelect,
  theme,
}: CategoryDialogProps) => (
  <Dialog visible={visible} onDismiss={onDismiss}>
    <Dialog.Title style={styles.dialogTitle}>Kategori Seç</Dialog.Title>
    <Dialog.Content style={styles.dialogContent}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <LoadingSpinner />
        </View>
      ) : categories.length === 0 ? (
        <Text style={styles.emptyText}>Henüz kategori bulunmuyor</Text>
      ) : (
        <ScrollView style={styles.list}>
          {categories.map((category, index) => (
            <React.Fragment key={category.id}>
              <List.Item
                title={category.name}
                titleStyle={styles.itemTitle}
                onPress={() => onSelect(category.id)}
                left={props => (
                  <List.Icon
                    {...props}
                    icon="folder"
                    color={theme.colors.primary}
                    style={styles.itemIcon}
                  />
                )}
                right={props =>
                  selectedCategoryId === category.id.toString() ? (
                    <List.Icon
                      {...props}
                      icon="check"
                      color={theme.colors.primary}
                      style={styles.checkIcon}
                    />
                  ) : null
                }
                style={[
                  styles.item,
                  selectedCategoryId === category.id.toString() &&
                    styles.selectedItem,
                ]}
              />
              {index < categories.length - 1 && (
                <Divider style={styles.divider} />
              )}
            </React.Fragment>
          ))}
        </ScrollView>
      )}
    </Dialog.Content>
    <Dialog.Actions style={styles.dialogActions}>
      <Button onPress={onDismiss} style={styles.cancelButton} mode="text">
        İptal
      </Button>
    </Dialog.Actions>
  </Dialog>
);

const styles = StyleSheet.create({
  list: {
    maxHeight: 300,
    paddingHorizontal: 8,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    padding: 16,
    fontSize: 16,
  },
  item: {
    borderRadius: 8,
    marginVertical: 2,
    paddingHorizontal: 12,
  },
  selectedItem: {
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
  },
  itemTitle: {
    fontSize: 16,
    color: '#333',
  },
  itemIcon: {
    marginRight: 8,
  },
  checkIcon: {
    marginLeft: 8,
  },
  dialogContent: {
    paddingHorizontal: 0,
  },
  dialogTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  dialogActions: {
    marginTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  cancelButton: {
    marginLeft: 'auto',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 4,
  },
});

export default CategoryDialog;
