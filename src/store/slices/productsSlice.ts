import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {productAPI} from '../../services/api';
import Toast from 'react-native-toast-message';
import {Product} from '@/types/types';

export interface ProductData {
  name: string;
  fullName: string;
  description?: string;
  stockAmount: number;
  price1: number;
  categories: Array<{id: number}>;
  currency: {
    id: number;
    label: string;
    abbr: string;
  };
  tax: number;
  status: number;
  hasOption: number;
  taxIncluded: number;
  images?: Array<{
    sortOrder: number;
    attachment: string;
  }>;
}

interface ProductsState {
  items: Product[];
  selectedProduct: Product | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  selectedProduct: null,
  status: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await productAPI.getAll();
    return response.data;
  },
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData: any, {rejectWithValue}) => {
    try {
      const response = await productAPI.create(productData);
      return response.data;
    } catch (error: any) {
      console.error('Product Add Error:', error.response?.data || error);
      return rejectWithValue(
        error.response?.data || 'Ürün eklenirken bir hata oluştu',
      );
    }
  },
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({id, data}: {id: number; data: any}, {rejectWithValue}) => {
    try {
      const response = await productAPI.update(id, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error);
    }
  },
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: number, {rejectWithValue}) => {
    try {
      await productAPI.delete(id);
      return id;
    } catch (error: any) {
      console.error('Product Delete Error:', error.response?.data || error);
      return rejectWithValue(error.response?.data || error);
    }
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    clearSelectedProduct: state => {
      state.selectedProduct = null;
    },
  },
  extraReducers: builder => {
    builder

      .addCase(fetchProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          action.error.message || 'Ürünler yüklenirken bir hata oluştu';
        Toast.show({
          type: 'error',
          text1: 'Hata',
          text2: state.error,
        });
      })

      .addCase(addProduct.pending, state => {
        state.status = 'loading';
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          item => item.id === action.payload.id,
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        Toast.show({
          type: 'success',
          text1: 'Başarılı',
          text2: 'Ürün başarıyla güncellendi',
        });
      })
      .addCase(updateProduct.rejected, (_state, _action) => {
        Toast.show({
          type: 'error',
          text1: 'Hata',
          text2: 'Ürün güncellenirken bir hata oluştu',
        });
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
        Toast.show({
          type: 'success',
          text1: 'Başarılı',
          text2: 'Ürün başarıyla silindi',
        });
      })
      .addCase(deleteProduct.rejected, (_state, _action) => {
        Toast.show({
          type: 'error',
          text1: 'Hata',
          text2: 'Ürün silinirken bir hata oluştu',
        });
      });
  },
});

export const {setSelectedProduct, clearSelectedProduct} = productsSlice.actions;
export default productsSlice.reducer;
