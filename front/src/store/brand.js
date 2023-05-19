import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { brandService } from '../services/brand.service';

export const getBrandsByCategory = createAsyncThunk(
    'brandSlice/GetBrandsByCategory',
    async (category, thunkAPI) => {
        try {
            return brandService.getBrandsByCategory(category);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const getAllBrands = createAsyncThunk(
    'brandSlice/GetAllBrands',
    async (_, thunkAPI) => {
        try {
            return brandService.getAllBrands();
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const createBrand = createAsyncThunk(
    'brandSlice/CreateBrand',
    async (data, thunkAPI) => {
        try {
            return brandService.createBrand(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const deleteBrandById = createAsyncThunk(
    'brandSlice/DeleteById',
    async (_id, thunkAPI) => {
        try {
            return brandService.deleteById(_id);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const brandSlice = createSlice({
    name: 'brandSlice',
    initialState: {
        brands: [],
        allBrands: [],
        status: null,
        error: null
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getBrandsByCategory.fulfilled, (state, action) => {
                state.brands = action.payload;
                state.status = 'fulfilled';
            })
            .addCase(getBrandsByCategory.rejected, state => {
                state.brands = [];
            })
            .addCase(getAllBrands.fulfilled, (state, action) => {
                state.allBrands = action.payload;
            })
            .addCase(createBrand.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.allBrands = [action.payload, ...state.allBrands];
            })
            .addCase(deleteBrandById.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.allBrands = state.allBrands.filter(brand => brand._id !== action.payload);
            })
    }
});

const brandStore = brandSlice.reducer;
export default brandStore;