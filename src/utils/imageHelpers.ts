import * as ImagePicker from 'react-native-image-picker';

export interface ProductImage {
  id?: number;
  filename: string;
  extension: string;
  thumbUrl?: string;
  originalUrl?: string;
  sortOrder?: number;
  attachment?: string;
}

export const getImageUrl = (url?: string): string => {
  if (!url) return 'https://via.placeholder.com/150';
  if (url.startsWith('//')) return `https:${url}`;
  return url;
};

export const processImage = async (
  image: ImagePicker.Asset,
): Promise<ProductImage> => {
  if (image.id) {
    return {
      id: Number(image.id),
      filename: image.fileName || '',
      extension: image.type?.split('/')[1] || 'jpg',
      thumbUrl: image.uri,
      originalUrl: image.uri,
    };
  }

  return {
    filename: image.fileName || `image-${Date.now()}`,
    extension: image.type?.split('/')[1] || 'jpg',
    sortOrder: 1,
    attachment: image.base64 ? `data:image/jpeg;base64,${image.base64}` : '',
  };
};

export const handleImageSelection = async (): Promise<ImagePicker.Asset[]> => {
  const options: ImagePicker.ImageLibraryOptions = {
    mediaType: 'photo',
    quality: 0.7,
    selectionLimit: 5,
    includeBase64: true,
    presentationStyle: 'pageSheet',
    maxWidth: 1024,
    maxHeight: 1024,
    assetRepresentationMode: 'current',
  };

  try {
    const result = await ImagePicker.launchImageLibrary(options);
    return result.assets || [];
  } catch (error) {
    console.error('Image selection error:', error);
    return [];
  }
};

export const handleCameraCapture =
  async (): Promise<ImagePicker.Asset | null> => {
    const options: ImagePicker.CameraOptions = {
      mediaType: 'photo',
      quality: 0.7,
      includeBase64: true,
    };

    try {
      const result = await ImagePicker.launchCamera(options);
      return result.assets?.[0] || null;
    } catch (error) {
      console.error('Camera capture error:', error);
      return null;
    }
  };

export const validateImage = (image: ImagePicker.Asset): boolean => {
  const maxSize = 2 * 1024 * 1024;
  const validTypes = ['image/jpeg', 'image/png', 'image/gif'];

  if (image.fileSize && image.fileSize > maxSize) {
    throw new Error("Görsel boyutu 2MB'dan küçük olmalıdır");
  }

  if (image.type && !validTypes.includes(image.type)) {
    throw new Error('Sadece JPG, PNG ve GIF formatları desteklenir');
  }

  return true;
};
