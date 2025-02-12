import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Button, IconButton, Text} from 'react-native-paper';
import * as ImagePicker from 'react-native-image-picker';
import {MD3Theme} from 'react-native-paper';

interface ImagePickerSectionProps {
  images: ImagePicker.Asset[];
  onImagePick: () => void;
  onCameraLaunch: () => void;
  onRemoveImage: (index: number) => void;
  theme: MD3Theme;
}

const ImagePickerSection: React.FC<ImagePickerSectionProps> = ({
  images,
  onImagePick,
  onCameraLaunch,
  onRemoveImage,
  theme,
}) => {
  const handleGalleryPick = async () => {
    const options: ImagePicker.ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 0.7,
      selectionLimit: 5,
      includeBase64: true,
    };

    try {
      const result = await ImagePicker.launchImageLibrary(options);
      if (!result.didCancel && result.assets) {
        onImagePick();
      }
    } catch (error) {
      console.error('Gallery pick error:', error);
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
      if (!result.didCancel && result.assets) {
        onCameraLaunch();
      }
    } catch (error) {
      console.error('Camera launch error:', error);
    }
  };

  return (
    <View style={styles.section}>
      <Text variant="titleMedium" style={styles.sectionTitle}>
        Ürün Fotoğrafları
      </Text>
      <View style={styles.imageContainer}>
        {images.map((image, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Image
              source={{uri: image.uri}}
              style={styles.image}
              resizeMode="cover"
            />
            <IconButton
              icon="close-circle"
              size={20}
              iconColor={theme.colors.error}
              style={styles.removeButton}
              onPress={() => onRemoveImage(index)}
            />
          </View>
        ))}
        {images.length < 5 && (
          <View style={styles.imageActions}>
            <Button
              mode="outlined"
              onPress={handleGalleryPick}
              icon="image"
              style={styles.imageButton}>
              Galeriden Seç
            </Button>
            <Button
              mode="outlined"
              onPress={handleCameraLaunch}
              icon="camera"
              style={styles.imageButton}>
              Fotoğraf Çek
            </Button>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 16,
    fontWeight: '500',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  imageWrapper: {
    position: 'relative',
    width: 100,
    height: 100,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  imageActions: {
    flex: 1,
    minWidth: 200,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  imageButton: {
    width: '100%',
  },
});

export default ImagePickerSection;
