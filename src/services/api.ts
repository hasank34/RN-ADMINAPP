import {CreateProductData} from '@/types/types';
import axios from 'axios';

const BASE_URL = 'https://testcase.myideasoft.com/admin-api';
const API_TOKEN = 'AX5FTZ7UBAABUDT6XYYPW7LX';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_TOKEN}`,
  },
  timeout: 15000,
});

export const productAPI = {
  getAll: () => api.get('/products'),

  create: async (data: CreateProductData) => {
    const productData = {
      name: data.name,
      fullName: data.name,
      sku: data.sku,
      stockAmount: data.stockAmount,
      price1: data.price1,
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
      images: data.images?.map(image => ({
        filename: image.filename,
        extension: image.extension,
        sortOrder: image.sortOrder || 1,
        attachment: image.attachment,
      })),
    };

    return api.post('/products', productData);
  },

  update: async (id: number, data: any) => {
    const productData = {
      name: data.name,
      fullName: data.name,
      sku: data.sku,
      stockAmount: parseInt(data.stockAmount, 10),
      price1: parseFloat(data.price1),
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
      images: data.images?.map((image: any) => {
        if (image.id) {
          return {
            id: image.id,
            filename: image.filename,
            extension: image.extension,
            thumbUrl: image.thumbUrl,
            originalUrl: image.originalUrl,
          };
        }

        return {
          filename: image.filename,
          extension: image.extension,
          sortOrder: image.sortOrder || 1,
          attachment: image.attachment,
        };
      }),
    };

    return api.put(`/products/${id}`, productData);
  },
  delete: (id: number) => api.delete(`/products/${id}`),
  getById: (id: number) => api.get(`/products/${id}`),
};

export const categoryAPI = {
  getAll: () => api.get('/categories'),

  create: (data: any) => {
    const categoryData = {
      name: data.name,
      sortOrder: 999,
      status: 1,
      displayShowcaseContent: 0,
      showcaseContentDisplayType: 1,
      displayShowcaseFooterContent: 0,
      showcaseFooterContentDisplayType: 1,
      hasChildren: 0,
      isCombine: 0,
      categoryShowcaseStatus: 0,
      tax: 20,
      taxIncluded: 1,
      metaDescription: '',
      metaKeywords: data.name.toLowerCase(),
      pageTitle: data.name,
    };

    return api.post('/categories', categoryData);
  },

  update: (id: number, data: {name: string}) => {
    const updateData = {
      name: data.name,
      sortOrder: 999,
      status: 1,
      displayShowcaseContent: 0,
      showcaseContentDisplayType: 1,
      displayShowcaseFooterContent: 0,
      showcaseFooterContentDisplayType: 1,
      hasChildren: 0,
      isCombine: 0,
      tax: 20,
      taxIncluded: 1,
      metaDescription: '',
      metaKeywords: data.name.toLowerCase(),
      pageTitle: data.name,
    };

    return api.put(`/categories/${id}`, updateData);
  },

  delete: (id: number) => api.delete(`/categories/${id}`),
};

export default api;
