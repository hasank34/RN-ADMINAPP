import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {categoryAPI} from '../../services/api';

interface Category {
  id: number;
  name: string;
}

interface CategoriesState {
  items: Category[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CategoriesState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await categoryAPI.getAll();
    return response.data;
  },
);

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (id: number) => {
    await categoryAPI.delete(id);
    return id;
  },
);

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({id, name}: {id: number; name: string}, {rejectWithValue}) => {
    try {
      const response = await categoryAPI.update(id, {name});
      return response.data;
    } catch (error: any) {
      console.error('Update Category Error:', error.response?.data);
      return rejectWithValue(error.response?.data || 'Güncelleme hatası');
    }
  },
);

export const addCategory = createAsyncThunk(
  'categories/addCategory',
  async (data: {name: string}, {rejectWithValue}) => {
    try {
      const response = await categoryAPI.create(data);
      return response.data;
    } catch (error: any) {
      console.error('Add Category Error:', error.response?.data);
      return rejectWithValue(error.response?.data || 'Ekleme hatası');
    }
  },
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder

      .addCase(fetchCategories.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })

      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      })

      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          item => item.id === action.payload.id,
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(addCategory.pending, state => {
        state.status = 'loading';
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default categoriesSlice.reducer;
