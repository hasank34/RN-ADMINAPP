export interface ValidationErrors {
  [key: string]: string;
}

export const validateProduct = (data: any): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!data.name?.trim()) {
    errors.name = 'Ürün adı zorunludur';
  }

  if (!data.price1) {
    errors.price1 = 'Fiyat zorunludur';
  } else if (isNaN(parseFloat(data.price1)) || parseFloat(data.price1) <= 0) {
    errors.price1 = 'Geçerli bir fiyat giriniz';
  }

  if (!data.stockAmount) {
    errors.stockAmount = 'Stok miktarı zorunludur';
  } else if (isNaN(parseInt(data.stockAmount, 10))) {
    errors.stockAmount = 'Geçerli bir stok miktarı giriniz';
  }

  if (!data.categoryId) {
    errors.categoryId = 'Kategori seçimi zorunludur';
  }

  return errors;
};

export const validateCategory = (data: any): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!data.name?.trim()) {
    errors.name = 'Kategori adı zorunludur';
  } else if (data.name.length < 2) {
    errors.name = 'Kategori adı en az 2 karakter olmalıdır';
  } else if (data.name.length > 50) {
    errors.name = 'Kategori adı en fazla 50 karakter olabilir';
  }

  if (data.description && data.description.length > 200) {
    errors.description = 'Açıklama en fazla 200 karakter olabilir';
  }

  return errors;
};

export const sanitizeProductData = (data: any) => {
  return {
    ...data,
    name: data.name?.trim(),
    description: data.description?.trim(),
    price1: parseFloat(data.price1),
    stockAmount: parseInt(data.stockAmount, 10) || 0,
    categoryId: parseInt(data.categoryId, 10),
  };
};

export const sanitizeCategoryData = (data: any) => {
  return {
    ...data,
    name: data.name?.trim(),
    description: data.description?.trim(),
  };
};
