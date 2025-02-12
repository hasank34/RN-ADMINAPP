export interface Product {
  id: number;
  name: string;
  fullName: string;
  description?: string;
  price1: number;
  stockAmount: number;
  categoryId?: number;
  categories: Array<{id: number}>;
  currency: Currency;
  tax: number;
  status: number;
  hasOption: number;
  taxIncluded: number;
  images?: ProductImage[];
  sku: string;
  barcode?: string;
  warranty?: number;
  customShippingDisabled?: number;
}

export interface ProductImage {
  id?: number;
  filename: string;
  extension: string;
  thumbUrl?: string;
  originalUrl?: string;
  sortOrder: number;
  attachment?: string;
}

export interface CreateProductData {
  name: string;
  fullName?: string;
  sku: string;
  stockAmount: number;
  price1: number;
  currency: Currency;
  discountType: number;
  moneyOrderDiscount: number;
  taxIncluded: number;
  tax: number;
  warranty?: number;
  stockTypeLabel: string;
  customShippingDisabled: number;
  hasGift: number;
  status: number;
  hasOption: number;
  categoryShowcaseStatus: number;
  images?: ProductImage[];
}

export interface ProductFormData {
  name: string;
  description?: string;
  price1: string;
  categoryId: string;
  stockAmount: string;
}

export interface Category {
  id?: number;
  name: string;
  slug?: string;
  sortOrder?: number;
  status?: number;
  displayShowcaseContent?: number;
  showcaseContentDisplayType?: number;
  displayShowcaseFooterContent?: number;
  showcaseFooterContentDisplayType?: number;
  hasChildren?: number;
  parent?: CategoryParent;
  imageUrl?: string;
  isCombine?: number;
}

export interface CategoryParent {
  id: number;
  name: string;
  slug?: string;
}

export interface Currency {
  id: number;
  label: string;
  abbr: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  errors?: {
    [key: string]: string[];
  };
}

export interface ProductsState {
  items: Product[];
  selectedProduct: Product | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface CategoryState {
  items: Category[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface CategoryFormData {
  name: string;
  description?: string;
  parentId?: number;
  sortOrder?: number;
  status?: 'active' | 'inactive';
}

export interface ProductFilters {
  category?: number;
  search?: string;
  status?: 'active' | 'inactive';
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sortBy?: 'name' | 'price' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  permissions: string[];
}

export interface LoginFormData {
  username: string;
  password: string;
}

export type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined;
  AddProduct: undefined;
  EditProduct: {id: number};
  AddCategory: undefined;
  EditCategory: {id: number};
  ProductList: undefined;
  CategoryList: undefined;
};

export type MainTabParamList = {
  Products: undefined;
  Categories: undefined;
};

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      customColor: string;
    }
    interface Theme {
      customProperty: boolean;
    }
  }
}
